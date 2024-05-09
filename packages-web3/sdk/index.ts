import {ORACLE_PDA} from '@/sdk/const';
import {
  RateXClientConfig,
  RateXClosePositionParams,
  RateXPlaceOrderParams,
} from '@/types/rate-x-client';
import type {RatexContracts} from '@/types/ratex_contracts';
import type {TokenFaucet} from '@/types/token_faucet';
import * as anchor from '@coral-xyz/anchor';
import {AnchorProvider, BN, EventParser, Program, Wallet} from '@coral-xyz/anchor';
import {getAssociatedTokenAddressSync} from '@solana/spl-token';
import {
  ConfirmOptions,
  Connection,
  PublicKey,
  Transaction,
  TransactionInstruction,
  TransactionMessage,
  VersionedTransaction,
} from '@solana/web3.js';
import Big from 'big.js';
import Decimal from 'decimal.js';
import * as idl from '../idl/ratex_contracts.json';
import * as tokenFaucetIDL from '../idl/token_faucet.json';
import {clientReady$} from '../streams/rate-x-client.ts';
import {AccountManager, PROGRAM_ID, TOKEN_FAUCET} from './account-manager.ts';
import {FundManager} from './fund-manager.ts';
import {LpManager} from './lp-manager.ts';
import {OrderManager} from './order-manager.ts';
import {TickManager} from './tick-manager.ts';
import {getMarginIndexByMarketIndex, getMintAccountPda} from './utils.ts';

export class RateClient {
  connection: Connection;
  provider: AnchorProvider;
  wallet: Wallet;
  authority?: PublicKey;
  opts?: ConfirmOptions;
  userPda?: PublicKey;
  userStatPda?: PublicKey;
  am: AccountManager;
  om: OrderManager;
  tm: TickManager;
  fm: FundManager;
  lp: LpManager;
  isReady: boolean;
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
      config.programID ?? PROGRAM_ID,
      this.provider
    );
    this.tokenFaucetProgram = new Program<TokenFaucet>(
      tokenFaucetIDL as any,
      TOKEN_FAUCET,
      this.provider
    );
    this.parser = new anchor.EventParser(this.program.programId, this.program.coder);
    this.am = new AccountManager();
    this.om = new OrderManager();
    this.tm = new TickManager();
    this.fm = new FundManager();
    this.lp = new LpManager();
    this.isReady = !!this.authority;
    clientReady$.next(!!this.authority);
    console.log('Create RateXClient : ', this);
  }

  updateWallet(newWallet: Wallet) {
    const newProvider = new AnchorProvider(this.connection, newWallet, this.opts as ConfirmOptions);
    const newProgram = new Program<RatexContracts>(idl as any, this.program.programId, newProvider);
    const newTokenFaucetProgram = new Program<TokenFaucet>(
      tokenFaucetIDL as any,
      TOKEN_FAUCET,
      newProvider
    );

    this.wallet = newWallet;
    this.provider = newProvider;
    this.tokenFaucetProgram = newTokenFaucetProgram;
    this.program = newProgram;
    this.authority = this.wallet?.publicKey;
    this.parser = new anchor.EventParser(this.program.programId, this.program.coder);
    this.isReady = !!this.authority;
    clientReady$.next(!!this.authority);
    console.log('Update DriftClient Wallet : ', this);
  }

  async initializeUserStats() {
    if (!this.authority) {
      return;
    }
    return;
  }

  async initializeUser(isIsolated: boolean = true, isTrader: boolean = true) {
    if (!this.authority) {
      return;
    }
  }

  async getAllPositions() {
    if (!this.authority) {
      return [];
    }
    return this.am.getAllPosition(this.program, this.authority);
  }

  async getAllOrders() {
    if (!this.authority) {
      return [];
    }
    return this.am.getAllOrders(this.program, this.authority);
  }

  async getUserAccountInfo() {
    if (!this.authority) {
      return null;
    }
    const accounts = await this.am.getSubAccounts(this.program, this.authority);
    console.log('All Sub Account : ', accounts);
    return accounts;
  }

  async placeOrder2(params: RateXPlaceOrderParams) {
    if (!this.authority) {
      return;
    }
    const {marketIndex, marginType, margin} = params;
    const [userStatPda, transaction1] = await this.am.initializeUserStatsTransaction(
      this.program,
      this.authority
    );
    let subAccountId = 0;
    let transaction2;
    let user = await this.am.findUser(
      this.program,
      this.authority,
      marginType === 'ISOLATED',
      true
    );
    let userPda = user?.userPda;
    if (!user) {
      if (!transaction1 && !!userStatPda) {
        const stat = await this.program.account.userStats.fetch(userStatPda as PublicKey);
        subAccountId = stat.numberOfSubAccountsCreated ?? 0;
      }
      const [pda, t] = await this.am.initializeUserTransaction(
        this.program,
        this.authority,
        marginType === 'ISOLATED',
        true,
        subAccountId
      );
      userPda = pda;
      transaction2 = t;
    } else {
      subAccountId = user.subAccountId;
    }
    const [userOrdersPda, transaction3] = await this.am.initializeUserOrdersTransaction(
      this.program,
      this.authority,
      userPda,
      subAccountId
    );
    if (marginType === 'CROSS' && !transaction2 && !transaction3) {
      const zero = new BN(0);
      // const user: any = await this.am.getAccountInfo(this.program, userPda, userOrdersPda);
      const position = user?.perpPositions?.find((p: any) => p.marketIndex === marketIndex);
      if (!!position) {
        const order = user?.orders?.find((o: any) => {
          return (
            o.marketIndex === marketIndex &&
            o.baseAssetAmount.gt(zero) !== position.baseAssetAmount.gt(zero)
          );
        });
        if (!!order) {
          return false;
        }
      }
    }
    const transaction4 = await this.fm.depositTransaction(this.program, this.authority, userPda, {
      marginIndex: getMarginIndexByMarketIndex(marketIndex) as number,
      amount: margin,
    });

    const transaction5 = await this.om.placeOrderTransaction(
      this.program,
      this.authority,
      this.am,
      userPda,
      userOrdersPda,
      params
    );

    const combinedTransaction = new Transaction();
    !!transaction1 && combinedTransaction.add(transaction1);
    !!transaction2 && combinedTransaction.add(transaction2);
    !!transaction3 && combinedTransaction.add(transaction3);
    !!transaction4 && combinedTransaction.add(transaction4);
    combinedTransaction.add(transaction5);
    combinedTransaction.recentBlockhash = (await this.connection.getRecentBlockhash()).blockhash;
    combinedTransaction.feePayer = this.authority;

    try {
      const signedTransaction = await this.wallet.signTransaction(combinedTransaction);
      const signature = await this.connection.sendRawTransaction(signedTransaction.serialize(), {
        skipPreflight: true,
      });
      await this.connection.confirmTransaction(signature, 'confirmed');
      console.log('Combined Transaction successful!', signature);
      return signature;
    } catch (error) {
      console.error('Combined Transaction failed', error);
      return null;
    }
  }

  async closePosition(params: RateXClosePositionParams) {
    if (!this.authority) {
      return;
    }
    const {userPda: userPdaAddress, userOrdersPda: userOrdersPdaAddress} = params;
    const userPda = new PublicKey(userPdaAddress);
    const userOrdersPda = new PublicKey(userOrdersPdaAddress);
    const user: any = await this.am.getAccountInfo(this.program, userPda, userOrdersPda);
    if (user.isIsolated && user.orders?.length > 0) {
      return;
    }
    const transaction = await this.om.placeOrderTransaction(
      this.program,
      this.authority,
      this.am,
      userPda,
      userOrdersPda,
      params
    );
    const combinedTransaction = new Transaction();
    combinedTransaction.add(transaction);
    combinedTransaction.recentBlockhash = (await this.connection.getRecentBlockhash()).blockhash;
    combinedTransaction.feePayer = this.authority;
    return await this.sendTransaction(combinedTransaction);
  }

  async fillPerpOrder(order: {marketIndex: number; orderId: number; userPda: string}) {
    if (!this.authority) {
      return;
    }
    const tx = await this.om.fillOrder(this.program, this.authority, this.am, this.tm, {
      marketIndex: order.marketIndex,
      orderId: order.orderId,
      userPda: new PublicKey(order.userPda),
    });

    if (!!tx) {
      setTimeout(async () => {
        await this.queryEvent(tx, 'fillPerpOrder evt');
      }, 2000);
    }
    console.log('FillPerpOrder Tx : ', tx);
    return tx;
  }

  async cancelOrder(params: {userPda: string; userOrdersPda: string; orderId: number}) {
    if (!this.authority) {
      return;
    }
    const tx = await this.om.cancelOrder(this.program, this.authority, this.am, {
      userPda: new PublicKey(params.userPda),
      userOrdersPda: new PublicKey(params.userOrdersPda),
      orderId: params.orderId,
    });
    console.log('Cancel Order : ', tx);
    return tx;
  }

  async simulatePlaceOrder(params: {
    amount: number;
    marketIndex: number;
    direction: 'LONG' | 'SHORT';
    days: number;
  }) {
    if (!this.authority) {
      return;
    }
    const instruction = await this.om.simulateSwap(
      this.program,
      this.authority,
      this.am,
      this.tm,
      params
    );
    const result: any = await this.sendViewTransaction([instruction]);
    let res: any = {
      baseAssetAmount: params.amount,
      quoteAssetAmount: 0,
    };
    if (result?.value?.returnData?.data) {
      const [data, type] = result?.value?.returnData.data;
      let buf = Buffer.from(data, type);
      const amountBaseSwap = buf.readBigUInt64LE(0);
      const amountQuoteSwap = buf.readBigUInt64LE(8);
      const baseAssetAmount = Big(Number(amountBaseSwap)).div(1_000_000_000).toNumber();
      console.log('amount base swap : ', amountBaseSwap);
      console.log('amount quote swap : ', amountQuoteSwap);
      res = {
        baseAssetAmount: Big(Number(amountBaseSwap)).div(1_000_000_000).toNumber(),
        quoteAssetAmount: Big(Number(amountQuoteSwap))
          .div(1_000_000_000)
          .div(baseAssetAmount)
          .toNumber(),
      };
    }
    const entryPrice = new Decimal(res.quoteAssetAmount).div(new Decimal(res.baseAssetAmount));
    const py = new Decimal(res.quoteAssetAmount);
    const daysInYear = new Decimal(365);
    const period = new Decimal(params.days);
    const impliedSwapRate = Decimal.pow(1 / (1 - py.toNumber()), daysInYear.div(period).toNumber())
      .minus(1)
      .toNumber();
    return {py: py.toFixed(9), impliedSwapRate};
  }

  async getPoolTickCurrentIndex() {
    return 0;
  }

  async addPerpLpShares(params: {
    tickLowerIndex: number;
    tickUpperIndex: number;
    amount: number;
    marketIndex: number;
  }) {
    if (!this.authority) {
      return;
    }
    const tx = await this.lp.addPerpLpShares(
      this.program,
      this.wallet,
      this.authority,
      this.am,
      this.tm,
      params
    );
    if (tx) {
      await this.queryEvent(tx, 'addPerpLpShares');
    }
    console.log('addPerpLpShares : ', tx);
    return tx;
  }

  async addKeeper(address: string) {
    if (!address || !this.authority) {
      return;
    }
    const tx = await this.om.addKeeper(
      this.program,
      this.authority,
      this.am,
      new PublicKey(address)
    );
    console.log('Add Keeper Tx : ', tx);
    return tx;
  }

  async deposit(
    userPdaAddress: string,
    params: {marketIndex?: number; marginIndex?: number; amount: number}
  ) {
    if (!this.authority) {
      return false;
    }
    const newParams: {marginIndex: number; amount: number} = {
      amount: params.amount,
      marginIndex: params.marginIndex as any,
    };
    if (params.marketIndex !== undefined) {
      newParams.marginIndex = getMarginIndexByMarketIndex(params.marketIndex);
    }

    const userPda = new PublicKey(userPdaAddress);
    const tx = await this.fm.deposit(this.program, this.authority, userPda, newParams);
    console.log('Deposit Tx: ', tx);
    return tx;
  }

  async withdraw(userPda: PublicKey, params: {marginIndex: number; amount: number}) {
    if (!this.authority) {
      return false;
    }
    const tx = await this.fm.withdraw(this.program, this.authority, this.am, userPda, params);
    console.log('Withdraw Tx : ', tx);
    return tx;
  }

  async mintToUser(params: {marginIndex: number; amount: number}) {
    if (!this.authority) {
      return false;
    }
    const tx = this.fm.mintToUser(this.tokenFaucetProgram, this.authority, params);
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

  async getUserMintAccount(marginIndex: number) {
    if (!this.authority) {
      return false;
    }
    return getAssociatedTokenAddressSync(getMintAccountPda(marginIndex), this.authority);
  }

  async getAccountInfo(account: PublicKey) {
    try {
      return await this.connection.getAccountInfo(account);
    } catch (e) {
      return null;
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

  async getAmmTwap(params: {marketIndex: number}) {
    const instruction = await this.om.getAmmTwap(this.program, params);
    const result = await this.sendViewTransaction([instruction]);
    if (result?.value?.returnData?.data) {
      const [data, type] = result?.value?.returnData.data;
      let buf = Buffer.from(data, type);
      const ammTwap = buf.readBigUInt64LE(0);
      return new Decimal(ammTwap.toString()).div(new Decimal(2).pow(64)).toString();
    }
  }

  async deleteAllUser() {
    if (!this.authority) {
      return;
    }
    const accounts = await this.am.getSubAccounts(this.program, this.authority);
    const combinedTransaction = new Transaction();
    for (let i = 0; i < accounts.length; i++) {
      if (i > 1) {
        break;
      }
      const user = accounts[i];
      const transaction1 = await this.am.deleteUserOrders(
        this.program,
        this.authority,
        user.userPda,
        user.userOrdersPda
      );
      const transaction2 = await this.am.deleteUser(this.program, this.authority, user.userPda);
      !!transaction1 && combinedTransaction.add(transaction1);
      !!transaction2 && combinedTransaction.add(transaction2);
    }
    await this.sendTransaction(combinedTransaction);
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

  async sendViewTransaction(instructions: TransactionInstruction[]) {
    try {
      const recentBlockhash = await this.program.provider.connection.getRecentBlockhash();
      const message = new TransactionMessage({
        payerKey: this.authority as any,
        recentBlockhash: recentBlockhash.blockhash,
        instructions,
      }).compileToV0Message([]);

      let versionedTransaction = new VersionedTransaction(message);

      const result = await this.program.provider.connection.simulateTransaction(
        versionedTransaction,
        {
          sigVerify: false,
        }
      );
      console.log('View Transaction Result : ', result);
      return result;
    } catch (e) {
      console.error('Send View Transaction Error: ', e);
    }
  }

  async sendTransaction(combinedTransaction: Transaction) {
    try {
      combinedTransaction.recentBlockhash = (await this.connection.getRecentBlockhash()).blockhash;
      combinedTransaction.feePayer = this.authority;
      const signedTransaction = await this.wallet.signTransaction(combinedTransaction);
      const signature = await this.connection.sendRawTransaction(signedTransaction.serialize(), {
        skipPreflight: true,
      });
      await this.connection.confirmTransaction(signature, 'confirmed');
      console.log('Combined Transaction successful!', signature);
      return signature;
    } catch (error) {
      console.error('Combined Transaction failed', error);
    }
  }
}
