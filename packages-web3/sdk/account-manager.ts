import {PDA} from '@/sdk/PDA';
import {PerpMarketMap} from '@/sdk/utils';
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

export class AccountManager {
  statePda: PublicKey;
  signerPda: PublicKey;
  keeperPda: PublicKey;

  constructor() {
    this.statePda = PDA.createStatePda();
    this.signerPda = PDA.createRateXSigner();
    this.keeperPda = PDA.createKeeperPda();
  }

  async initializeUserStats(program: Program<RatexContracts>, authority: PublicKey) {
    const userStatPda = PDA.createUserStatPda(authority);
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
    const userStatPda = PDA.createUserStatPda(authority);
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
    const userStatPda = PDA.createUserStatPda(authority);
    const userPda = PDA.createUserPda(authority, subAccountId);
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
    const userStatPda = PDA.createUserStatPda(authority);
    const userPda = PDA.createLpUserPda(authority, subAccountId);
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
        const userStatPda = PDA.createUserStatPda(authority);
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
        const userPda = PDA.createUserPda(authority, i);
        allUserPda.push(userPda);
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
      user = accounts?.find(
        (u: any) =>
          u.isIsolated === isIsolated &&
          (u?.yieldPositions || []).some((p: RateXPosition) => (p.baseAssetAmount as BN).eq(zero))
      );
    } else {
      user = accounts?.find((u: Record<string, any>) => {
        if (u.isIsolated !== isIsolated) {
          return false;
        }
        return (
          !(u?.yieldPositions || []).some(
            (p: RateXPosition) => !(p.baseAssetAmount as BN).eq(zero)
          ) &&
          !(u?.orders || []).some((o: RateXOrder) => !(o.baseAssetAmount as BN).eq(zero)) &&
          !(u?.marginPositions || []).some((m: Record<string, any>) => !(m.balance as BN).eq(zero))
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
      const positions = u?.yieldPositions
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
      if (positions.length === 0 && !u.isIsolated && marginBalance > 0) {
        positions.push({
          isIsolated: false,
          marginType: 'CROSS',
          margin: marginBalance,
          userPda: u.userPdaAddress,
          baseAssetAmount: 0,
          quoteAssetAmount: 0,
          enableClose: false,
        });
      }
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
        const positions = acc?.yieldPositions
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
        if (positions.length === 0 && !acc.isIsolated && margin > 0) {
          positions.push({
            isIsolated: false,
            marginType: 'CROSS',
            margin: margin,
            userPda: acc.userPdaAddress,
            baseAssetAmount: 0,
            quoteAssetAmount: 0,
            enableClose: false,
          });
        }
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
          isClose: p.isClose,
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
          userStats: PDA.createUserStatPda(authority),
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
      const userStatPda = PDA.createUserStatPda(authority);
      const statInfo = await program.provider.connection.getAccountInfo(userStatPda);
      if (!statInfo) {
        return [];
      }
      const stat = program.coder.accounts.decode('UserStats', statInfo.data);
      count = stat.numberOfSubAccountsCreated ?? 0;
    }
    const marketIndexMap: any = Object.keys(PerpMarketMap()).reduce((obj, index) => {
      return {...obj, [PerpMarketMap()[index as any]]: Number(index)};
    }, {});
    const allPda: PublicKey[] = [];
    for (let i = 0; i < count; i++) {
      const userPda = PDA.createLpUserPda(authority, i);
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
          const perp: string = user?.ammPosition?.ammpool?.toBase58();
          users.push({...user, userPda, marketIndex: marketIndexMap[perp], ammpool: perp});
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
    let user = accounts.find((u: any) => {
      const {upperRate, lowerRate} = u.ammPosition || {};
      return (
        params.marketIndex === u.marketIndex &&
        Big(params.upperRate).times(1_000_000_000).eq(Big(upperRate.toString())) &&
        Big(params.lowerRate).times(1_000_000_000).eq(Big(lowerRate.toString()))
      );
    });
    if (user) {
      return user;
    }
    return accounts.find((u: Record<string, any>) => {
      const {liquidity} = u.ammPosition || {};
      return (
        Big(liquidity).eq(0) &&
        u.marketIndex === undefined &&
        u.reserveBaseAmount.eq(new BN(0)) &&
        u.reserveQuoteAmount.eq(new BN(0))
      );
    });
  }

  async getAllLPPositions(
    program: Program<RatexContracts>,
    authority: PublicKey,
    perpMarkets: Record<string, any>
  ) {
    const accounts = await this.getLpAccounts(program, authority);
    return accounts
      .map((a) => {
        const ammpool = a?.ammPosition?.ammpool;
        if (!ammpool) {
          return false;
        }
        const perp = perpMarkets[ammpool.toBase58()];
        if (!perp) {
          return false;
        }
        const {sqrtPrice, marketIndex} = perp;
        return this.formatLPAccountInfo(a, sqrtPrice, marketIndex);
      })
      .filter(Boolean);
  }

  async getLpPositions(
    program: Program<RatexContracts>,
    authority: PublicKey,
    marketIndex: number
  ) {
    const perpMarketPda = PDA.createYieldMarketPda(marketIndex);
    const perp = perpMarketPda.toBase58();
    const pool = await program.account.yieldMarket.fetch(perpMarketPda, 'processed');
    const accounts = await this.getLpAccounts(program, authority);
    return accounts
      .map((a) => {
        return this.formatLPAccountInfo(a, pool.pool.sqrtPrice, marketIndex);
      })
      .filter((u) => u.ammPosition?.ammpool === perp);
  }

  formatLPAccountInfo(account: Record<string, any>, sqrtPrice: BN, marketIndex: number) {
    const price = PriceMath.sqrtPriceX64ToPrice(sqrtPrice, 9, 9).toString();
    const lpAc = Object.keys(account).reduce(
      (user: Record<string, any>, k: string) => {
        if (k === 'ammPosition') {
          const amm = user[k];
          const lowerSqrtPrice = PriceMath.tickIndexToSqrtPriceX64(amm.tickLowerIndex);
          const upperSqrtPrice = PriceMath.tickIndexToSqrtPriceX64(amm.tickUpperIndex);
          const {tokenA, tokenB} = PoolUtil.getTokenAmountsFromLiquidity(
            amm.liquidity,
            sqrtPrice,
            lowerSqrtPrice,
            upperSqrtPrice,
            false
          );
          user[k] = Object.keys(account[k]).reduce((pos, k1) => {
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
          }, account[k]);
          user[k].price = price.toString();
          user[k].tokenA = Big(tokenA.toString()).div(1_000_000_000).toString();
          user[k].tokenB = Big(tokenB.toString()).div(1_000_000_000).toString();
        }
        user[k] = this.formatAccountInfo(account, k);
        return user;
      },
      {...account, marketIndex}
    );
    lpAc.baseAssetAmount = Big(lpAc.reserveBaseAmount)
      .plus(lpAc.ammPosition.tokenA ?? 0)
      .toString();
    lpAc.quoteAssetAmount = Big(lpAc.reserveQuoteAmount)
      .plus(lpAc.ammPosition.tokenB ?? 0)
      .toString();
    lpAc.total = Big(lpAc.baseAssetAmount)
      .times(price.toString())
      .add(lpAc.quoteAssetAmount)
      .toString();
    lpAc.earnFee = Big(lpAc.ammPosition.feeOwedA || 0)
      .add(lpAc.ammPosition.feeOwedB || 0)
      .toString();
    return lpAc;
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
}
