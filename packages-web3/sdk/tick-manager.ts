import type {RatexContracts} from '@/types/ratex_contracts.ts';
import * as anchor from '@coral-xyz/anchor';
import {BN, Program, Wallet} from '@coral-xyz/anchor';
import {PublicKey, SystemProgram, Transaction, TransactionInstruction} from '@solana/web3.js';
import {Buffer} from 'buffer';
import Decimal from 'decimal.js';
import {PriceMath} from '../utils/price-math.ts';
import {PROGRAM_ID} from './account-manager.ts';
import {TICK_ARRAY_SIZE} from './const.ts';

export class TickManager {
  priceLimit: BN;
  constructor() {
    this.priceLimit = PriceMath.priceToSqrtPriceX64(new Decimal(0.9), 9, 9);
  }

  getStartTickIndex(tickIndex: number) {
    return Math.floor(tickIndex / TICK_ARRAY_SIZE) * TICK_ARRAY_SIZE;
  }

  async getFillOrderTickArrays(
    program: Program<RatexContracts>,
    authority: PublicKey,
    perpMarket: PublicKey,
    currTickIndex: number,
    priceLimit: BN,
    aTob: any
  ) {
    let tickIndexLimit = PriceMath.sqrtPriceX64ToTickIndex(priceLimit);
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
        throw Error(`out of bound 22 ${tickBound} ${tickIndexLimit} ${startTickIndex}`);
      }
    }

    const tickArrays: PublicKey[] = [];
    for (let i = 0; i < 10; ++i) {
      const [tickArray] = anchor.web3.PublicKey.findProgramAddressSync(
        [Buffer.from('tick_array'), perpMarket.toBuffer(), Buffer.from(startTickIndex.toString())],
        PROGRAM_ID
      );
      try {
        const tickArrayAccount = await program.provider.connection.getAccountInfo(tickArray);
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

  async initializeTickArrays(
    program: Program<RatexContracts>,
    authority: PublicKey,
    perpMarket: PublicKey,
    startTickIndex: number,
    endTickIndex: number
  ) {
    startTickIndex = Math.floor(startTickIndex / TICK_ARRAY_SIZE) * TICK_ARRAY_SIZE;
    endTickIndex = Math.floor(endTickIndex / TICK_ARRAY_SIZE) * TICK_ARRAY_SIZE;
    let tickArrays = [];
    for (let i = startTickIndex; i <= endTickIndex; i += TICK_ARRAY_SIZE) {
      const ta = await this.initializeTickArray(program, authority, perpMarket, i);
      tickArrays.push(ta);
    }
    return tickArrays;
  }

  async initializeTickArraysV2(
    program: Program<RatexContracts>,
    wallet: Wallet,
    authority: PublicKey,
    perpMarket: PublicKey,
    startTickIndex: number,
    endTickIndex: number
  ) {
    startTickIndex = Math.floor(startTickIndex / TICK_ARRAY_SIZE) * TICK_ARRAY_SIZE;
    endTickIndex = Math.floor(endTickIndex / TICK_ARRAY_SIZE) * TICK_ARRAY_SIZE;
    let tickArrays = [];
    const combinedTransaction = new Transaction();
    for (let i = startTickIndex; i <= endTickIndex; i += TICK_ARRAY_SIZE) {
      const [ta, transaction] = await this.initializeTickArrayTransaction(
        program,
        authority,
        perpMarket,
        i
      );
      tickArrays.push(ta);
      if (!!transaction) {
        combinedTransaction.add(transaction);
      }
    }
    combinedTransaction.recentBlockhash = (
      await program.provider.connection.getRecentBlockhash()
    ).blockhash;
    combinedTransaction.feePayer = authority;
    try {
      const signedTransaction = await wallet.signTransaction(combinedTransaction);
      const signature = await program.provider.connection.sendRawTransaction(
        signedTransaction.serialize(),
        {
          skipPreflight: true,
        }
      );
      await program.provider.connection.confirmTransaction(signature, 'confirmed');
      console.log('Combined Transaction successful!', signature);
      return tickArrays;
    } catch (e) {
      return [];
    }
  }

  async initializeTickArrayTransaction(
    program: Program<RatexContracts>,
    authority: PublicKey,
    perpMarket: PublicKey,
    startTickIndex: number
  ): Promise<[PublicKey, TransactionInstruction | null]> {
    const {tickArray, tickIndex} = this.genTickArray(perpMarket, startTickIndex);

    const accountInfo = await program.provider.connection.getAccountInfo(tickArray);
    if (!!accountInfo) {
      return [tickArray, null];
    }
    const transaction = await program.methods
      .initializeTickArray(tickIndex)
      .accounts({
        perpMarket,
        tickArray,
        funder: authority,
        systemProgram: SystemProgram.programId,
      })
      .instruction();
    return [tickArray, transaction];
  }

  genTickArray(perpMarket: PublicKey, startTickIndex: number) {
    startTickIndex = Math.floor(startTickIndex / TICK_ARRAY_SIZE) * TICK_ARRAY_SIZE;

    const [tickArray] = PublicKey.findProgramAddressSync(
      [Buffer.from('tick_array'), perpMarket.toBuffer(), Buffer.from(startTickIndex.toString())],
      PROGRAM_ID
    );
    console.log('Initialize tick array index : ', startTickIndex, tickArray.toBase58());
    return {tickArray, tickIndex: startTickIndex};
  }

  async initializeTickArray(
    program: Program<RatexContracts>,
    authority: PublicKey,
    perpMarket: PublicKey,
    startTickIndex: number
  ) {
    const {tickArray, tickIndex} = this.genTickArray(perpMarket, startTickIndex);

    const accountInfo = await program.provider.connection.getAccountInfo(tickArray);
    if (!!accountInfo) {
      return tickArray;
    }
    const txid = await program.methods
      .initializeTickArray(tickIndex)
      .accounts({
        perpMarket,
        tickArray,
        funder: authority,
        systemProgram: SystemProgram.programId,
      })
      .rpc({commitment: 'confirmed'});
    console.log('Initialize Tick Array Tx : ', txid);
    return tickArray;
  }
}
