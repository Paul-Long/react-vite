import type {RatexContracts} from '@/types/ratex_contracts.ts';
import {BN, Program, Wallet} from '@coral-xyz/anchor';
import {TOKEN_PROGRAM_ID, getAccount} from '@solana/spl-token';
import {PublicKey, SystemProgram} from '@solana/web3.js';
import {Big} from 'big.js';
import {AccountManager, PROGRAM_ID} from './account-manager.ts';
import {TickManager} from './tick-manager.ts';
import {
  getBaseAssetVaultPda,
  getPerpMarketPda,
  getQuoteAssetVaultPda,
  getTokenMintAPda,
  getTokenMintBPda,
  getTokenVaultAPda,
  getTokenVaultBPda,
} from './utils.ts';

export const tickSpacing = 10;

export class LpManager {
  constructor() {}

  async addPerpLpShares(
    program: Program<RatexContracts>,
    wallet: Wallet,
    authority: PublicKey,
    am: AccountManager,
    tm: TickManager,
    params: {
      tickLowerIndex: number;
      tickUpperIndex: number;
      amount: number;
      marketIndex: number;
    }
  ) {
    const {amount = 50000} = params;
    const marketIndex = 9;
    let {tickLowerIndex, tickUpperIndex} = params;
    const perpMarket: PublicKey = getPerpMarketPda(marketIndex);
    const quoteAssetVault: PublicKey = getQuoteAssetVaultPda(marketIndex);
    const baseAssetVault: PublicKey = getBaseAssetVaultPda(marketIndex);
    const tokenVaultA: PublicKey = getTokenVaultAPda(marketIndex);
    const tokenVaultB: PublicKey = getTokenVaultBPda(marketIndex);
    const tokenMintA: PublicKey = getTokenMintAPda(marketIndex);
    const tokenMintB: PublicKey = getTokenMintBPda(marketIndex);

    const userPda: PublicKey = await am.getUserPda(program, authority, false, false);
    const perp = await program.account.perpMarket.fetch(perpMarket);
    const tickCurrentIndex = perp?.pool?.tickCurrentIndex ?? 0;
    if (!tickUpperIndex || !tickLowerIndex) {
      tickLowerIndex =
        Math.floor((tickCurrentIndex - tickSpacing * 800) / tickSpacing) * tickSpacing;
      tickUpperIndex =
        Math.floor((tickCurrentIndex + tickSpacing * 800) / tickSpacing) * tickSpacing;
    } else {
      tickLowerIndex = Math.floor(tickLowerIndex / tickSpacing) * tickSpacing;
      tickUpperIndex = Math.floor(tickUpperIndex / tickSpacing) * tickSpacing;
    }

    console.log('tickLowerIndex - tickUpperIndex', tickLowerIndex, tickUpperIndex);

    const positionMintSeeds = [
      Buffer.from('position_mint'),
      Buffer.alloc(4),
      Buffer.alloc(4),
      perpMarket.toBuffer(),
    ];
    positionMintSeeds[1].writeInt32LE(tickLowerIndex);
    positionMintSeeds[2].writeInt32LE(tickUpperIndex);
    const positionMint = PublicKey.findProgramAddressSync(positionMintSeeds, PROGRAM_ID)[0];

    const positionTokenAccountSeeds = [
      Buffer.from('position_token_account'),
      Buffer.alloc(4),
      Buffer.alloc(4),
      perpMarket.toBuffer(),
    ];
    positionTokenAccountSeeds[1].writeInt32LE(tickLowerIndex);
    positionTokenAccountSeeds[2].writeInt32LE(tickUpperIndex);
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

    const ta = await getAccount(program.provider.connection, quoteAssetVault);
    const tb = await getAccount(program.provider.connection, baseAssetVault);
    const pm = await program.account.perpMarket.fetch(perpMarket);

    console.log('****************');
    console.log('User Pda : ', userPda);
    console.log(
      'Perp Market Pda : ',
      perpMarket.toBase58(),
      'Gz4jtNCUxbXhWqQhG84quqqyP9XtFWMApBZXJ5Hfa1QB'
    );
    console.log('Quote asset vault : ', ta?.mint?.toBase58(), tokenMintA.toBase58());
    console.log('Base  asset vault : ', tb?.mint?.toBase58(), tokenMintB.toBase58());
    console.log('token vault A : ', perp.pool.tokenVaultA?.toBase58(), tokenVaultA.toBase58());
    console.log('token vault B : ', perp.pool.tokenVaultB?.toBase58(), tokenVaultB.toBase58());
    console.log('Market Index : ', pm.marketIndex, marketIndex);
    console.log(`tickLowerIndex[${tickLowerIndex}] - tickUpperIndex[${tickUpperIndex}]`);
    console.log('Amount : ', amount);
    console.log('****************');

    return await program.methods
      .addPerpLpShares(baseAmount, marketIndex, tickLowerIndex, tickUpperIndex)
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
      .rpc({commitment: 'confirmed'});
  }
}
