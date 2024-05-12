import type {RateXOrder, RateXPosition} from '@/types/rate-x-client';
import type {RatexContracts} from '@/types/ratex_contracts.ts';
import {BN, Program} from '@coral-xyz/anchor';
import {
  AccountInfo,
  PublicKey,
  SYSVAR_RENT_PUBKEY,
  SystemProgram,
  TransactionInstruction,
} from '@solana/web3.js';
import {Big} from 'big.js';
import {Buffer} from 'buffer';

export const PROGRAM_ID = new PublicKey('5PCKnTPG5opy6kWGfL5ZDHiDVdqQ4QiMjysBqwjEPFWY');

export const TOKEN_FAUCET = new PublicKey('HA655QyTrZTMKnqUHXCoW6fW2zNuRcasa9knHBvw6hUi');

export class AccountManager {
  statePda: PublicKey;
  signerPda: PublicKey;
  keeperPda: PublicKey;

  constructor() {
    this.statePda = this.createStatePda();
    this.signerPda = this.createDriftSigner();
    this.keeperPda = this.createKeeperPda();
  }

  async initializeUserStats(program: Program<RatexContracts>, authority: PublicKey) {
    const userStatPda = this.createUserStatPda(authority);
    if (!!(await this.getUserAccount(program, userStatPda))) {
      return userStatPda;
    }
    console.log('****************');
    console.log('Initialize User Stats Pda : ', userStatPda.toBase58());
    const tx = await program.methods
      .initializeUserStats()
      .accounts({
        userStats: userStatPda,
        state: this.statePda,
        authority: authority,
        payer: authority,
        rent: SYSVAR_RENT_PUBKEY,
        systemProgram: SystemProgram.programId,
      })
      .rpc()
      .catch((e) => console.error(e));
    console.log('Initialize User Stats Tx : ', tx);
    console.log('****************');
    return userStatPda;
  }

  async initializeUserStatsTransaction(
    program: Program<RatexContracts>,
    authority: PublicKey
  ): Promise<[PublicKey, TransactionInstruction | null, AccountInfo<any> | null]> {
    const userStatPda = this.createUserStatPda(authority);
    const statInfo = await this.getUserAccount(program, userStatPda);
    if (!!statInfo) {
      return [userStatPda, null, statInfo];
    }
    console.log('****************');
    console.log('Initialize User Stats Pda : ', userStatPda.toBase58());
    const transaction = await program.methods
      .initializeUserStats()
      .accounts({
        userStats: userStatPda,
        state: this.statePda,
        authority: authority,
        payer: authority,
        rent: SYSVAR_RENT_PUBKEY,
        systemProgram: SystemProgram.programId,
      })
      .instruction();
    return [userStatPda, transaction, null];
  }

  async initializeUser(
    program: Program<RatexContracts>,
    authority: PublicKey,
    isIsolated: boolean = true,
    isTrader: boolean = true,
    subAccountId: number = 0
  ) {
    const userStatPda = await this.initializeUserStats(program, authority);
    const userPda = this.createUserPda(authority, subAccountId);
    if (!!(await this.getUserAccount(program, userPda))) {
      return userPda;
    }
    console.log('****************');
    console.log('Initialize User Pda : ', userPda.toBase58());
    const tx = await program.methods
      .initializeUser(subAccountId, isIsolated, isTrader)
      .accounts({
        user: userPda,
        state: this.statePda,
        userStats: userStatPda,
        authority: authority,
        payer: authority,
        rent: SYSVAR_RENT_PUBKEY,
        systemProgram: SystemProgram.programId,
      })
      .rpc()
      .catch((e) => console.error(e));
    console.log('Initialize User Tx : ', tx);
    console.log('****************');

    return userPda;
  }
  async initializeUserTransaction(
    program: Program<RatexContracts>,
    authority: PublicKey,
    isIsolated: boolean = true,
    isTrader: boolean = true,
    subAccountId: number = 0
  ): Promise<[PublicKey, TransactionInstruction | null]> {
    const userStatPda = this.createUserStatPda(authority);
    const userPda = this.createUserPda(authority, subAccountId);
    if (!!(await this.getUserAccount(program, userPda))) {
      return [userPda, null];
    }
    console.log('****************');
    console.log('Initialize User Pda : ', userPda.toBase58());
    const transaction = await program.methods
      .initializeUser(subAccountId, isIsolated, isTrader)
      .accounts({
        user: userPda,
        state: this.statePda,
        userStats: userStatPda,
        authority: authority,
        payer: authority,
        rent: SYSVAR_RENT_PUBKEY,
        systemProgram: SystemProgram.programId,
      })
      .instruction();
    return [userPda, transaction];
  }

  async initializeUserOrders(
    program: Program<RatexContracts>,
    authority: PublicKey,
    userPda: PublicKey
  ) {
    const user = await program.account.user.fetch(userPda);
    const userOrdersPda = this.createUserOrdersPda(authority, user.subAccountId);
    if (!!(await this.getUserAccount(program, userOrdersPda))) {
      return userOrdersPda;
    }
    console.log('****************');
    console.log('Initialize User Orders : ', userPda.toBase58(), userOrdersPda.toBase58());
    const tx = await program.methods
      .initializeUserOrders(user.subAccountId)
      .accounts({
        user: userPda,
        userOrders: userOrdersPda,
        state: this.statePda,
        authority,
        payer: authority,
        systemProgram: SystemProgram.programId,
        rent: SYSVAR_RENT_PUBKEY,
      })
      .rpc();
    console.log('Initialize User Orders Pda : ', tx);
    console.log('****************');
    return userOrdersPda;
  }

  async initializeUserOrdersTransaction(
    program: Program<RatexContracts>,
    authority: PublicKey,
    userPda: PublicKey,
    subAccountId: number
  ): Promise<[PublicKey, TransactionInstruction | null]> {
    const userOrdersPda = this.createUserOrdersPda(authority, subAccountId);
    if (!!(await this.getUserAccount(program, userOrdersPda))) {
      return [userOrdersPda, null];
    }
    console.log('****************');
    console.log('Initialize User Orders : ', userPda.toBase58(), userOrdersPda.toBase58());
    const transaction = await program.methods
      .initializeUserOrders(subAccountId)
      .accounts({
        user: userPda,
        userOrders: userOrdersPda,
        state: this.statePda,
        authority,
        payer: authority,
        systemProgram: SystemProgram.programId,
        rent: SYSVAR_RENT_PUBKEY,
      })
      .instruction();
    return [userOrdersPda, transaction];
  }

  async getSubAccounts(
    program: Program<RatexContracts>,
    authority: PublicKey,
    subAccountCount?: number
  ) {
    try {
      let count = subAccountCount ?? 0;
      if (subAccountCount === undefined) {
        const userStatPda = this.createUserStatPda(authority);
        const statInfo = await program.provider.connection.getAccountInfo(userStatPda);
        if (!statInfo) {
          return [];
        }
        const stat = program.coder.accounts.decode('UserStats', statInfo.data);
        count = stat.numberOfSubAccountsCreated ?? 0;
      }
      const allUserPda = [];
      const allUserOrdersPda = [];
      const pdaMap: any = {};
      for (let i = 0; i < count; i++) {
        const userPda = this.createUserPda(authority, i);
        const userOrdersPda = this.createUserOrdersPda(authority, i);
        allUserPda.push(userPda);
        allUserOrdersPda.push(userOrdersPda);
        pdaMap[i] = {
          userPda,
          userOrdersPda,
          userPdaAddress: userPda.toBase58(),
          userOrdersPdaAddress: userOrdersPda.toBase58(),
        };
      }
      const accounts = await program.provider.connection.getMultipleAccountsInfo([
        ...allUserPda,
        ...allUserOrdersPda,
      ]);
      const userAccounts = accounts.slice(0, count);
      const userOrderAccounts = accounts.slice(count, count + count);
      const userOrders: any = userOrderAccounts
        .filter((u) => !!u)
        .reduce((m, u: any) => {
          const userOrder = program.coder.accounts.decode('UserOrders', u.data);
          return {
            ...m,
            [userOrder.subAccountId]: userOrder.orders
              ?.filter((o: any) => !o.baseAssetAmount.eq(new BN(0)))
              .filter((o: any) => o.expireTs.gt(Date.now())),
          };
        }, {});
      return userAccounts
        .filter((u) => !!u)
        .map((u: any) => {
          const user = program.coder.accounts.decode('User', u.data);
          return {
            ...user,
            ...pdaMap[user.subAccountId],
            orders: userOrders?.[user.subAccountId] ?? [],
            userOrdersPdaExist: !!userOrders?.[user.subAccountId],
          };
        });
    } catch (e) {
      console.error(e);
      return [];
    }
  }

  async findUser(
    program: Program<RatexContracts>,
    authority: PublicKey,
    isIsolated: boolean,
    isTrader: boolean,
    statInfo: AccountInfo<any> | null
  ) {
    let subAccountId = 0;
    if (statInfo) {
      const stat = program.coder.accounts.decode('UserStats', statInfo.data);
      subAccountId = stat.numberOfSubAccountsCreated ?? 0;
    }
    const accounts = await this.getSubAccounts(program, authority, subAccountId);
    const zero = new BN(0);
    let user;
    if (!isIsolated) {
      user = accounts?.find((u: any) => u.isIsolated === isIsolated && u.isTrader === isTrader);
    } else {
      user = accounts?.find((u) => {
        if (!u.isTrader || u.isIsolated !== isIsolated) {
          return false;
        }
        return (
          !(u?.perpPositions || []).some(
            (p: RateXPosition) => !(p.baseAssetAmount as BN).eq(zero)
          ) && !(u?.orders || []).some((o: RateXOrder) => !(o.baseAssetAmount as BN).eq(zero))
        );
      });
    }
    if (user) {
      return user;
    }
    return null;
  }

  async getUserPda(
    program: Program<RatexContracts>,
    authority: PublicKey,
    isIsolated: boolean,
    isTrader: boolean
  ) {
    const accounts = await this.getSubAccounts(program, authority);
    let user;
    if (!isIsolated) {
      user = accounts?.find((u: any) => u.isIsolated === isIsolated && u.isTrader === isTrader);
    } else {
      user = accounts?.find((u) => {
        if (!u.isTrader || u.isIsolated !== isIsolated) {
          return false;
        }
        return (
          !(u?.perpPositions || []).some(
            (p: RateXPosition) => !(p.baseAssetAmount as BN).eq(new BN(0))
          ) && !(u?.orders || []).some((o: RateXOrder) => !(o.baseAssetAmount as BN).eq(new BN(0)))
        );
      });
    }

    if (user) {
      return user.userPda;
    }
    const userStatPda = await this.initializeUserStats(program, authority);
    const stat = await program.account.userStats.fetch(userStatPda);
    const count = stat.numberOfSubAccountsCreated ?? 0;
    return await this.initializeUser(program, authority, isIsolated, isTrader, count);
  }

  async getAllPosition(program: Program<RatexContracts>, authority: PublicKey) {
    const zero = new BN(0);
    const accounts = await this.getSubAccounts(program, authority);
    return accounts
      .filter((u) => !!u.isTrader)
      .reduce((ps: RateXPosition[], u: any) => {
        const marginBalance = u?.marginPositions
          ?.filter((mp: any) => mp.marketIndex === 1 && !mp.balance.eq(zero))
          ?.reduce((total: Big, mp: any) => {
            return total.add(mp.balance.toString());
          }, new Big(0))
          .div(1_000_000_000)
          .toString();
        const positions = u?.perpPositions
          ?.map((p: any) => {
            const {baseAssetAmount, lastRate, quoteAssetAmount, marketIndex} = p;
            return {
              userPda: u.userPdaAddress,
              userOrdersPda: u.userOrdersPdaAddress,
              isIsolated: u.isIsolated,
              marginType: u.isIsolated ? 'ISOLATED' : 'CROSS',
              direction: baseAssetAmount.gt(zero) ? 'LONG' : 'SHORT',
              marketIndex,
              margin: marginBalance,
              lastRate: Big(lastRate.toString()).div(1_000_000_000).toString(),
              baseAssetAmount: Big(baseAssetAmount.toNumber()).div(1_000_000_000).toNumber(),
              quoteAssetAmount: Big(quoteAssetAmount.toNumber()).div(1_000_000_000).toNumber(),
              enableClose:
                u.orders?.filter((o: any) => {
                  if (
                    o.marketIndex === marketIndex &&
                    baseAssetAmount.gt(zero) &&
                    o.baseAssetAmount.lt(zero)
                  ) {
                    return true;
                  }
                  return false;
                })?.length > 0,
            };
          })
          .filter((p: any) => p.baseAssetAmount != 0);
        return [...ps, ...positions];
      }, []);
  }

  async getAllOrders(program: Program<RatexContracts>, authority: PublicKey) {
    const accounts = await this.getSubAccounts(program, authority);
    return accounts
      .filter((u) => !!u.isTrader)
      .reduce((ps: RateXPosition[], u: any) => {
        const positions = u?.orders?.map((p: any) => {
          const {
            baseAssetAmount,
            baseAssetAmountFilled,
            quoteAssetAmountFilled,
            marketIndex,
            orderId,
            status,
            priceLimit,
          } = p;
          return {
            userPda: u.userPdaAddress,
            userOrdersPda: u.userOrdersPdaAddress,
            isIsolated: u.isIsolated,
            baseAssetAmount: Big(baseAssetAmount.toNumber()).div(1_000_000_000).toNumber(),
            baseAssetAmountFilled: Big(baseAssetAmountFilled.toNumber())
              .div(1_000_000_000)
              .toNumber(),
            quoteAssetAmountFilled: Big(quoteAssetAmountFilled.toNumber())
              .div(1_000_000_000)
              .toNumber(),
            marketIndex,
            orderId,
            status,
            priceLimit,
          };
        });
        return [...ps, ...positions];
      }, []);
  }

  async getAccountInfo(
    program: Program<RatexContracts>,
    userPda: PublicKey,
    userOrdersPda: PublicKey
  ) {
    try {
      const user = await program.account.user.fetch(userPda);
      const userOrders = await program.account.userOrders.fetch(userOrdersPda);
      const zreo = new BN(0);
      const now = new BN(Date.now() / 1000);
      return {
        ...user,
        orders: userOrders?.orders?.filter(
          (o: any) => !o.baseAssetAmount.eq(zreo) && o.expireTs.gt(now)
        ),
      };
    } catch (e) {
      console.error(e);
      return null;
    }
  }

  async getUserAccount(program: Program<RatexContracts>, pda: PublicKey) {
    try {
      return await program.provider.connection.getAccountInfo(pda);
    } catch (e) {
      console.error(e);
      return null;
    }
  }

  async deleteUserOrders(
    program: Program<RatexContracts>,
    authority: PublicKey,
    userPda: PublicKey,
    userOrdersPda: PublicKey
  ): Promise<TransactionInstruction | null> {
    try {
      console.log('Delete User Orders : ', userPda.toBase58(), userOrdersPda.toBase58());
      return await program.methods
        .deleteUserOrders()
        .accounts({
          user: userPda,
          userOrders: userOrdersPda,
          state: this.statePda,
          authority,
        })
        .instruction();
    } catch (e) {
      console.error(e);
      return null;
    }
  }

  async deleteUser(
    program: Program<RatexContracts>,
    authority: PublicKey,
    userPda: PublicKey
  ): Promise<TransactionInstruction | null> {
    try {
      console.log('Delete User Orders : ', userPda.toBase58());
      return await program.methods
        .deleteUser()
        .accounts({
          user: userPda,
          userStats: this.createUserStatPda(authority),
          state: this.statePda,
          authority,
        })
        .instruction();
    } catch (e) {
      console.error(e);
      return null;
    }
  }

  createStatePda() {
    return PublicKey.findProgramAddressSync([Buffer.from('drift_state')], PROGRAM_ID)[0];
  }

  createDriftSigner() {
    return PublicKey.findProgramAddressSync([Buffer.from('drift_signer')], PROGRAM_ID)[0];
  }

  createKeeperPda() {
    return PublicKey.findProgramAddressSync([Buffer.from('drift_keeper')], PROGRAM_ID)[0];
  }

  createUserPda(authority: PublicKey, subAccountId: number = 0) {
    return PublicKey.findProgramAddressSync(
      [
        Buffer.from('user'),
        authority?.toBuffer(),
        new BN(subAccountId).toArrayLike(Buffer, 'le', 2),
      ],
      PROGRAM_ID
    )[0];
  }

  createUserStatPda(authority: PublicKey) {
    return PublicKey.findProgramAddressSync(
      [Buffer.from('user_stats'), authority?.toBuffer()],
      PROGRAM_ID
    )[0];
  }
  createUserOrdersPda(authority: PublicKey, subAccountId: number) {
    return PublicKey.findProgramAddressSync(
      [
        Buffer.from('user_orders'),
        authority.toBuffer(),
        new BN(subAccountId).toArrayLike(Buffer, 'le', 2),
      ],
      PROGRAM_ID
    )[0];
  }
}
