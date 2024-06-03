import {PerpMarketMap, getPerpMarketPda} from '@/sdk/utils';
import type {RateXOrder, RateXPosition} from '@/types/rate-x-client';
import type {RatexContracts} from '@/types/ratex_contracts';
import {PoolUtil} from '@/utils/pool-utils';
import {PriceMath} from '@/utils/price-math';
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

export const PROGRAM_ID = new PublicKey('AZzXAH1LaeHcJ3R8nZjvLiEPz77nnkRyFHSJ7yA9Qhrd');

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

  async initializeUserTransaction(
    program: Program<RatexContracts>,
    authority: PublicKey,
    isIsolated: boolean = true,
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
      .initializeUser(subAccountId, isIsolated)
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

  async initializeLpInstruction(
    program: Program<RatexContracts>,
    authority: PublicKey,
    subAccountId: number
  ): Promise<[PublicKey, TransactionInstruction | null]> {
    const userStatPda = this.createUserStatPda(authority);
    const userPda = this.createLpUserPda(authority, subAccountId);
    if (!!(await this.getUserAccount(program, userPda))) {
      return [userPda, null];
    }
    const instruction = await program.methods
      .initializeLp(subAccountId)
      .accounts({
        lp: userPda,
        state: this.statePda,
        userStats: userStatPda,
        authority,
        payer: authority,
        systemProgram: SystemProgram.programId,
        rent: SYSVAR_RENT_PUBKEY,
      })
      .instruction();
    return [userPda, instruction];
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
      const pdaMap: any = {};
      for (let i = 0; i < count; i++) {
        const userPda = this.createUserPda(authority, i);
        allUserPda.push(userPda);
        // try {
        //   const user = await program.account.user.fetch(userPda);
        //   console.log('*********');
        //   console.log(i, userPda.toBase58(), user);
        //   console.log('*********');
        // } catch (e) {}

        pdaMap[i] = {
          userPda,
          userPdaAddress: userPda.toBase58(),
        };
      }
      const accounts = await program.provider.connection.getMultipleAccountsInfo(allUserPda);
      return accounts
        .filter((u) => !!u)
        .map((u: any) => {
          const user = program.coder.accounts.decode('User', u.data);
          return {
            ...user,
            orders: user.orders
              ?.filter((o: any) => !o.baseAssetAmount.eq(new BN(0)))
              .filter((o: any) => o.expireTs.gt(Date.now() / 1000)),
            ...pdaMap[user.subAccountId],
          };
        });
    } catch (e) {
      console.error(e);
      return [];
    }
  }

  async findTraderUser(
    program: Program<RatexContracts>,
    authority: PublicKey,
    isIsolated: boolean,
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
      user = accounts?.find((u: any) => u.isIsolated === isIsolated);
    } else {
      user = accounts?.find((u) => {
        if (u.isIsolated !== isIsolated) {
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

  async getAllPosition(program: Program<RatexContracts>, authority: PublicKey) {
    const zero = new BN(0);
    const accounts = await this.getSubAccounts(program, authority);
    return accounts.reduce((ps: RateXPosition[], u: any) => {
      const marginBalance = u?.marginPositions
        ?.filter((mp: any) => mp.marketIndex === 0 && !mp.balance.eq(zero))
        ?.reduce((total: Big, mp: any) => {
          return total.add(mp.balance.toString());
        }, new Big(0))
        .div(1_000_000_000)
        .toString();
      const positions = u?.perpPositions
        .filter((p: any) => !p.baseAssetAmount.eq(zero))
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
                return !!(
                  o.marketIndex === marketIndex &&
                  baseAssetAmount.gt(zero) &&
                  o.baseAssetAmount.lt(zero)
                );
              })?.length > 0,
          };
        });
      return [...ps, ...positions];
    }, []);
  }

  async getCrossPosition(program: Program<RatexContracts>, authority: PublicKey) {
    const zero = new BN(0);
    const accounts = await this.getSubAccounts(program, authority);
    return accounts
      .filter((acc) => !acc.isIsolated)
      .reduce((allPositions: RateXPosition[], acc) => {
        const margin = acc?.marginPositions
          ?.filter((mp: any) => mp.marketIndex === 0 && !mp.balance.eq(zero))
          ?.reduce((total: Big, mp: any) => {
            return total.add(mp.balance.toString());
          }, new Big(0))
          .div(1_000_000_000)
          .toString();
        const positions = acc?.perpPositions
          .filter((p: any) => !p.baseAssetAmount.eq(zero))
          ?.map((p: any) => {
            const {baseAssetAmount, quoteAssetAmount, marketIndex} = p;
            return {
              margin,
              marketIndex,
              userPda: acc.userPdaAddress,
              baseAssetAmount: Big(baseAssetAmount.toNumber()).div(1_000_000_000).toNumber(),
              quoteAssetAmount: Big(quoteAssetAmount.toNumber()).div(1_000_000_000).toNumber(),
            };
          });
        return [...allPositions, ...positions];
      }, []);
  }

  async getAllOrders(program: Program<RatexContracts>, authority: PublicKey) {
    const accounts = await this.getSubAccounts(program, authority);
    return accounts.reduce((ps: RateXPosition[], u: any) => {
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

  async getAccountInfo(program: Program<RatexContracts>, userPda: PublicKey) {
    try {
      const user = await program.account.user.fetch(userPda);
      const zreo = new BN(0);
      const now = new BN(Date.now() / 1000);
      return {
        ...user,
        orders: user?.orders?.filter((o: any) => !o.baseAssetAmount.eq(zreo) && o.expireTs.gt(now)),
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

  async getLpAccounts(
    program: Program<RatexContracts>,
    authority: PublicKey,
    subAccountCount?: number
  ) {
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
    const marketIndexMap: any = Object.keys(PerpMarketMap).reduce((obj, index) => {
      return {...obj, [PerpMarketMap[index as any]]: Number(index)};
    }, {});
    const allPda: PublicKey[] = [];
    for (let i = 0; i < count; i++) {
      const userPda = this.createLpUserPda(authority, i);
      allPda.push(userPda);
    }
    const accounts = await program.provider.connection.getMultipleAccountsInfo(allPda);
    const users = [];
    for (let i = 0; i < count; i++) {
      const account: any = accounts[i];
      const userPda = allPda[i];
      if (!!account && !!account?.data) {
        try {
          const user = program.coder.accounts.decode('Lp', account.data);
          const perp: string = user?.ammPosition?.whirlpool?.toBase58();
          users.push({...user, userPda, marketIndex: marketIndexMap[perp]});
        } catch (e) {
          console.error(e);
        }
      }
    }
    console.log('LP Accounts : ', users, accounts);
    return users;
  }

  async findLpUser(
    program: Program<RatexContracts>,
    authority: PublicKey,
    params: {upperRate: number; lowerRate: number; marketIndex: number}
  ) {
    const accounts = await this.getLpAccounts(program, authority);
    return accounts.find((u: any) => {
      const {upperRate, lowerRate} = u.ammPosition || {};
      return (
        params.marketIndex === u.marketIndex &&
        Big(params.upperRate).times(1_000_000_000).eq(Big(upperRate.toString())) &&
        Big(params.lowerRate).times(1_000_000_000).eq(Big(lowerRate.toString()))
      );
    });
  }

  async getLpPositions(
    program: Program<RatexContracts>,
    authority: PublicKey,
    marketIndex: number
  ) {
    const perpMarketPda = getPerpMarketPda(marketIndex);
    const pool = await program.account.perpMarket.fetch(perpMarketPda, 'processed');
    const perp = getPerpMarketPda(marketIndex).toBase58();
    const sqrtPrice = PriceMath.sqrtPriceX64ToPrice(pool.pool.sqrtPrice, 9, 9);
    const accounts = await this.getLpAccounts(program, authority);
    return accounts
      .map((a) => {
        const lpAc = Object.keys(a).reduce(
          (user: Record<string, any>, k: string) => {
            if (k === 'ammPosition') {
              const amm = user[k];
              const lowerSqrtPrice = PriceMath.tickIndexToSqrtPriceX64(amm.tickLowerIndex);
              const upperSqrtPrice = PriceMath.tickIndexToSqrtPriceX64(amm.tickUpperIndex);
              const {tokenA, tokenB} = PoolUtil.getTokenAmountsFromLiquidity(
                amm.liquidity,
                pool.pool.sqrtPrice,
                lowerSqrtPrice,
                upperSqrtPrice,
                false
              );
              user[k] = Object.keys(a[k]).reduce((pos, k1) => {
                if (k1 === 'rewardInfos') {
                  pos[k1] = pos[k1].map((ri: any) => {
                    return Object.keys(ri).reduce((ps, k2) => {
                      ps[k2] = this.formatAccountInfo(ps, k2);
                      return ps;
                    }, ri);
                  });
                  return pos;
                }

                pos[k1] = this.formatAccountInfo(pos, k1);
                return pos;
              }, a[k]);
              user[k].price = sqrtPrice.toString();
              user[k].tokenA = Big(tokenA.toString()).div(1_000_000_000).toString();
              user[k].tokenB = Big(tokenB.toString()).div(1_000_000_000).toString();
            }
            user[k] = this.formatAccountInfo(a, k);
            return user;
          },
          {...a, marketIndex}
        );
        lpAc.baseAssetAmount = Big(lpAc.reserveBaseAmount)
          .plus(lpAc.ammPosition.tokenA ?? 0)
          .toString();
        lpAc.quoteAssetAmount = Big(lpAc.reserveQuoteAmount)
          .plus(lpAc.ammPosition.tokenB ?? 0)
          .toString();
        lpAc.total = Big(lpAc.baseAssetAmount)
          .times(sqrtPrice.toString())
          .add(lpAc.quoteAssetAmount)
          .toString();
        lpAc.earnFee = Big(lpAc.ammPosition.feeOwedA || 0)
          .add(lpAc.ammPosition.feeOwedB || 0)
          .toString();
        return lpAc;
      })
      .filter((u) => u.ammPosition?.whirlpool === perp);
  }

  formatAccountInfo(obj: any, key: string) {
    if (obj[key] instanceof BN) {
      return Big(obj[key].toString()).div(1_000_000_000).toNumber();
    }
    if (obj[key] instanceof PublicKey) {
      return obj[key].toBase58();
    }
    return obj[key];
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

  createLpUserPda(authority: PublicKey, subAccountId: number = 0) {
    return PublicKey.findProgramAddressSync(
      [Buffer.from('lp'), authority.toBuffer(), new BN(subAccountId).toArrayLike(Buffer, 'le', 2)],
      PROGRAM_ID
    )[0];
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
  createQuoteAssetVaultPda(marketIndex: number) {
    return PublicKey.findProgramAddressSync(
      [Buffer.from('quote_asset_vault'), new BN(marketIndex).toArrayLike(Buffer, 'le', 2)],
      PROGRAM_ID
    )[0];
  }
  createBaseAssetVaultPda(marketIndex: number) {
    return PublicKey.findProgramAddressSync(
      [Buffer.from('base_asset_vault'), new BN(marketIndex).toArrayLike(Buffer, 'le', 2)],
      PROGRAM_ID
    )[0];
  }
}
