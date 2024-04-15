import {
  FAUCET_CONFIG_PDA,
  MARGIN_MARKET_PDA,
  MARGIN_MARKET_VAULT_PDA,
  MINT_ACCOUNT,
  MINT_AUTHORITY,
  ORACLE_PDA,
  OrderType,
  PositionDirection,
  ProgramAccountType,
  RATE_X_PROGRAM_ID,
  SIGNER_PDA,
  STATE_PDA,
  TOKE_FAUCET_PROGRAM_ID,
} from '@/sdk/const';
import {getUserAccountPublicKey} from '@/sdk/utils';
import type {RateXClientConfig} from '@/types/rate-x-client';
import type {RatexContracts} from '@/types/ratex_contracts';
import type {TokenFaucet} from '@/types/token_faucet';
import * as anchor from '@coral-xyz/anchor';
import {AnchorProvider, BN, Program, Wallet, web3} from '@coral-xyz/anchor';
import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  TOKEN_PROGRAM_ID,
  getAssociatedTokenAddressSync,
} from '@solana/spl-token';
import {ConfirmOptions, Connection, PublicKey, SystemProgram} from '@solana/web3.js';
import Big from 'big.js';
import {Buffer} from 'buffer';
import * as idl from '../idl/ratex_contracts.json';
import * as tokenFaucetIDL from '../idl/token_faucet.json';

export class RateClient {
  connection: Connection;
  provider: AnchorProvider;
  wallet: Wallet;
  authority?: PublicKey;
  opts?: ConfirmOptions;
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
    console.log('Update DriftClient Wallet : ', this);
  }

  async createProgramUser(type: ProgramAccountType, subAccountId: number = 0) {
    if (!this.authority) {
      return false;
    }
    const balance = await this.getUserBalance();
    if (balance <= 0) {
      return false;
    }
    const userAccountPublicKey = await this.genUserAccountPublicKey(type, subAccountId);
    if (!userAccountPublicKey) {
      return false;
    }
    const accountInfo = await this.getAccountInfo(userAccountPublicKey);
    if (accountInfo) {
      return accountInfo;
    }

    console.log('initialize user params: ', {
      user: userAccountPublicKey.toBase58(),
      authority: this.authority.toBase58(),
      payer: this.authority.toBase58(),
      systemProgram: web3.SystemProgram.programId.toBase58(),
      rent: web3.SYSVAR_RENT_PUBKEY.toBase58(),
    });

    const subAccountID = 0;
    const accounts = {
      user: userAccountPublicKey,
      authority: this.authority,
      payer: this.authority,
      systemProgram: web3.SystemProgram.programId,
      rent: web3.SYSVAR_RENT_PUBKEY,
    };

    const tx = await this.program?.rpc?.initializeUser(subAccountID, {accounts});
    console.log('Initialize User Tx : ', tx);
    return tx;
  }

  async placePerpOrder() {
    if (!this.authority) {
      return false;
    }
    const accountInfo = await this.createProgramUser(ProgramAccountType.User);
    if (!accountInfo) {
      return false;
    }

    const userAccountPublicKey = await this.getProgramUserAccountPublicKey();
    if (!userAccountPublicKey) {
      return false;
    }
    const orderParams = {
      orderType: OrderType.MARKET,
      direction: PositionDirection.LONG,
      baseAssetAmount: new BN(1000),
      priceLimit: new BN(1000),
      marketIndex: 1,
    };
    console.log('placePerpOrder Params : ', orderParams);

    const tx = await this.program?.rpc?.placePerpOrder(1, orderParams, {
      accounts: {
        user: userAccountPublicKey,
        authority: this.authority,
      },
    });

    console.log('PlacePerpOrder Tx : ', tx);
    return tx;
  }

  async fillPerpOrder(params: {tradePrice: number}) {
    if (!this.authority) {
      return false;
    }
    const accountInfo = await this.createProgramUser(ProgramAccountType.User);
    if (!accountInfo) {
      return false;
    }

    const userAccountPublicKey = await this.getProgramUserAccountPublicKey();
    if (!userAccountPublicKey) {
      return false;
    }
    const amount = new BN(100);
    const tradePrice = new BN(Number(params.tradePrice));
    const fee = new BN(0.0005);

    const tx = await this.program?.rpc?.fillPerpOrder(
      1,
      amount,
      amount,
      amount,
      amount,
      tradePrice,
      fee,
      {
        accounts: {
          user: userAccountPublicKey,
          authority: this.authority,
        },
      }
    );

    console.log('FillPerpOrder Tx : ', tx);
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
      .deposit(0, new BN(Big(amount).times(1_000_000_000).toNumber()), false, 0)
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
      .withdraw(0, new BN(Big(amount).times(1_000_000_000).toNumber()), false, 0)
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

    const userTokenAccount = getAssociatedTokenAddressSync(MINT_ACCOUNT, this.authority);

    const tx = await this.tokenFaucetProgram.methods
      .mintToUser(new BN(Big(amount).times(1_000_000_000).toNumber()))
      .accounts({
        user: this.authority,
        faucetConfig: FAUCET_CONFIG_PDA,
        mintAccount: MINT_ACCOUNT,
        userTokenAccount,
        mintAuthority: MINT_AUTHORITY,
        tokenProgram: TOKEN_PROGRAM_ID,
        associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
        systemProgram: SystemProgram.programId,
      })
      .signers([])
      .rpc()
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

  async genUserAccountPublicKey(type: ProgramAccountType, subAccountId: number = 0) {
    if (!this.authority) {
      return null;
    }
    const seeds = [Buffer.from(anchor.utils.bytes.utf8.encode(type))];
    if (type === ProgramAccountType.User) {
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
    return (await PublicKey.findProgramAddress(seeds, this.program.programId))[0];
  }
}
