import {AccountManager, PROGRAM_ID} from '@/sdk/account-manager';
import {TickManager} from '@/sdk/tick-manager';
import {getPerpMarketPda} from '@/sdk/utils';
import type {RatexContracts} from '@/types/ratex_contracts.ts';
import {PriceMath} from '@/utils/price-math';
import {BN, Program, Wallet} from '@coral-xyz/anchor';
import {TOKEN_PROGRAM_ID, getAccount} from '@solana/spl-token';
import {PublicKey, SystemProgram, TransactionInstruction} from '@solana/web3.js';
import {Big} from 'big.js';
import {Buffer} from 'buffer';
import Decimal from 'decimal.js';

export const tickSpacing = 10;

export class LpManager {
  constructor() {}

  async addPerpLpShares(
    program: Program<RatexContracts>,
    wallet: Wallet,
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
    }
  ): Promise<TransactionInstruction> {
    const {amount = 50000, marketIndex, lowerRate, upperRate, maturity} = params;
    const perpMarket: PublicKey = getPerpMarketPda(marketIndex);
    const quoteAssetVault: PublicKey = am.createQuoteAssetVaultPda(marketIndex);
    const baseAssetVault: PublicKey = am.createBaseAssetVaultPda(marketIndex);

    const lr = new BN(Big(lowerRate).times(1_000_000_000).toString());
    const ur = new BN(Big(upperRate).times(1_000_000_000).toString());

    const tb = await getAccount(program.provider.connection, quoteAssetVault);
    const ta = await getAccount(program.provider.connection, baseAssetVault);
    const perp = await program.account.perpMarket.fetch(perpMarket);

    const {pool} = perp;
    const tokenVaultA: PublicKey = pool.tokenVaultA;
    const tokenVaultB: PublicKey = pool.tokenVaultB;
    const tokenMintA: PublicKey = ta.mint;
    const tokenMintB: PublicKey = tb.mint;

    const lowerYTPrice = calculateYTPrice(lowerRate.toString(), maturity);
    const sqrtLowerYTPrice = PriceMath.priceToSqrtPriceX64(lowerYTPrice, 9, 9);
    const rawLowerTickIndex = PriceMath.sqrtPriceX64ToTickIndex(sqrtLowerYTPrice);
    const tickLowerIndex = calculateTickIndex(rawLowerTickIndex, pool.tickSpacing, true);

    const upperYTPrice = calculateYTPrice(upperRate.toString(), maturity);
    const sqrtUpperYTPrice = PriceMath.priceToSqrtPriceX64(upperYTPrice, 9, 9);
    const rawUpperTickIndex = PriceMath.sqrtPriceX64ToTickIndex(sqrtUpperYTPrice);
    const tickUpperIndex = calculateTickIndex(rawUpperTickIndex, pool.tickSpacing, false);

    console.log('tickLowerIndex - tickUpperIndex', tickLowerIndex, tickUpperIndex);

    const positionMintSeeds = [
      Buffer.from('position_mint'),
      lr.toArrayLike(Buffer, 'le', 8),
      ur.toArrayLike(Buffer, 'le', 8),
      perpMarket.toBuffer(),
    ];
    const positionMint = PublicKey.findProgramAddressSync(positionMintSeeds, PROGRAM_ID)[0];

    const positionTokenAccountSeeds = [
      Buffer.from('position_token_account'),
      lr.toArrayLike(Buffer, 'le', 8),
      ur.toArrayLike(Buffer, 'le', 8),
      perpMarket.toBuffer(),
    ];
    const positionTokenAccount = PublicKey.findProgramAddressSync(
      positionTokenAccountSeeds,
      PROGRAM_ID
    )[0];
    const position = PublicKey.findProgramAddressSync(
      [Buffer.from('position'), positionMint.toBuffer()],
      PROGRAM_ID
    )[0];
    const tickArrays = await tm.initializeTickArraysV2(
      program,
      wallet,
      authority,
      perpMarket,
      tickLowerIndex,
      tickUpperIndex
    );
    const tickArrayLower = tickArrays[0];
    const tickArrayUpper = tickArrays[tickArrays.length - 1];

    const baseAmount = new BN(Big(amount).times(1_000_000_000).toNumber());

    console.log('****************');
    console.log('User Pda : ', userPda);
    console.log('Market Index : ', perp.marketIndex, marketIndex);
    console.log('position mint : ', positionMint.toBase58(), position.toBase58());
    console.log(`tickLowerIndex[${tickLowerIndex}] - tickUpperIndex[${tickUpperIndex}]`);
    console.log('Amount : ', amount);
    console.log('****************');

    return await program.methods
      .addPerpLpShares(baseAmount, marketIndex, Math.round(maturity), lr, ur)
      .accounts({
        position,
        positionMint,
        positionTokenAccount,
        tokenProgram: TOKEN_PROGRAM_ID,
        tokenOwnerAccountA: baseAssetVault,
        tokenOwnerAccountB: quoteAssetVault,
        tokenVaultA: tokenVaultA,
        tokenVaultB: tokenVaultB,
        tokenMintA: tokenMintA,
        tokenMintB: tokenMintB,
        tickArrayLower,
        tickArrayUpper,
        driftSigner: am.signerPda,
        user: userPda,
        state: am.statePda,
        perpMarket,
        authority,
        systemProgram: SystemProgram.programId,
      })
      .instruction();
  }
  async getPerpMarketInfo(program: Program<RatexContracts>, params: {marketIndex: number}) {
    const {marketIndex} = params;
    const perpMarketPda = getPerpMarketPda(marketIndex);
    const perp = await program.account.perpMarket.fetch(perpMarketPda);
    const {pool} = perp;
    const {tokenVaultA, tokenVaultB} = pool;

    const tva = await getAccount(program.provider.connection, tokenVaultA);
    const tvb = await getAccount(program.provider.connection, tokenVaultB);

    console.log('PerpMarket : ', perp);
    console.log('Pool : ', pool);
    console.log('Oracle : ', pool.oracle.toBase58());
    console.log('TokenVaultA : ', tokenVaultA.toBase58(), tva);
    console.log('TokenVaultB : ', tokenVaultB.toBase58(), tvb);
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
      tokenVaultA: new Decimal(tva.amount.toString()).div(1_000_000_000).toString(),
      tokenVaultB: new Decimal(tvb.amount.toString()).div(1_000_000_000).toString(),
    };
  }
}

export function calculateYTPrice(impliedRate: string, maturity: number): Decimal {
  const one = new Decimal(1);
  const maturityFraction = new Decimal(maturity).div(new Decimal(365));
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
