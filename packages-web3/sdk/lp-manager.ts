import {PDA} from '@/sdk/PDA';
import {AccountManager} from '@/sdk/account-manager';
import {TickManager} from '@/sdk/tick-manager';
import {getMarginIndexByMarketIndexV2, getMintAccountPda, getObservationPda} from '@/sdk/utils';
import type {RatexContracts} from '@/types/ratex_contracts';
import {PriceMath} from '@/utils/price-math';
import {BN, Program} from '@coral-xyz/anchor';
import {TOKEN_PROGRAM_ID, getAccount, getAssociatedTokenAddressSync} from '@solana/spl-token';
import {PublicKey, SystemProgram, TransactionInstruction} from '@solana/web3.js';
import {Big} from 'big.js';
import Decimal from 'decimal.js';

export const tickSpacing = 10;

export class LpManager {
  constructor() {}

  async addPerpLpShares(
    program: Program<RatexContracts>,
    authority: PublicKey,
    am: AccountManager,
    tm: TickManager,
    userPda: PublicKey,
    params: {
      lowerRate: number;
      upperRate: number;
      amount: number;
      marketIndex: number;
      maturity: number;
      epochStartTimestamp: number;
    }
  ): Promise<TransactionInstruction[]> {
    const {
      amount = 50000,
      marketIndex,
      lowerRate,
      upperRate,
      maturity,
      epochStartTimestamp,
    } = params;
    const marginIndex = getMarginIndexByMarketIndexV2(marketIndex);
    const marginMarket = PDA.createMarginMarketPda(marginIndex);
    const marginMarketVault = PDA.createMarginMarketVaultPda(marginIndex);
    const oracle = PDA.createOraclePda(getMarginIndexByMarketIndexV2(marketIndex));
    const mintAccount: PublicKey = getMintAccountPda(marginIndex);
    const userTokenAccount: PublicKey = getAssociatedTokenAddressSync(mintAccount, authority);
    const yieldMarket: PublicKey = PDA.createYieldMarketPda(marketIndex);
    const quoteAssetVault: PublicKey = PDA.createQuoteAssetVaultPda(marketIndex);
    const baseAssetVault: PublicKey = PDA.createBaseAssetVaultPda(marketIndex);

    const lr = new BN(Big(lowerRate).times(1_000_000_000).toString());
    const ur = new BN(Big(upperRate).times(1_000_000_000).toString());

    const tb = await getAccount(program.provider.connection, quoteAssetVault);
    const ta = await getAccount(program.provider.connection, baseAssetVault);
    const perp = await program.account.yieldMarket.fetch(yieldMarket);

    const {pool} = perp;
    const tokenVaultA: PublicKey = pool.tokenVaultA;
    const tokenVaultB: PublicKey = pool.tokenVaultB;
    const tokenMintA: PublicKey = ta.mint;
    const tokenMintB: PublicKey = tb.mint;

    // const clock = await program.provider.connection.getAccountInfo(SYSVAR_CLOCK_PUBKEY);
    // let epochStartTimestamp1 = new BN(Number(clock!.data.readBigInt64LE(8)));
    // console.log(epochStartTimestamp1.toString());

    // const lowerInstruction = await program.methods
    //   .calculateTickIndex(new BN(maturity), lr, pool.tickSpacing, true)
    //   .instruction();
    // const lRes = await this.sendViewTransaction(program, authority, [lowerInstruction]);
    // if (!lRes?.value?.returnData?.data) {
    //   return null;
    // }
    // let lbuf = Buffer.from(lRes?.value?.returnData?.data[0], lRes?.value?.returnData?.data[1]);
    // const tickLowerIndex = lbuf.readInt32LE(0);

    // const upperInstruction = await program.methods
    //   .calculateTickIndex(new BN(maturity), ur, pool.tickSpacing, false)
    //   .instruction();

    // const uRes = await this.sendViewTransaction(program, authority, [upperInstruction]);
    // if (!uRes?.value?.returnData?.data) {
    //   return null;
    // }
    // let ubuf = Buffer.from(uRes?.value?.returnData?.data[0], uRes?.value?.returnData?.data[1]);
    // const tickUpperIndex = ubuf.readInt32LE(0);

    const lowerYTPrice = calculateYTPrice(lowerRate.toString(), maturity);
    const sqrtLowerYTPrice = PriceMath.priceToSqrtPriceX64(lowerYTPrice, 9, 9);
    const rawLowerTickIndex = PriceMath.sqrtPriceX64ToTickIndex(sqrtLowerYTPrice);
    const tickLowerIndex = calculateTickIndex(rawLowerTickIndex, pool.tickSpacing, true);

    const upperYTPrice = calculateYTPrice(upperRate.toString(), maturity);
    const sqrtUpperYTPrice = PriceMath.priceToSqrtPriceX64(upperYTPrice, 9, 9);
    const rawUpperTickIndex = PriceMath.sqrtPriceX64ToTickIndex(sqrtUpperYTPrice);
    const tickUpperIndex = calculateTickIndex(rawUpperTickIndex, pool.tickSpacing, false);

    const [tickArrays, instructions]: any = await tm.initializeTickArraysV2(
      program,
      authority,
      yieldMarket,
      tickLowerIndex,
      tickUpperIndex
    );
    const tickArrayLower = tickArrays[0];
    const tickArrayUpper = tickArrays[tickArrays.length - 1];

    const baseAmount = new BN(Big(amount).times(1_000_000_000).toNumber());

    tickArrays.forEach((t: PublicKey) => {
      console.log(t.toBase58());
    });
    console.log('****************');
    console.log('dex : ', perp.marketIndex, marketIndex);
    console.log('tick spacing : ', pool.tickSpacing);
    console.log(
      'tickCurrentIndex',
      pool.tickCurrentIndex,
      PriceMath.tickIndexToPrice(pool.tickCurrentIndex, 9, 9).toString(),
      PriceMath.tickIndexToPrice(pool.tickCurrentIndex, 9, 9).toString()
    );
    console.log('lowerYTPrice - upperYTPrice', lowerYTPrice.toString(), upperYTPrice.toString());
    console.log('tickLowerIndex - tickUpperIndex', tickLowerIndex, tickUpperIndex);
    console.log(
      'tickArrayLower - tickArrayUpper',
      tickArrayLower.toBase58(),
      tickArrayUpper.toBase58()
    );
    console.log('Amount : ', amount);
    console.log('****************');

    const instruction = await program.methods
      .addLpShares(baseAmount, marginIndex, marketIndex, lr, ur)
      .accounts({
        state: am.statePda,
        ratexSigner: am.signerPda,
        tokenVaultA: tokenVaultA,
        tokenVaultB: tokenVaultB,
        tickArrayLower,
        tickArrayUpper,
        yieldMarket,
        tokenOwnerAccountA: baseAssetVault,
        tokenOwnerAccountB: quoteAssetVault,
        tokenMintA: tokenMintA,
        tokenMintB: tokenMintB,
        marginMarket,
        marginMarketVault,
        lpOracle: oracle,
        oracle,
        userTokenAccount,
        tokenProgram: TOKEN_PROGRAM_ID,
        systemProgram: SystemProgram.programId,
        lp: userPda,
        authority,
      })
      .instruction();
    return [...instructions, instruction];
  }

  async removePerpLpShares(
    program: Program<RatexContracts>,
    authority: PublicKey,
    am: AccountManager,
    tm: TickManager,
    userPda: PublicKey,
    params: {
      marketIndex: number;
      lowerRate: number;
      upperRate: number;
      maturity: number;
      rmLiquidityPercent: number;
      baseAssetAmount: number;
    }
  ) {
    const {marketIndex, baseAssetAmount, lowerRate, upperRate, maturity, rmLiquidityPercent} =
      params;
    const yieldMarket = PDA.createYieldMarketPda(marketIndex);
    const {pool} = await program.account.yieldMarket.fetch(yieldMarket);
    const marginIndex = getMarginIndexByMarketIndexV2(marketIndex);
    const marginMarket = PDA.createMarginMarketPda(marginIndex);
    const marginMarketVault = PDA.createMarginMarketVaultPda(marginIndex);
    const oracle = PDA.createOraclePda(getMarginIndexByMarketIndexV2(marketIndex));
    const mintAccount: PublicKey = getMintAccountPda(marginIndex);
    const userTokenAccount: PublicKey = getAssociatedTokenAddressSync(mintAccount, authority);
    const quoteAssetVault: PublicKey = PDA.createQuoteAssetVaultPda(marketIndex);
    const baseAssetVault: PublicKey = PDA.createBaseAssetVaultPda(marketIndex);

    const tb = await getAccount(program.provider.connection, quoteAssetVault);
    const ta = await getAccount(program.provider.connection, baseAssetVault);

    const tokenVaultA: PublicKey = pool.tokenVaultA;
    const tokenVaultB: PublicKey = pool.tokenVaultB;
    const tokenMintA: PublicKey = ta.mint;
    const tokenMintB: PublicKey = tb.mint;

    let priceLimitDecimal = PriceMath.tickIndexToPrice(pool.tickCurrentIndex, 5, 5);
    priceLimitDecimal = priceLimitDecimal.mul(baseAssetAmount > 0 ? 1.1 : 0.9);
    const priceLimit = PriceMath.priceToSqrtPriceX64(priceLimitDecimal, 5, 5);
    const baseAssetamount = new BN(Big(baseAssetAmount).times(1_000_000_000).toNumber());
    const tickArrs = await tm.getFillOrderTickArrays(
      program,
      authority,
      yieldMarket,
      pool.tickCurrentIndex,
      priceLimit,
      baseAssetamount.lt(new BN(0))
    );

    const lowerYTPrice = calculateYTPrice(lowerRate.toString(), maturity);
    const sqrtLowerYTPrice = PriceMath.priceToSqrtPriceX64(lowerYTPrice, 9, 9);
    const rawLowerTickIndex = PriceMath.sqrtPriceX64ToTickIndex(sqrtLowerYTPrice);
    const tickLowerIndex = calculateTickIndex(rawLowerTickIndex, pool.tickSpacing, true);

    const upperYTPrice = calculateYTPrice(upperRate.toString(), maturity);
    const sqrtUpperYTPrice = PriceMath.priceToSqrtPriceX64(upperYTPrice, 9, 9);
    const rawUpperTickIndex = PriceMath.sqrtPriceX64ToTickIndex(sqrtUpperYTPrice);
    const tickUpperIndex = calculateTickIndex(rawUpperTickIndex, pool.tickSpacing, false);

    const [tickArrays, instructions]: any = await tm.initializeTickArraysV2(
      program,
      authority,
      yieldMarket,
      tickLowerIndex,
      tickUpperIndex,
      true
    );
    const tickArrayLower = tickArrays[0];
    const tickArrayUpper = tickArrays[tickArrays.length - 1];

    const instruction = await program.methods
      .removeLpShares(new BN(Big(rmLiquidityPercent).times(1_000_000_0).toString()), priceLimit)
      .remainingAccounts([
        ...tickArrs.map((t) => ({
          pubkey: t,
          isSigner: false,
          isWritable: true,
        })),
      ])
      .accounts({
        state: am.statePda,
        ratexSigner: am.signerPda,
        authority,
        lp: userPda,
        yieldMarket,
        tickArrayLower,
        tickArrayUpper,
        tokenVaultA,
        tokenVaultB,
        tokenOwnerAccountA: baseAssetVault,
        tokenOwnerAccountB: quoteAssetVault,
        tokenMintA: tokenMintA,
        tokenMintB: tokenMintB,
        marginMarket,
        marginMarketVault,
        lpOracle: oracle,
        oracle,
        userTokenAccount,
        observationState: getObservationPda(marketIndex),
        tokenProgram: TOKEN_PROGRAM_ID,
        systemProgram: SystemProgram.programId,
      })
      .instruction();

    return [instruction];
  }

  async updateFeesAndRewards(
    program: Program<RatexContracts>,
    authority: PublicKey,
    tm: TickManager,
    lp: PublicKey,
    params: {
      marketIndex: number;
      lowerRate: number;
      upperRate: number;
      maturity: number;
      tickLowerIndex: number;
      tickUpperIndex: number;
    }
  ) {
    const {marketIndex, lowerRate, upperRate, maturity, tickUpperIndex, tickLowerIndex} = params;
    const yieldMarket = PDA.createYieldMarketPda(marketIndex);

    const [tickArrays, instructions]: any = await tm.initializeTickArraysV2(
      program,
      authority,
      yieldMarket,
      tickLowerIndex,
      tickUpperIndex,
      true
    );

    const tickArrayLower = tickArrays[0];
    const tickArrayUpper = tickArrays[tickArrays.length - 1];

    return await program.methods
      .updateFeesAndRewards()
      .accounts({
        yieldMarket: yieldMarket,
        positionAuthority: authority,
        lp,
        tickArrayLower,
        tickArrayUpper,
      })
      .instruction();
  }

  async collectFees(
    program: Program<RatexContracts>,
    authority: PublicKey,
    am: AccountManager,
    lp: PublicKey,
    params: {marketIndex: number}
  ) {
    const {marketIndex} = params;
    const mintAccount: PublicKey = getMintAccountPda(0);
    const userTokenAccount: PublicKey = getAssociatedTokenAddressSync(mintAccount, authority);
    return await program.methods
      .collectFees()
      .accounts({
        yieldMarket: PDA.createYieldMarketPda(marketIndex),
        marginMarket: PDA.createMarginMarketPda(0),
        state: am.statePda,
        ratexSigner: am.signerPda,
        positionAuthority: authority,
        lp,
        tokenOwnerAccount: userTokenAccount,
        tokenVaultMargin: PDA.createMarginMarketVaultPda(0),
        tokenProgram: TOKEN_PROGRAM_ID,
      })
      .instruction();
  }

  async getPerpMarketInfo(
    program: Program<RatexContracts>,
    am: AccountManager,
    params: {marketIndex: number}
  ) {
    const {marketIndex} = params;
    const yieldMarketPda = PDA.createYieldMarketPda(marketIndex);
    const perp = await program.account.yieldMarket.fetch(yieldMarketPda);
    const {pool} = perp;
    const {tokenVaultA, tokenVaultB} = pool;

    const tva = await getAccount(program.provider.connection, tokenVaultA);
    const tvb = await getAccount(program.provider.connection, tokenVaultB);

    console.log('PerpMarket : ', perp);
    console.log('Pool : ', pool);
    console.log('Oracle : ', pool.oracle.toBase58());
    console.log('TokenVaultA : ', tokenVaultA.toBase58(), tva);
    console.log('TokenVaultB : ', tokenVaultB.toBase58(), tvb);
    console.log('perp market : ', perp);
    console.log('lpAccountsProcessed : ', perp.lpAccountsProcessed.toString());
    console.log('numberOfActiveLpAccounts : ', perp.numberOfActiveLpAccounts.toString());
    console.log('numberOfActiveLpAccountsProcessed : ', perp.numberOfActiveLpAccounts.toString());
    console.log(
      'TokenVaultA Amount : ',
      new Decimal(tva.amount.toString()).div(1_000_000_000).toString()
    );
    console.log(
      'TokenVaultB Amount : ',
      new Decimal(tvb.amount.toString()).div(1_000_000_000).toString()
    );
    return {
      tickCurrentIndex: pool.tickCurrentIndex,
      currentIndexPrice: PriceMath.tickIndexToPrice(pool.tickCurrentIndex, 9, 9).toString(),
      sqrtPrice: PriceMath.sqrtPriceX64ToPrice(pool.sqrtPrice, 9, 9).toString(),
      liquidity: Big(pool.liquidity.toString()).div(1_000_000_000).toString(),
      tokenVaultA: new Decimal(tva.amount.toString()).div(1_000_000_000).toString(),
      tokenVaultB: new Decimal(tvb.amount.toString()).div(1_000_000_000).toString(),
    };
  }
}

export function calculateYTPrice(impliedRate: string, maturity: number): Decimal {
  const one = new Decimal(1);
  const maturityFraction = new Decimal(maturity).div(new Decimal(365 * 24 * 3600));
  const onePlusRate = one.plus(new Decimal(impliedRate));
  const compound = onePlusRate.pow(maturityFraction);
  return one.minus(one.div(compound));
}

export function calculateTickIndex(tickIndex: number, tickSpacing: number, lower: boolean): number {
  if (lower) {
    return Math.floor(tickIndex / tickSpacing) * tickSpacing;
  } else {
    return Math.ceil(tickIndex / tickSpacing) * tickSpacing;
  }
}
