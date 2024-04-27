import {
  BASE_ASSET_VAULT,
  FAUCET_CONFIG_PDA,
  MARGIN_MARKET_PDA,
  MARGIN_MARKET_VAULT_PDA,
  MINT_ACCOUNT,
  OBSERVATION_STATE_PUBLIC_KEY,
  ORACLE_PDA,
  OrderType,
  PERP_MARKET,
  PositionDirection,
  ProgramAccountType,
  QUOTE_ASSET_VAULT,
  RATE_X_PROGRAM_ID,
  SIGNER_PDA,
  STATE_PDA,
  TICK_ARRAY_SIZE,
  TOKE_FAUCET_PROGRAM_ID,
  TOKEN_MINT_A,
  TOKEN_MINT_B,
  TOKEN_VAULT_A_PUBLIC_KEY,
  TOKEN_VAULT_B_PUBLIC_KEY,
  WHIRLPOOL,
} from '@/sdk/const';
import {getUserAccountPublicKey} from '@/sdk/utils';
import type {RateXClientConfig} from '@/types/rate-x-client';
import type {RatexContracts} from '@/types/ratex_contracts';
import type {TokenFaucet} from '@/types/token_faucet';
import {PriceMath} from '@/utils/price-math';
import * as anchor from '@coral-xyz/anchor';
import {AnchorProvider, BN, EventParser, Program, Wallet} from '@coral-xyz/anchor';
import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  getAccount,
  getAssociatedTokenAddressSync,
  TOKEN_PROGRAM_ID,
} from '@solana/spl-token';
import {
  ConfirmOptions,
  Connection,
  PublicKey,
  SystemProgram,
  SYSVAR_RENT_PUBKEY,
} from '@solana/web3.js';
import Big from 'big.js';
import {Buffer} from 'buffer';
import Decimal from 'decimal.js';
import * as idl from '../idl/ratex_contracts.json';
import * as tokenFaucetIDL from '../idl/token_faucet.json';

export class RateClient {
  connection: Connection;
  provider: AnchorProvider;
  wallet: Wallet;
  authority?: PublicKey;
  opts?: ConfirmOptions;
  public parser?: EventParser;
  public program: Program<RatexContracts>;
  public tokenFaucetProgram: Program<TokenFaucet>;

  constructor(config: RateXClientConfig) {
    this.connection = config.connection;
    this.wallet = config.wallet;
    this.opts = config.opts || AnchorProvider.defaultOptions();
    this.authority = config.authority ?? this.wallet?.publicKey;
    this.provider = new AnchorProvider(config.connection, config.wallet, this.opts);
    this.program = new Program<RatexContracts>(
      idl as any,
      config.programID ?? new PublicKey(RATE_X_PROGRAM_ID),
      this.provider
    );
    this.tokenFaucetProgram = new Program<TokenFaucet>(
      tokenFaucetIDL as any,
      TOKE_FAUCET_PROGRAM_ID,
      this.provider
    );
    this.parser = new anchor.EventParser(this.program.programId, this.program.coder);
    console.log('Create RateXClient : ', this);
  }

  updateWallet(newWallet: Wallet) {
    const newProvider = new AnchorProvider(this.connection, newWallet, this.opts as ConfirmOptions);
    const newProgram = new Program<RatexContracts>(idl as any, this.program.programId, newProvider);
    const newTokenFaucetProgram = new Program<TokenFaucet>(
      tokenFaucetIDL as any,
      TOKE_FAUCET_PROGRAM_ID,
      newProvider
    );

    this.wallet = newWallet;
    this.provider = newProvider;
    this.tokenFaucetProgram = newTokenFaucetProgram;
    this.program = newProgram;
    this.authority = this.wallet?.publicKey;
    this.parser = new anchor.EventParser(this.program.programId, this.program.coder);
    console.log('Update DriftClient Wallet : ', this);
  }

  async initializeUserStats() {
    const userStatPda = this.genUserAccountPublicKey(ProgramAccountType.UserStats);
    if (!userStatPda) {
      return;
    }
    const tx = await this.program.methods
      .initializeUserStats()
      .accounts({
        userStats: userStatPda,
        state: STATE_PDA,
        authority: this.authority,
        payer: this.authority,
        rent: SYSVAR_RENT_PUBKEY,
        systemProgram: SystemProgram.programId,
      })
      .rpc()
      .catch((e) => console.error(e));
    console.log('Initialize User Stats Tx : ', tx);
    return tx;
  }

  async initializeUser(
    isIsolated: boolean = true,
    isTrader: boolean = true,
    subAccountId: number = 0
  ) {
    const userPda = this.genUserAccountPublicKey(ProgramAccountType.User, subAccountId);
    const userStatPda = this.genUserAccountPublicKey(ProgramAccountType.UserStats);
    if (!userPda || !userStatPda) {
      return;
    }

    const accountInfo = await this.getAccountInfo(userPda);
    if (!!accountInfo) {
      console.log('Account initialized', userPda.toBase58());
      return;
    }

    console.log('Account not initialized', userPda.toBase58());

    const tx = await this.program.methods
      .initializeUser(0, isIsolated, isTrader)
      .accounts({
        user: userPda,
        userStats: userStatPda,
        authority: this.authority,
        payer: this.authority,
        rent: SYSVAR_RENT_PUBKEY,
        systemProgram: SystemProgram.programId,
      })
      .rpc()
      .catch((e) => console.log(e));
    console.log('Initialize User Tx : ', tx);
    return tx;
  }

  async getUserAccountInfo() {
    const userPda = this.genUserAccountPublicKey(ProgramAccountType.User);
    if (!userPda) {
      return;
    }
    try {
      console.log('query user-pda : ', userPda.toBase58());
      const user = await this.program.account.user.fetch(userPda);
      console.log('user authority : ', user.authority.toBase58());
      return user;
    } catch (e) {
      console.error(e);
      return null;
    }
  }

  async getUserOrders() {
    return (await this.getUserAccountInfo())?.orders ?? [];
  }

  async placeOrder(amount: number) {
    const userPda = this.genUserAccountPublicKey(ProgramAccountType.User);
    const userStatPda = this.genUserAccountPublicKey(ProgramAccountType.UserStats);
    const keeperPda = this.genUserAccountPublicKey(ProgramAccountType.DriftKeeper);
    if (!userPda || !userStatPda || !keeperPda || !this.authority) {
      return;
    }

    const priceLimit = PriceMath.priceToSqrtPriceX64(new Decimal(0.9), 9, 9);
    console.log('priceLimit', priceLimit.toString());

    const pm = await this.program.account.perpMarket.fetch(PERP_MARKET);
    const ai = await this.connection.getAccountInfo(PERP_MARKET);
    console.log('PERP_MARKET : ', pm, ai?.owner?.toBase58());

    const orderParams = {
      orderType: OrderType.MARKET,
      marketIndex: 2,
      direction: PositionDirection.LONG,
      baseAssetAmount: new BN(Big(amount).times(1_000_000_000).toNumber()),
      priceLimit,
      expireTs: new BN(Math.floor(Date.now() / 1000) + 3600),
    };
    console.log('placePerpOrder Params : ', orderParams);

    const remainingAccounts = [
      {
        pubkey: PERP_MARKET,
        isSigner: false,
        isWritable: true,
      },
      {
        pubkey: ORACLE_PDA,
        isSigner: false,
        isWritable: true,
      },
    ];

    const placeOrderTx = await this.program.methods
      .placePerpOrder(orderParams as any)
      .remainingAccounts(remainingAccounts)
      .accounts({
        state: STATE_PDA,
        user: userPda,
        authority: this.authority,
      })
      .rpc()
      .catch((e) => {
        console.error(e);
      });

    console.log('PlacePerpOrder Tx : ', placeOrderTx);

    if (!placeOrderTx) {
      return;
    }
    await this.queryEvent(placeOrderTx, 'placePerpOrder evt');
    return placeOrderTx;
  }

  async fillPerpOrder(orderId: number) {
    const userPda = this.genUserAccountPublicKey(ProgramAccountType.User);
    const userStatPda = this.genUserAccountPublicKey(ProgramAccountType.UserStats);
    const keeperPda = this.genUserAccountPublicKey(ProgramAccountType.DriftKeeper);
    if (!userPda || !userStatPda || !keeperPda || !this.authority) {
      return;
    }
    const remainingAccounts = [
      {
        pubkey: PERP_MARKET,
        isSigner: false,
        isWritable: true,
      },
      {
        pubkey: ORACLE_PDA,
        isSigner: false,
        isWritable: true,
      },
    ];

    const pool = await this.program.account.whirlpool.fetch(WHIRLPOOL);
    const baseAssetAmount = new anchor.BN('-100000');
    const priceLimit = PriceMath.priceToSqrtPriceX64(new Decimal(0.9), 9, 9);
    const tickArrays = await this.getFillOrderTickArrays(
      pool.tickCurrentIndex,
      priceLimit,
      baseAssetAmount.gt(new anchor.BN(0))
    );

    if (tickArrays.length < 1) {
      console.log('TickArray is empty');
      return;
    }

    console.log(
      'TickArrays : ',
      tickArrays[0].toBase58(),
      tickArrays[1].toBase58(),
      tickArrays[2].toBase58()
    );

    const fillOrderTx = await this.program.methods
      .fillPerpOrder(orderId)
      .remainingAccounts(remainingAccounts)
      .accounts({
        user: userPda,
        userStats: userStatPda,
        keepers: keeperPda,
        state: STATE_PDA,
        tokenProgram: TOKEN_PROGRAM_ID,
        authority: this.authority,
        whirlpool: WHIRLPOOL,
        tokenOwnerAccountA: QUOTE_ASSET_VAULT,
        tokenOwnerAccountB: BASE_ASSET_VAULT,
        tokenVaultA: TOKEN_VAULT_A_PUBLIC_KEY,
        tokenVaultB: TOKEN_VAULT_B_PUBLIC_KEY,
        tickArray0: tickArrays[0],
        tickArray1: tickArrays[1],
        tickArray2: tickArrays[2],
        observation: OBSERVATION_STATE_PUBLIC_KEY,
      })
      .rpc()
      .catch((e) => console.error(e));

    if (!fillOrderTx) {
      return;
    }
    await this.queryEvent(fillOrderTx, 'fillPerpOrder evt');
    console.log('FillPerpOrder Tx : ', fillOrderTx);
    return fillOrderTx;
  }

  async getPoolTickCurrentIndex() {
    const pool = await this.program.account.whirlpool.fetch(WHIRLPOOL);
    console.log(pool);
    return pool.tickCurrentIndex;
  }

  async addPerpLpShares(
    tickLowerIndex: number,
    tickUpperIndex: number,
    liquidityAmount: number,
    marketIndex: number = 2
  ) {
    const userPda = this.genUserAccountPublicKey(ProgramAccountType.User);
    const userStatPda = this.genUserAccountPublicKey(ProgramAccountType.UserStats);
    if (!userPda || !userStatPda) {
      return;
    }

    const pool = await this.program.account.whirlpool.fetch(WHIRLPOOL);
    if (!tickLowerIndex && !tickUpperIndex) {
      tickLowerIndex = pool.tickCurrentIndex - 20;
      tickUpperIndex = pool.tickCurrentIndex + 20;
    }

    tickLowerIndex = pool.tickCurrentIndex - 10 * 2;
    tickUpperIndex = pool.tickCurrentIndex + 10 * 2;

    const positionMintSeeds = [
      Buffer.from('position_mint'),
      Buffer.alloc(4),
      Buffer.alloc(4),
      WHIRLPOOL.toBuffer(),
    ];
    positionMintSeeds[1].writeInt32LE(tickLowerIndex);
    positionMintSeeds[2].writeInt32LE(tickUpperIndex);
    const positionMint = anchor.web3.PublicKey.findProgramAddressSync(
      positionMintSeeds,
      this.program.programId
    )[0];

    const positionTokenAccountSeeds = [
      Buffer.from('position_token_account'),
      Buffer.alloc(4),
      Buffer.alloc(4),
      WHIRLPOOL.toBuffer(),
    ];
    positionTokenAccountSeeds[1].writeInt32LE(tickLowerIndex);
    positionTokenAccountSeeds[2].writeInt32LE(tickUpperIndex);
    const positionTokenAccount = anchor.web3.PublicKey.findProgramAddressSync(
      positionTokenAccountSeeds,
      this.program.programId
    )[0];
    const position = anchor.web3.PublicKey.findProgramAddressSync(
      [Buffer.from('position'), positionMint.toBuffer()],
      this.program.programId
    )[0];
    console.log('Position Mint : ', positionMint.toBase58());
    console.log('Position : ', position.toBase58());

    const tickArrays = await this.initializeTickArrays(tickLowerIndex, tickUpperIndex);
    const tickArrayLower = tickArrays[0];
    const tickArrayUpper = tickArrays[tickArrays.length - 1];

    const ta = await getAccount(this.connection, QUOTE_ASSET_VAULT);
    console.log('QUOTE_ASSET_VAULT : ', ta.mint.toBase58(), TOKEN_MINT_A.toBase58());
    const tb = await getAccount(this.connection, BASE_ASSET_VAULT);
    console.log('BASE_ASSET_VAULT : ', tb.mint.toBase58(), TOKEN_MINT_B.toBase58());
    const pm = await this.program.account.perpMarket.fetch(PERP_MARKET);
    console.log('PERP_MARKET : ', pm, marketIndex);

    const addTx = await this.program.methods
      .addPerpLpShares(
        new BN(Big(liquidityAmount).times(1_000_000_000).toNumber()),
        2,
        tickLowerIndex,
        tickUpperIndex
      )
      .accounts({
        whirlpool: WHIRLPOOL,
        tokenProgram: TOKEN_PROGRAM_ID,
        position,
        positionMint,
        positionTokenAccount,
        tokenOwnerAccountA: QUOTE_ASSET_VAULT,
        tokenOwnerAccountB: BASE_ASSET_VAULT,
        tokenVaultA: TOKEN_VAULT_A_PUBLIC_KEY,
        tokenVaultB: TOKEN_VAULT_B_PUBLIC_KEY,
        tickArrayLower: tickArrayLower,
        tickArrayUpper: tickArrayUpper,
        tokenMintA: TOKEN_MINT_A,
        tokenMintB: TOKEN_MINT_B,
        user: userPda,
        state: STATE_PDA,
        perpMarket: PERP_MARKET,
        authority: this.authority,
      })
      .rpc({commitment: 'confirmed'})
      .catch((e) => console.error(e));
    if (addTx) {
      await this.queryEvent(addTx, 'addPerpLpShares');
    }
    console.log('addPerpLpShares : ', addTx);
    return addTx;
  }

  async addKeeper(address: string) {
    const keeperPda = this.genUserAccountPublicKey(ProgramAccountType.DriftKeeper);
    console.log('keeperPda : ', keeperPda?.toBase58());
    if (!keeperPda || !address) {
      return;
    }

    const tx = await this.program.methods
      .addKeeper(new PublicKey(address))
      .accounts({
        state: STATE_PDA,
        keepers: keeperPda,
        admin: this.authority,
      })
      .rpc({commitment: 'confirmed'})
      .catch((e) => console.log('Add Keeper : ', e));
    console.log('Add Keeper Tx : ', tx);
    return tx;
  }

  async deposit(amount: number) {
    if (!this.authority) {
      return false;
    }
    if (amount < 0) {
      return false;
    }

    const userPda = await this.getProgramUserAccountPublicKey();
    const userTokenAccount = getAssociatedTokenAddressSync(MINT_ACCOUNT, this.authority);

    const remainingAccounts = [
      {
        pubkey: MARGIN_MARKET_PDA,
        isSigner: false,
        isWritable: true,
      },
    ];
    let tx = await this.program.methods
      .deposit(18, new BN(Big(amount).times(1_000_000_000).toNumber()))
      .accounts({
        user: userPda as any,
        authority: this.authority,
        marginMarketVault: MARGIN_MARKET_VAULT_PDA,
        userTokenAccount,
        tokenProgram: TOKEN_PROGRAM_ID,
      })
      .remainingAccounts(remainingAccounts)
      .rpc()
      .catch((e) => console.error(e));

    console.log('Deposit Tx: ', tx);
    return tx;
  }

  async withdraw(amount: number) {
    if (!this.authority) {
      return false;
    }
    const userPda = await this.getProgramUserAccountPublicKey();
    const userTokenAccount = getAssociatedTokenAddressSync(MINT_ACCOUNT, this.authority);
    const remainingAccounts = [
      {
        pubkey: MARGIN_MARKET_PDA,
        isSigner: false,
        isWritable: true,
      },
    ];
    const tx = await this.program.methods
      .withdraw(18, new BN(Big(amount).times(1_000_000_000).toNumber()))
      .accounts({
        state: STATE_PDA,
        user: userPda as any,
        authority: this.authority,
        marginMarketVault: MARGIN_MARKET_VAULT_PDA,
        driftSigner: SIGNER_PDA,
        userTokenAccount,
        tokenProgram: TOKEN_PROGRAM_ID,
      })
      .remainingAccounts(remainingAccounts)
      .rpc()
      .catch((e) => console.error(e));
    console.log('Withdraw Tx : ', tx);
    return tx;
  }

  async mintToUser(amount: number) {
    if (!this.authority) {
      return false;
    }
    if (amount < 0) {
      return false;
    }

    const balance = await this.getUserBalance();
    console.log('Balance : ', balance);

    const userTokenAccount = getAssociatedTokenAddressSync(MINT_ACCOUNT, this.authority);

    const tx = await this.tokenFaucetProgram.methods
      .mintToUser(new BN(Big(amount).times(1_000_000_000).toNumber()))
      .accounts({
        user: this.authority,
        faucetConfig: FAUCET_CONFIG_PDA,
        mintAccount: MINT_ACCOUNT,
        userTokenAccount,
        mintAuthority: new PublicKey('9aTcv5rmbnYussBW61ok3caDyNZJCv2xpQF6t9b31wuj'),
        tokenProgram: TOKEN_PROGRAM_ID,
        associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
        systemProgram: SystemProgram.programId,
      })
      .signers([])
      .rpc({commitment: 'confirmed'})
      .catch((e) => console.error(e));
    console.log('Mint To User : ', tx);
    return tx;
  }

  async updateOracle({marketRate, rate}: {marketRate: number; rate: number}) {
    if (!marketRate || !rate) {
      return '';
    }
    const tx = await this.program.methods
      .updateOracle(
        new BN(Big(marketRate).times(1_000_000_000).toNumber()),
        new BN(Big(rate).times(1_000_000_000).toNumber())
      )
      .accounts({oracle: ORACLE_PDA})
      .rpc();
    console.log('Update Oracle Tx : ', tx);
    return tx;
  }

  async getUserMintAccount() {
    if (!this.authority) {
      return false;
    }
    return getAssociatedTokenAddressSync(MINT_ACCOUNT, this.authority);
  }

  async getAccountInfo(account: PublicKey) {
    try {
      return await this.connection.getAccountInfo(account);
    } catch (e) {
      return null;
    }
  }

  async getProgramUserAccountPublicKey() {
    try {
      return getUserAccountPublicKey(this.program.programId, this.authority as PublicKey);
    } catch (e) {
      return null;
    }
  }

  async getUserBalance(account?: PublicKey) {
    try {
      if (!this.authority) {
        return 0;
      }
      return await this.connection.getBalance(account ?? this.authority);
    } catch (e) {
      return 0;
    }
  }

  async getTokenAccountBalance(account: PublicKey) {
    try {
      const res = await this.connection.getTokenAccountBalance(account);
      return res?.value?.amount ?? 0;
    } catch (e) {
      return 0;
    }
  }

  genUserAccountPublicKey(type: ProgramAccountType, subAccountId: number = 0) {
    if (!this.authority) {
      return null;
    }
    const seeds = [Buffer.from(anchor.utils.bytes.utf8.encode(type))];
    if ([ProgramAccountType.User, ProgramAccountType.UserStats].includes(type)) {
      seeds.push(this.authority.toBuffer());
    }
    if (
      [
        ProgramAccountType.User,
        ProgramAccountType.MarginMarket,
        ProgramAccountType.MarginMarketVault,
        ProgramAccountType.InsuranceFundVault,
      ].includes(type)
    ) {
      seeds.push(new anchor.BN(subAccountId).toArrayLike(Buffer, 'le', 2));
    }
    return PublicKey.findProgramAddressSync(seeds, this.program.programId)[0];
  }

  async queryEvent(txid: string, label: string) {
    const tx = await this.connection.getTransaction(txid, {commitment: 'confirmed'});
    if (!tx?.meta?.logMessages) {
      return;
    }
    const evts = this.parser?.parseLogs(tx?.meta?.logMessages);
    while (evts) {
      const evt = evts.next();
      if (evt.done) {
        break;
      }
      console.log(label, evt);
    }
  }

  getStartTickIndex(tickIndex: number) {
    return Math.floor(tickIndex / TICK_ARRAY_SIZE) * TICK_ARRAY_SIZE;
  }

  async getFillOrderTickArrays(currTickIndex: number, sqrtPriceLimit: any, aTob: any) {
    let tickIndexLimit = PriceMath.sqrtPriceX64ToTickIndex(sqrtPriceLimit);
    let startTickIndex = this.getStartTickIndex(currTickIndex);
    if (!aTob) {
      let p = PriceMath.tickIndexToPrice(startTickIndex + 3 * TICK_ARRAY_SIZE, 9, 9);
      console.log('pppp', p);

      const tickBound = startTickIndex + 3 * TICK_ARRAY_SIZE;
      if (tickBound < tickIndexLimit) {
        throw Error(`out of bound 11 ${tickBound} ${tickIndexLimit}`);
      }
    } else {
      const tickBound = startTickIndex - 2 * TICK_ARRAY_SIZE;
      if (tickBound > tickIndexLimit) {
        throw Error(`out of bound 22 ${tickBound} ${tickIndexLimit}`);
      }
    }

    const tickArrays: PublicKey[] = [];
    for (let i = 0; i < 10; ++i) {
      const [tickArray] = anchor.web3.PublicKey.findProgramAddressSync(
        [Buffer.from('tick_array'), WHIRLPOOL.toBuffer(), Buffer.from(startTickIndex.toString())],
        this.program.programId
      );
      try {
        const tickArrayAccount = await this.program.account.tickArray.fetch(tickArray);
        console.log('found tick array', startTickIndex);
        tickArrays.push(tickArray);
      } catch (e) {
        console.log('get tick array error', e, tickArray, startTickIndex);
        break;
        // continue
      }

      if (aTob) {
        startTickIndex = Math.floor(startTickIndex / TICK_ARRAY_SIZE - 1) * TICK_ARRAY_SIZE;
        if (startTickIndex < this.getStartTickIndex(tickIndexLimit)) {
          console.log(`price limit triggered 11 ${startTickIndex} ${tickIndexLimit}`);
          break;
        }
      } else {
        startTickIndex = Math.floor(startTickIndex / TICK_ARRAY_SIZE + 1) * TICK_ARRAY_SIZE;
        if (startTickIndex > tickIndexLimit) {
          console.log(`price limit triggered 22 ${startTickIndex} ${tickIndexLimit}`);
          break;
        }
      }

      if (tickArrays.length >= 3) {
        break;
      }
    }

    if (tickArrays.length == 0) {
      throw Error('no tick array available');
    }

    console.log('tickArrays.length', tickArrays.length);
    for (let i = tickArrays.length + 1; i <= 3; ++i) {
      tickArrays.push(tickArrays[tickArrays.length - 1]);
      console.log('fill tick array');
    }
    return tickArrays;
  }

  async genFillOrderTickArrays1(startTickIndex: number) {
    const tickArrays: PublicKey[] = [];
    for (let i = 0; i < 5; i++) {
      const {tickArray} = this.genTickArray(startTickIndex, i !== 0);
      const accountInfo = await this.getAccountInfo(tickArray);
      if (!!accountInfo) {
        tickArrays.push(tickArray);
      }
      if (tickArrays.length > 2) {
        break;
      }
    }
    if (tickArrays.length > 0 && tickArrays.length < 3) {
      const lastElement = tickArrays[tickArrays.length - 1];
      while (tickArrays.length < 3) {
        tickArrays.push(lastElement);
      }
      return tickArrays;
    }
    if (tickArrays.length > 3) {
      return tickArrays.slice(0, 3);
    }
    return tickArrays;
  }

  genTickArray(startTickIndex: number, next: boolean = false) {
    startTickIndex = Math.floor(startTickIndex / TICK_ARRAY_SIZE) * TICK_ARRAY_SIZE;

    const [tickArray] = PublicKey.findProgramAddressSync(
      [Buffer.from('tick_array'), WHIRLPOOL.toBuffer(), Buffer.from(startTickIndex.toString())],
      this.program.programId
    );
    console.log('Initialize tick array index : ', startTickIndex, tickArray.toBase58());
    return {tickArray, tickIndex: startTickIndex};
  }

  async initializeTickArrays(startTickIndex: number, endTickIndex: number) {
    startTickIndex = Math.floor(startTickIndex / TICK_ARRAY_SIZE) * TICK_ARRAY_SIZE;
    endTickIndex = Math.floor(endTickIndex / TICK_ARRAY_SIZE) * TICK_ARRAY_SIZE;
    let tickArrays = [];
    for (let i = startTickIndex; i <= endTickIndex; i += TICK_ARRAY_SIZE) {
      const ta = await this.initializeTickArray(i);
      tickArrays.push(ta);
    }
    return tickArrays;
  }

  async initializeTickArray(startTickIndex: number) {
    const {tickArray, tickIndex} = this.genTickArray(startTickIndex);

    const accountInfo = await this.getAccountInfo(tickArray);
    if (!!accountInfo) {
      return tickArray;
    }
    const txid = await this.program.methods
      .initializeTickArray(tickIndex)
      .accounts({
        whirlpool: WHIRLPOOL,
        tickArray,
        funder: this.authority,
        systemProgram: SystemProgram.programId,
      })
      .rpc({commitment: 'confirmed'});
    console.log('Initialize Tick Array Tx : ', txid);
    await this.queryEvent(txid, 'InitializeTickArray');
    return tickArray;
  }
}
