import {RateXPlaceOrderParams} from '@/types/rate-x-client';
import type {RatexContracts} from '@/types/ratex_contracts.ts';
import {BN, Program} from '@coral-xyz/anchor';
import {TOKEN_PROGRAM_ID} from '@solana/spl-token';
import {ComputeBudgetProgram, PublicKey, TransactionInstruction} from '@solana/web3.js';
import {Big} from 'big.js';
import Decimal from 'decimal.js';
import {PriceMath} from '../utils/price-math.ts';
import {AccountManager} from './account-manager.ts';
import {OrderType, PositionDirection} from './const.ts';
import {TickManager} from './tick-manager.ts';
import {
  getBaseAssetVaultPda,
  getMarginMarketPda,
  getObservationPda,
  getOraclePda,
  getPerpMarketPda,
  getQuoteAssetVaultPda,
  getTokenVaultAPda,
  getTokenVaultBPda,
} from './utils.ts';

export class OrderManager {
  constructor() {}

  async placeOrderTransaction(
    program: Program<RatexContracts>,
    authority: PublicKey,
    am: AccountManager,
    userPda: PublicKey,
    userOrdersPda: PublicKey,
    params: RateXPlaceOrderParams
  ): Promise<TransactionInstruction> {
    const {marketIndex, orderType, direction, marginType} = params;

    const perp = await program.account.perpMarket.fetch(getPerpMarketPda(marketIndex));
    let priceLimit = PriceMath.sqrtPriceX64ToPrice(perp.pool.sqrtPrice, 9, 9).times(
      new Decimal(direction === 'LONG' ? 1.1 : 0.9)
    );

    let cp = PriceMath.sqrtPriceX64ToPrice(perp.pool.sqrtPrice, 9, 9);
    let lp = cp.times(new Decimal(0.1));
    let up = cp.times(new Decimal(3));
    let lp64 = PriceMath.priceToSqrtPriceX64(lp, 9, 9);
    let up64 = PriceMath.priceToSqrtPriceX64(up, 9, 9);
    let lpIndex = PriceMath.sqrtPriceX64ToTickIndex(lp64);
    let upIndex = PriceMath.sqrtPriceX64ToTickIndex(up64);

    console.log('perpMarket : ', perp);
    console.log(
      'ObservationPda : ',
      perp.oracle.toBase58(),
      getObservationPda(marketIndex).toBase58(),
      getOraclePda(marketIndex).toBase58()
    );
    console.log('Current PriceLimit : ', cp.toString());
    console.log('Lower PriceLimit : ', lp.toString());
    console.log('Upper PriceLimit : ', up.toString());
    console.log('Lower PriceLimit 64 : ', lp64.toString());
    console.log('Upper PriceLimit 64 : ', up64.toString());
    console.log('Lower PriceLimit index : ', lpIndex.toString());
    console.log('Upper PriceLimit index : ', upIndex.toString());

    priceLimit = PriceMath.priceToSqrtPriceX64(priceLimit, 9, 9);
    const expireTs = new BN(Math.floor(Date.now() / 1000) + 10 * 60);
    const baseAssetAmount = new BN(
      Big(params.amount)
        .times(direction === 'LONG' ? 1 : -1)
        .times(1_000_000_000)
        .round(0)
        .toNumber()
    );
    const orderParams: any = {
      orderType: OrderType[orderType],
      direction: PositionDirection[direction],
      marketIndex,
      baseAssetAmount,
      priceLimit,
      expireTs,
    };

    const remainingAccounts: any = this.getRemainingAccounts(marketIndex);

    console.log('****************');
    console.log('marketIndex : ', marketIndex);
    console.log('orderType : ', orderType);
    console.log('direction : ', direction);
    console.log('marginType : ', marginType);
    console.log('base Asset Amount : ', baseAssetAmount.toString());
    console.log('priceLimit : ', priceLimit.toString());
    console.log('Price Limit : ', PriceMath.sqrtPriceX64ToTickIndex(priceLimit));
    console.log('Price Current index: ', perp.pool.tickCurrentIndex);
    console.log('userPda : ', userPda.toBase58());
    console.log('****************');

    return await program.methods
      .placePerpOrder(orderParams)
      .remainingAccounts(remainingAccounts)
      .accounts({
        state: am.statePda,
        user: userPda,
        userOrders: userOrdersPda,
        authority,
      })
      .instruction();
  }

  async simulateSwap(
    program: Program<RatexContracts>,
    authority: PublicKey,
    am: AccountManager,
    tm: TickManager,
    params: {
      amount: number;
      direction: 'LONG' | 'SHORT';
      marketIndex: number;
    }
  ) {
    const {amount, marketIndex, direction} = params;
    const perpMarket = getPerpMarketPda(marketIndex);
    const perp = await program.account.perpMarket.fetch(perpMarket);
    let priceLimit = PriceMath.tickIndexToPrice(perp.pool.tickCurrentIndex, 5, 5);
    priceLimit = priceLimit.mul(direction === 'LONG' ? 1.1 : 0.9);
    priceLimit = PriceMath.priceToSqrtPriceX64(priceLimit, 5, 5);
    const baseAssetAmount = new BN(
      Big(params.amount)
        .times(direction === 'LONG' ? 1 : -1)
        .times(1_000_000_000)
        .round(0)
        .toNumber()
    );

    console.log('PriceLimit : ', priceLimit.toString());
    const tickArrays = await tm.getFillOrderTickArrays(
      program,
      authority,
      perpMarket,
      perp.pool.tickCurrentIndex,
      priceLimit,
      baseAssetAmount.lt(new BN(0))
    );

    console.log('**********************');
    console.log('Direction : ', direction);
    console.log('MarketIndex : ', marketIndex);
    console.log('BaseAssetAmount : ', amount);
    console.log('PerpMarket : ', perp);
    console.log('tickCurrentIndex : ', perp.pool.tickCurrentIndex);
    console.log('priceLimit x64 : ', priceLimit.toString());
    console.log('priceLimit index : ', PriceMath.sqrtPriceX64ToTickIndex(priceLimit).toString());
    console.log(
      'priceLimit to price : ',
      PriceMath.sqrtPriceX64ToPrice(priceLimit, 5, 5).toString()
    );
    for (let i = 0; i < 3; i++) {
      const ai = await program.account.tickArray.fetch(tickArrays[i]);
      console.log(`TickArray ${i} :  `, tickArrays[i].toBase58(), ai, perp.pool.tickCurrentIndex);
    }
    console.log('**********************');

    const swapResult = await program.methods.simulateSwap(baseAssetAmount, priceLimit).accounts({
      state: am.statePda,
      observation: getObservationPda(marketIndex),
      driftSigner: am.signerPda,
      authority,
      tokenProgram: TOKEN_PROGRAM_ID,
      whirlpool: perpMarket,
      tokenOwnerAccountA: getBaseAssetVaultPda(marketIndex),
      tokenOwnerAccountB: getQuoteAssetVaultPda(marketIndex),
      tokenVaultA: getTokenVaultAPda(marketIndex),
      tokenVaultB: getTokenVaultBPda(marketIndex),
      tickArray0: tickArrays[0],
      tickArray1: tickArrays[1],
      tickArray2: tickArrays[2],
    });
    // .simulate();

    try {
      // let row: any = swapResult.raw.find((elm: any) => elm.indexOf('return') > 0);
      // row = row.slice(row.indexOf(program.programId.toBase58()));

      let buf = Buffer.from('AMqaOwAAAACYA40GAAAAAA==', 'base64');
      // let buf = Buffer.from(row.slice(row.indexOf(' ')), 'base64');
      const amountBaseSwap = buf.readBigUInt64LE(0);
      const amountQuoteSwap = buf.readBigUInt64LE(8);
      const baseAssetAmount = Big(Number(amountBaseSwap)).div(1_000_000_000).toNumber();

      console.log('amount base swap : ', amountBaseSwap);
      console.log('amount quote swap : ', amountQuoteSwap);

      return {
        baseAssetAmount: Big(Number(amountBaseSwap)).div(1_000_000_000).toNumber(),
        quoteAssetAmount: Big(Number(amountQuoteSwap))
          .div(1_000_000_000)
          .div(baseAssetAmount)
          .toNumber(),
      };
    } catch (e) {
      console.error('SimulateSwap : ', e);
      return {
        baseAssetAmount: amount,
        quoteAssetAmount: 0,
      };
    }
  }

  async fillOrder(
    program: Program<RatexContracts>,
    authority: PublicKey,
    am: AccountManager,
    tm: TickManager,
    params: {
      userPda: PublicKey;
      marketIndex: number;
      orderId: number;
    }
  ) {
    const {marketIndex, orderId, userPda} = params;

    const userStatPda = await am.initializeUserStats(program, authority);
    const userOrdersPda = await am.initializeUserOrders(program, authority, userPda);

    const user = await program.account.userOrders.fetch(userOrdersPda);
    const order = user.orders?.find((o) => {
      if (o.orderId == orderId && !o.baseAssetAmount.eq(new BN(0))) {
        return o;
      }
      return false;
    });

    if (!order) {
      console.log(`Order id ${orderId} not exist`);
      return;
    }

    const remainingAccounts: any = this.getRemainingAccounts(marketIndex);
    const perpMarket = getPerpMarketPda(marketIndex);
    const perp = await program.account.perpMarket.fetch(perpMarket);
    // TODO LONG > 0 or SHORT <0
    const baseAssetAmount = order.baseAssetAmount;
    const tokenVaultA = perp.pool.tokenVaultA;
    const tokenVaultB = perp.pool.tokenVaultB;

    const tickArrays = await tm.getFillOrderTickArrays(
      program,
      authority,
      perpMarket,
      perp.pool.tickCurrentIndex,
      order.priceLimit,
      baseAssetAmount.lt(new BN(0))
    );
    console.log('**********************');
    console.log('Order ', order);
    console.log('perpMarket : ', perp);
    console.log('oracle : ', perp.pool.oracle.toBase58());
    console.log('Price Limit : ', order.priceLimit.toString());
    console.log('Base Asset Amount : ', baseAssetAmount.toString());
    console.log('remainingAccounts : ', remainingAccounts);
    console.log('market index : ', marketIndex);
    console.log('user Pda ', userPda);
    for (let i = 0; i < 3; i++) {
      const ai = await program.account.tickArray.fetch(tickArrays[i]);
      console.log(`TickArray ${i} :  `, tickArrays[i].toBase58(), ai, perp.pool.tickCurrentIndex);
    }
    console.log('**********************');
    if (tickArrays.length < 1) {
      console.log('TickArray is empty');
      return;
    }
    const modifyComputeUnits = ComputeBudgetProgram.setComputeUnitLimit({
      units: 1600000,
    });
    return await program.methods
      .fillPerpOrder(orderId)
      .preInstructions([modifyComputeUnits])
      .remainingAccounts(remainingAccounts)
      .accounts({
        user: userPda,
        userStats: userStatPda,
        keepers: am.keeperPda,
        state: am.statePda,
        driftSigner: am.signerPda,
        authority,
        userOrders: userOrdersPda,
        whirlpool: perpMarket,
        tokenOwnerAccountA: getBaseAssetVaultPda(marketIndex),
        tokenOwnerAccountB: getQuoteAssetVaultPda(marketIndex),
        tokenVaultA,
        tokenVaultB,
        tickArray0: tickArrays[0],
        tickArray1: tickArrays[1],
        tickArray2: tickArrays[2],
        tokenProgram: TOKEN_PROGRAM_ID,
      })
      .rpc();
  }

  async getPositionValue(
    program: Program<RatexContracts>,
    authority: PublicKey,
    am: AccountManager,
    userPda: PublicKey,
    userOrdersPda: PublicKey
  ) {
    const user = await program.account.user.fetch(userPda);
    const perpMarkets = user?.perpPositions
      ?.reduce((indexs: number[], p: any) => {
        if (indexs.includes(p.marketIndex)) {
          return indexs;
        }
        return [...indexs, p.marketIndex];
      }, [])
      .sort()
      .map((m) => ({pubkey: getPerpMarketPda(m), isSigner: false, isWritable: true}));

    const remainingAccounts = [
      {pubkey: getMarginMarketPda(1), isSigner: false, isWritable: true},
      ...perpMarkets,
      {pubkey: getOraclePda(0), isSigner: false, isWritable: true},
      {pubkey: getOraclePda(4), isSigner: false, isWritable: true},
    ];

    const positionValue = await program.methods
      .calculatePositionValue()
      .accounts({user: userPda})
      .remainingAccounts(remainingAccounts)
      .view();

    const marginValue = await program.methods
      .calculateMarginValue()
      .accounts({user: userPda})
      .remainingAccounts(remainingAccounts)
      .view();

    console.log('Calculate Position Value : ', positionValue);
    console.log('Calculate Margin Value : ', marginValue);

    return {positionValue, marginValue};
  }

  async getTwap(program: Program<RatexContracts>, params: {marketIndex: number}) {
    const twap = await program.methods
      .getAmmTwap(900)
      .accounts({
        perpMarket: getPerpMarketPda(params.marketIndex),
        observation: getObservationPda(params.marketIndex),
      })
      .view();
    console.log('Get Twap : ', twap);
  }

  async cancelOrder(
    program: Program<RatexContracts>,
    authority: PublicKey,
    am: AccountManager,
    params: {
      userPda: PublicKey;
      userOrdersPda: PublicKey;
      orderId: number;
    }
  ) {
    const {userPda, userOrdersPda, orderId} = params;
    return await program.methods
      .cancelOrder(orderId)
      .accounts({
        state: am.statePda,
        user: userPda,
        userOrders: userOrdersPda,
        authority,
      })
      .rpc();
  }

  getRemainingAccounts(marketIndex: number) {
    return [
      {
        pubkey: getMarginMarketPda(0),
        isSigner: false,
        isWritable: true,
      },
      {
        pubkey: getMarginMarketPda(1),
        isSigner: false,
        isWritable: true,
      },
      {
        pubkey: getPerpMarketPda(2),
        isSigner: false,
        isWritable: true,
      },
      {
        pubkey: getPerpMarketPda(4),
        isSigner: false,
        isWritable: true,
      },
      {
        pubkey: getPerpMarketPda(8),
        isSigner: false,
        isWritable: true,
      },
      {
        pubkey: getPerpMarketPda(9),
        isSigner: false,
        isWritable: true,
      },
      {
        pubkey: getPerpMarketPda(10),
        isSigner: false,
        isWritable: true,
      },
      {
        pubkey: new PublicKey('9HdYPM2z3rdXrMAEHhsSRF48UKCQNcrdzMHtH4zKF6fu'),
        isSigner: false,
        isWritable: true,
      },
      {
        pubkey: getOraclePda(0),
        isSigner: false,
        isWritable: true,
      },
      {
        pubkey: getOraclePda(4),
        isSigner: false,
        isWritable: true,
      },
      {
        pubkey: getObservationPda(2),
        isSigner: false,
        isWritable: true,
      },
      {
        pubkey: getObservationPda(4),
        isSigner: false,
        isWritable: true,
      },
      {
        pubkey: getObservationPda(8),
        isSigner: false,
        isWritable: true,
      },
      {
        pubkey: getObservationPda(9),
        isSigner: false,
        isWritable: true,
      },
      {
        pubkey: getObservationPda(10),
        isSigner: false,
        isWritable: true,
      },
    ];
  }

  async addKeeper(
    program: Program<RatexContracts>,
    authority: PublicKey,
    am: AccountManager,
    keeper: PublicKey
  ) {
    return await program.methods
      .addKeeper(keeper)
      .accounts({
        state: am.statePda,
        keepers: am.keeperPda,
        admin: authority,
      })
      .rpc({commitment: 'confirmed'});
  }
}
