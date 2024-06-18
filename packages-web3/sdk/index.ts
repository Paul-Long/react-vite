import {AccountManager} from '@/sdk/account-manager';
import {FundManager} from '@/sdk/fund-manager';
import {LpManager} from '@/sdk/lp-manager';
import {OrderManager} from '@/sdk/order-manager';
import {TickManager} from '@/sdk/tick-manager';
import {
  getMarginIndexByMarketIndex,
  getMarginIndexByMarketIndexV2,
  getMintAccountPda,
  PerpMarketMap,
  PROGRAM_ID,
  TOKEN_FAUCET,
} from '@/sdk/utils';
import {updateBalance$} from '@/streams/balance';
import {clientReady$} from '@/streams/rate-x-client';
import type {
  RateXClientConfig,
  RateXClosePositionParams,
  RateXPlaceOrderParams,
} from '@/types/rate-x-client';
import type {RatexContracts} from '@/types/ratex_contracts';
import type {TokenFaucet} from '@/types/token_faucet';
import {PriceMath} from '@/utils/price-math';
import * as anchor from '@coral-xyz/anchor';
import {AnchorProvider, BN, EventParser, Program, Wallet} from '@coral-xyz/anchor';
import {getAssociatedTokenAddressSync} from '@solana/spl-token';
import {
  ComputeBudgetProgram,
  ConfirmOptions,
  Connection,
  PublicKey,
  Transaction,
  TransactionInstruction,
  TransactionMessage,
  VersionedTransaction,
} from '@solana/web3.js';
import {Big} from 'big.js';
import Decimal from 'decimal.js';
import * as idl from '../idl/ratex_contracts.json';
import * as tokenFaucetIDL from '../idl/token_faucet.json';

export class RateClient {
  connection: Connection;
  provider: AnchorProvider;
  wallet: Wallet;
  authority?: PublicKey;
  opts?: ConfirmOptions;
  am: AccountManager;
  om: OrderManager;
  tm: TickManager;
  fm: FundManager;
  lp: LpManager;

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

  async getCrossPositions() {
    if (!this.authority) {
      return [];
    }
    return this.am.getCrossPosition(this.program, this.authority);
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
    const start = Date.now();
    const {marketIndex, marginType, margin, openTip} = params;
    const [userStatPda, transaction1, statInfo] = await this.am.initializeUserStatsTransaction(
      this.program,
      this.authority
    );
    let subAccountId = 0;
    let transaction2;
    let user = await this.am.findTraderUser(
      this.program,
      this.authority,
      marginType === 'ISOLATED',
      statInfo
    );
    console.log('place order check user : ', Date.now() - start);
    let userPda = user?.userPda;
    if (!user) {
      if (!transaction1 && !!userStatPda) {
        const stat = await this.program.account.userStats.fetch(userStatPda as PublicKey);
        subAccountId = stat.numberOfSubAccountsCreated ?? 0;
      }
      openTip?.();
      const [pda, t] = await this.am.initializeUserTransaction(
        this.program,
        this.authority,
        marginType === 'ISOLATED',
        subAccountId
      );
      userPda = pda;
      transaction2 = t;
    }
    console.log('place order check user orders : ', Date.now() - start);
    if (marginType === 'CROSS' && !transaction2) {
      const zero = new BN(0);
      // const user: any = await this.am.getAccountInfo(this.program, userPda, userOrdersPda);
      const position = user?.yieldPositions?.find((p: any) => p.marketIndex === marketIndex);
      if (position?.length > 4) {
        return 30001;
      }
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
    console.log('place order check position and orders : ', Date.now() - start);
    const transaction4 = await this.fm.depositTransaction(this.program, this.authority, userPda, {
      marginIndex: getMarginIndexByMarketIndex(marketIndex) as number,
      amount: margin,
    });
    console.log('place order deposit : ', Date.now() - start);

    const transaction5 = await this.om.placeOrderTransaction(
      this.program,
      this.authority,
      this.am,
      userPda,
      {...params, isClose: false}
    );

    console.log('place order instruction : ', Date.now() - start);

    const combinedTransaction = new Transaction();
    !!transaction1 && combinedTransaction.add(transaction1);
    !!transaction2 && combinedTransaction.add(transaction2);
    !!transaction4 && combinedTransaction.add(transaction4);
    combinedTransaction.add(transaction5);
    combinedTransaction.recentBlockhash = (await this.connection.getRecentBlockhash()).blockhash;
    combinedTransaction.feePayer = this.authority;

    console.log('place order submit : ', Date.now() - start);
    try {
      const signedTransaction = await this.wallet.signTransaction(combinedTransaction);
      const signature = await this.connection.sendRawTransaction(signedTransaction.serialize(), {
        skipPreflight: true,
        preflightCommitment: 'processed',
      });
      console.log('Combined Transaction successful!', new Date(), signature);
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
    const user: any = await this.am.getAccountInfo(this.program, userPda);
    if (user.isIsolated && user.orders?.length > 0) {
      return;
    }
    const transaction = await this.om.placeOrderTransaction(
      this.program,
      this.authority,
      this.am,
      userPda,
      {...params, isClose: true}
    );
    const combinedTransaction = new Transaction();
    combinedTransaction.add(transaction);
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
      }, 0);
    }
    console.log('FillPerpOrder Tx : ', tx);
    return tx;
  }

  async cancelOrder(params: {userPda: string; orderId: number}) {
    if (!this.authority) {
      return;
    }
    const tx = await this.om.cancelOrder(this.program, this.authority, this.am, {
      userPda: new PublicKey(params.userPda),
      orderId: params.orderId,
    });
    console.log('Cancel Order : ', tx);
    return tx;
  }

  async cancelIsolatedOrder(params: {userPda: string; orderId: number; marketIndex: number}) {
    if (!this.authority) {
      return;
    }
    const {userPda, orderId, marketIndex} = params;
    const tx = await this.om.cancelIsolatedOrder(this.program, this.authority, this.am, {
      userPda: new PublicKey(userPda),
      orderId,
      marketIndex,
    });
    console.log('Cancel Isolated Order : ', tx);
    return tx;
  }

  async simulatePlaceOrder(params: {
    amount: number;
    marketIndex: number;
    direction: 'LONG' | 'SHORT';
    input: 'amount' | 'margin';
    days: number;
  }) {
    if (!this.authority) {
      return;
    }
    const baseResult = {
      key: [params.input, params.direction, params.amount].join('_'),
      baseAssetAmount: params.input === 'amount' ? params.amount : 0,
      quoteAssetAmount: params.input === 'margin' ? params.amount : 0,
      entryPrice: 0,
      sqrtPrice: 0,
      impliedSqrtRate: 0,
      impliedEntryRate: 0,
    };
    if (!params.amount || Number(params.amount) <= 0) {
      return baseResult;
    }
    const instruction = await this.om.simulateSwap(
      this.program,
      this.authority,
      this.am,
      this.tm,
      params
    );
    const result: any = await this.sendViewTransaction([instruction]);
    if (result?.value?.returnData?.data) {
      const [data, type] = result?.value?.returnData.data;
      let buf = Buffer.from(data, type);
      const amountBaseSwap = buf.readBigUInt64LE(0);
      const amountQuoteSwap = buf.readBigUInt64LE(8);
      const sPrice = new anchor.BN(buf.slice(16).toString('hex'), 16, 'le');

      const baseAssetAmount = new Decimal(Number(amountBaseSwap)).div(1_000_000_000);
      const quoteAssetAmount = new Decimal(Number(amountQuoteSwap)).div(1_000_000_000);
      const entryPrice = baseAssetAmount.eq(0)
        ? new Decimal(0)
        : quoteAssetAmount.div(baseAssetAmount);
      const sqrtPrice = new Decimal(PriceMath.sqrtPriceX64ToPrice(sPrice, 9, 9).toString());

      const daysInYear = new Decimal(365);
      const period = new Decimal(params.days);

      const impliedSqrtRate = Decimal.pow(
        1 / (1 - sqrtPrice.toNumber()),
        daysInYear.div(period).toNumber()
      ).minus(1);
      const impliedEntryRate = Decimal.pow(
        1 / (1 - entryPrice.toNumber()),
        daysInYear.div(period).toNumber()
      ).minus(1);

      console.log('****************');
      console.log('input value : ', params.input, params.amount);
      console.log('baseAssetAmount : ', baseAssetAmount.toString());
      console.log('quoteAssetAmount : ', quoteAssetAmount.toString());
      console.log('entryPrice : ', entryPrice.toString());
      console.log('sqrtPrice : ', sqrtPrice.toString());
      console.log('impliedSqrtRate : ', impliedSqrtRate.toString());
      console.log('impliedEntryRate : ', impliedEntryRate.toString());
      console.log('****************');

      return {
        key: [params.marketIndex, params.input, params.direction, params.amount].join('_'),
        baseAssetAmount: baseAssetAmount.toString(),
        quoteAssetAmount: quoteAssetAmount.toString(),
        entryPrice: entryPrice.toString(),
        sqrtPrice: sqrtPrice.toString(),
        impliedSqrtRate: impliedSqrtRate.toString(),
        impliedEntryRate: impliedEntryRate.toString(),
      };
    }

    return {
      key: [params.input, params.direction, params.amount].join('_'),
      baseAssetAmount: params.input === 'amount' ? params.amount : 0,
      quoteAssetAmount: params.input === 'margin' ? params.amount : 0,
      entryPrice: 0,
      sqrtPrice: 0,
      impliedSqrtRate: 0,
      impliedEntryRate: 0,
    };
  }

  async addPerpLpShares(params: {
    lowerRate: number;
    upperRate: number;
    maturity: number;
    amount: number;
    marketIndex: number;
    epochStartTimestamp: number;
  }) {
    if (!this.authority) {
      return;
    }
    const [userStatPda, transaction1, statInfo] = await this.am.initializeUserStatsTransaction(
      this.program,
      this.authority
    );
    let subAccountId = 0;
    let transaction2;
    let userPda;
    let user = await this.am.findLpUser(this.program, this.authority, {
      marketIndex: params.marketIndex,
      upperRate: params.upperRate,
      lowerRate: params.lowerRate,
    });
    if (!user) {
      if (statInfo?.data) {
        const stat = await this.program.account.userStats.fetch(userStatPda as PublicKey);
        subAccountId = stat.numberOfSubAccountsCreated ?? 0;
      }
      const [pda, t] = await this.am.initializeLpInstruction(
        this.program,
        this.authority,
        subAccountId
      );
      userPda = pda;
      transaction2 = t;
    } else {
      userPda = user.userPda;
    }

    const instructions: TransactionInstruction[] = await this.lp.addPerpLpShares(
      this.program,
      this.authority,
      this.am,
      this.tm,
      userPda,
      params
    );
    const combinedTransaction = new Transaction();
    !!transaction1 && combinedTransaction.add(transaction1);
    !!transaction2 && combinedTransaction.add(transaction2);
    instructions.forEach((ins) => {
      combinedTransaction.add(ins);
    });
    combinedTransaction.add(
      ComputeBudgetProgram.setComputeUnitLimit({
        units: 1_400_000,
      })
    );
    const tx = await this.sendTransaction(combinedTransaction);
    if (tx) {
      // await this.queryEvent(tx, 'addPerpLpShares');
    }
    return tx;
  }

  async removePerpLpShares(params: {
    marketIndex: number;
    lowerRate: number;
    upperRate: number;
    maturity: number;
    rmLiquidityPercent: number;
    baseAssetAmount: number;
    userPda: string;
  }) {
    if (!this.authority) {
      return;
    }
    const {userPda, ...other} = params;
    const instructions: TransactionInstruction[] = await this.lp.removePerpLpShares(
      this.program,
      this.authority,
      this.am,
      this.tm,
      new PublicKey(userPda),
      other
    );
    const combinedTransaction = new Transaction();
    instructions.forEach((ins) => {
      combinedTransaction.add(ins);
    });
    combinedTransaction.add(
      ComputeBudgetProgram.setComputeUnitLimit({
        units: 1_400_000,
      })
    );
    const tx = await this.sendTransaction(combinedTransaction);
    if (tx) {
      await this.queryEvent(tx, 'removePerpLpShares');
    }
    return tx;
  }

  async removePerpLpSharesView(params: {
    marketIndex: number;
    lowerRate: number;
    upperRate: number;
    maturity: number;
    rmLiquidityPercent: number;
    baseAssetAmount: number;
    userPda: string;
  }) {
    if (!this.authority) {
      return;
    }
    const {userPda, ...other} = params;
    const instructions: TransactionInstruction[] = await this.lp.removePerpLpShares(
      this.program,
      this.authority,
      this.am,
      this.tm,
      new PublicKey(userPda),
      other
    );
    const res = await this.sendViewTransaction(instructions);
    const {LPRecord, SwapEvent} = await this.parseLpRemoveLogs(res?.value?.logs as string[]);
    let result: Record<string, any> = {};
    if (LPRecord) {
      const lp = Object.keys(LPRecord).reduce((obj, k) => {
        if (obj[k] instanceof BN) {
          obj[k] = Big(obj[k].toString()).div(1_000_000_000).toString();
        }
        return obj;
      }, LPRecord);
      result = {...result, ...lp};
    }
    if (SwapEvent) {
      const swapEvent = Object.keys(SwapEvent).reduce((obj, k) => {
        if (obj[k] instanceof BN) {
          obj[k] = Big(obj[k].toString()).div(1_000_000_000).toString();
        }
        return obj;
      }, SwapEvent);
      result = {...result, ...swapEvent};
      if (swapEvent.amountA && swapEvent.amountB) {
        result.entryPrice = Big(swapEvent.amountB).div(swapEvent.amountA).round(9, 0).toString();
      }
    }
    console.log('remove result : ', result);
    return result;
  }

  async getAllLpPositions(ttmMap: Record<number, number>) {
    try {
      if (!this.authority) {
        return [];
      }
      const perpMarkets = await this.genPerpMarketsInfo();
      const positions = await this.am.getAllLPPositions(this.program, this.authority, perpMarkets);
      return this.calcLpPositionFees(positions, ttmMap, perpMarkets);
    } catch (e) {
      return [];
    }
  }

  async getLpPositions(marketIndex: number, ttmMap: Record<number, any>) {
    try {
      if (!this.authority) {
        return [];
      }
      const perpMarkets = await this.genPerpMarketsInfo();
      const positions = await this.am.getLpPositions(this.program, this.authority, marketIndex);
      return this.calcLpPositionFees(positions, ttmMap, perpMarkets);
    } catch (e) {
      return [];
    }
  }

  async genPerpMarketsInfo() {
    const marketIndexes = Object.keys(PerpMarketMap()).map(Number);
    const perps = await this.program.provider.connection.getMultipleAccountsInfo(
      marketIndexes.map((index: number) => new PublicKey(PerpMarketMap()[index]))
    );
    const perpMarkets: Record<string, any> = {};
    for (let i = 0; i < marketIndexes.length; i++) {
      const marketIndex = marketIndexes[i];
      const data = perps[i];
      if (!data) {
        continue;
      }
      const perpMarket = this.program.coder.accounts.decode('YieldMarket', data.data);
      const perpMarketPda = PerpMarketMap()[marketIndex];
      const sqrtPrice = perpMarket.pool.sqrtPrice;
      perpMarkets[perpMarketPda] = {marketIndex, perpMarket, sqrtPrice, pool: perpMarket.pool};
    }
    return perpMarkets;
  }

  async calcLpPositionFees(
    positions: any[],
    ttmMap: Record<number, any>,
    perpMarkets: Record<string, any>
  ) {
    if (!this.authority) {
      return positions;
    }
    const instructions = [];
    for (let i = 0; i < positions.length; i++) {
      const pos = positions[i];
      const {ammPosition, marketIndex, userPda, ammpool} = pos;
      const {upperRate, lowerRate} = ammPosition;
      if (!ttmMap[marketIndex]) {
        continue;
      }
      const updateInstruction = await this.lp.updateFeesAndRewards(
        this.program,
        this.authority,
        this.tm,
        new PublicKey(userPda),
        perpMarkets[ammpool],
        {upperRate, lowerRate, marketIndex, maturity: ttmMap[marketIndex]}
      );
      const collectInstruction = await this.lp.collectFees(
        this.program,
        this.authority,
        this.am,
        new PublicKey(userPda),
        {marketIndex}
      );
      instructions.push(updateInstruction);
      instructions.push(collectInstruction);
    }
    try {
      const tx = await this.sendViewTransaction(instructions);
      const result = await this.parseLpEarnFeeLogs(tx?.value?.logs || []);
      return positions.map((p) => {
        if (result[p.userPda]) {
          return {...p, earnFee: result[p.userPda]};
        }
        return p;
      });
    } catch (e) {
      console.error(e);
      return positions;
    }
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
    updateBalance$.next(0);
    return tx;
  }

  async withdraw(
    userPda: PublicKey,
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
    const instruction = await this.fm.withdraw(
      this.program,
      this.authority,
      this.am,
      userPda,
      newParams
    );

    const combinedTransaction = new Transaction();
    combinedTransaction.add(instruction);
    combinedTransaction.add(
      ComputeBudgetProgram.setComputeUnitLimit({
        units: 1_400_000,
      })
    );
    const tx = await this.sendTransaction(combinedTransaction);
    if (tx) {
      await this.queryEvent(tx, 'removePerpLpShares');
    }
    console.log('Withdraw Tx : ', tx);
    updateBalance$.next(0);
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

  async mintAll(amount: number) {
    if (!this.authority) {
      return false;
    }
    const wInst = await this.fm.mintToUserInstruction(this.tokenFaucetProgram, this.authority, {
      marginIndex: 0,
      amount,
    });
    const mInst = await this.fm.mintToUserInstruction(this.tokenFaucetProgram, this.authority, {
      marginIndex: 1,
      amount,
    });
    const jInst = await this.fm.mintToUserInstruction(this.tokenFaucetProgram, this.authority, {
      marginIndex: 2,
      amount,
    });
    const combinedTransaction = new Transaction();
    !!wInst && combinedTransaction.add(wInst);
    !!mInst && combinedTransaction.add(mInst);
    !!jInst && combinedTransaction.add(jInst);
    const tx = await this.sendTransaction(combinedTransaction);
    console.log('Mint All Currency : ', tx);
    return tx;
  }

  async getUserMintAccountByMarketIndex(marketIndex: number) {
    if (!this.authority) {
      return null;
    }
    return getAssociatedTokenAddressSync(
      getMintAccountPda(getMarginIndexByMarketIndexV2(marketIndex)),
      this.authority
    );
  }

  async getUserMintAccount(marginIndex: number) {
    if (!this.authority) {
      return null;
    }
    return getAssociatedTokenAddressSync(getMintAccountPda(marginIndex), this.authority);
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
    const instruction = await this.om.getAmmTwap(this.program, this.am, params);
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
      const transaction2 = await this.am.deleteUser(this.program, this.authority, user.userPda);
      !!transaction2 && combinedTransaction.add(transaction2);
    }
    await this.sendTransaction(combinedTransaction);
  }

  async getPerpMarketInfo(params: {marketIndex: number}) {
    return await this.lp.getPerpMarketInfo(this.program, this.am, params);
  }

  async parsePlaceOrderView(txID: string, callback?: (event: string, data?: any) => void) {
    const tx = await this.connection.getTransaction(txID, {commitment: 'confirmed'});
    if (!tx?.meta?.logMessages) {
      return;
    }
    const evts = this.parser?.parseLogs(tx?.meta?.logMessages);
    while (evts) {
      const evt: any = evts.next();
      if (evt?.value?.name) {
        callback?.(evt.value.name, evt.value.data);
      }
      if (evt.done) {
        callback?.('Finished');
        break;
      }
    }
  }

  async parseLpEarnFeeLogs(logMessages?: string[]) {
    let result: Record<string, string> = {};
    if (!logMessages) {
      return result;
    }
    const evts = this.parser?.parseLogs(logMessages);
    while (evts) {
      const evt: any = evts.next();
      if (evt?.value?.name === 'CollectFeesRecord') {
        if (evt?.value?.data) {
          const {feeA, feeB, user, perpMarket} = evt?.value?.data;
          result[user.toBase58()] = Big(feeA?.toString())
            .add(feeB?.toString())
            .div(1_000_000_000)
            .toString();
        }
      }
      console.log('events ', evt);
      if (evt.done) {
        break;
      }
    }
    return result;
  }

  async parseLpRemoveLogs(
    logMessages?: string[]
  ): Promise<{LPRecord: Record<string, any>; SwapEvent: Record<string, any>}> {
    let LPRecord = {},
      SwapEvent = {};
    if (!logMessages) {
      return {LPRecord, SwapEvent};
    }
    const evts = this.parser?.parseLogs(logMessages);
    while (evts) {
      const evt: any = evts.next();
      if (evt?.value?.name === 'LPRecord') {
        LPRecord = evt.value.data;
      }
      if (evt?.value?.name === 'SwapEvent') {
        SwapEvent = evt.value.data;
      }
      console.log('events ', evt);
      if (evt.done) {
        break;
      }
    }
    return {LPRecord, SwapEvent};
  }

  async queryEvent(txid: string, label: string) {
    const tx = await this.connection.getTransaction(txid, {commitment: 'confirmed'});
    console.log(label, tx);
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

  async confirmTransaction(txID: string) {
    try {
      await this.connection.confirmTransaction(txID, 'confirmed');
    } catch (e) {
      console.error(e);
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
