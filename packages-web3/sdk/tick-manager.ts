import {PROGRAM_ID} from '@/sdk/account-manager';
import {TICK_ARRAY_SIZE} from '@/sdk/const';
import type {RatexContracts} from '@/types/ratex_contracts';
import {PriceMath} from '@/utils/price-math';
import * as anchor from '@coral-xyz/anchor';
import {BN, Program} from '@coral-xyz/anchor';
import {PublicKey, SystemProgram, TransactionInstruction} from '@solana/web3.js';
import {Buffer} from 'buffer';
import Decimal from 'decimal.js';

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
        if (tickArrayAccount) {
          tickArrays.push(tickArray);
        } else {
          tickArrays.push(tickArrays[tickArrays.length - 1]);
        }
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
    authority: PublicKey,
    perpMarket: PublicKey,
    startTickIndex: number,
    endTickIndex: number,
    isRemove: boolean = false
  ) {
    startTickIndex = Math.floor(startTickIndex / TICK_ARRAY_SIZE) * TICK_ARRAY_SIZE;
    endTickIndex = Math.floor(endTickIndex / TICK_ARRAY_SIZE) * TICK_ARRAY_SIZE;
    let tickArrays: PublicKey[] = [];
    const instructions = [];
    const tickArrayAccounts = [];
    const tas = [];
    for (let i = startTickIndex; i <= endTickIndex; i += TICK_ARRAY_SIZE) {
      const {tickArray, tickIndex} = this.genTickArray(perpMarket, i);
      tickArrayAccounts.push(tickArray);
      tas.push([tickArray, tickIndex, i]);
    }
    const accounts = await program.provider.connection.getMultipleAccountsInfo(tickArrayAccounts);
    for (let i = 0; i < tickArrayAccounts.length; i++) {
      const account = accounts[i];
      const [tickArray, tickIndex, startTickIndex] = tas[i];
      if (!account && !isRemove) {
        const instruction = await this.initializeTickArrayTransaction(
          program,
          authority,
          perpMarket,
          tickArray as PublicKey,
          tickIndex as number
        );
        instructions.push(instruction);
      }
      if (isRemove) {
        if (tickArrays.length > 0 && !account) {
          tickArrays.push(tickArrays[tickArrays.length - 1]);
        } else {
          tickArrays.push(tickArray as PublicKey);
        }
      } else {
        tickArrays.push(tickArray as PublicKey);
      }
    }
    return [tickArrays, instructions];
  }

  async initializeTickArrayTransaction(
    program: Program<RatexContracts>,
    authority: PublicKey,
    perpMarket: PublicKey,
    tickArray: PublicKey,
    tickIndex: number
  ): Promise<TransactionInstruction | null> {
    return await program.methods
      .initializeTickArray(tickIndex)
      .accounts({
        perpMarket,
        tickArray,
        funder: authority,
        systemProgram: SystemProgram.programId,
      })
      .instruction();
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
