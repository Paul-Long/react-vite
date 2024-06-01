import {MathUtil} from '@/utils/math-util';
import BN from 'bn.js';
import Decimal from 'decimal.js';

export type TokenAmounts = {
  tokenA: BN;
  tokenB: BN;
};

export class PoolUtil {
  /**
   * @category Whirlpool Utils
   * @param liquidity
   * @param currentSqrtPrice
   * @param lowerSqrtPrice
   * @param upperSqrtPrice
   * @param round_up
   * @returns
   */
  public static getTokenAmountsFromLiquidity(
    liquidity: BN,
    currentSqrtPrice: BN,
    lowerSqrtPrice: BN,
    upperSqrtPrice: BN,
    round_up: boolean
  ): TokenAmounts {
    const _liquidity = new Decimal(liquidity.toString());
    const _currentPrice = new Decimal(currentSqrtPrice.toString());
    const _lowerPrice = new Decimal(lowerSqrtPrice.toString());
    const _upperPrice = new Decimal(upperSqrtPrice.toString());
    let tokenA, tokenB;
    if (currentSqrtPrice.lt(lowerSqrtPrice)) {
      // x = L * (pb - pa) / (pa * pb)
      tokenA = MathUtil.toX64_Decimal(_liquidity)
        .mul(_upperPrice.sub(_lowerPrice))
        .div(_lowerPrice.mul(_upperPrice));
      tokenB = new Decimal(0);
    } else if (currentSqrtPrice.lt(upperSqrtPrice)) {
      // x = L * (pb - p) / (p * pb)
      // y = L * (p - pa)
      tokenA = MathUtil.toX64_Decimal(_liquidity)
        .mul(_upperPrice.sub(_currentPrice))
        .div(_currentPrice.mul(_upperPrice));
      tokenB = MathUtil.fromX64_Decimal(_liquidity.mul(_currentPrice.sub(_lowerPrice)));
    } else {
      // y = L * (pb - pa)
      tokenA = new Decimal(0);
      tokenB = MathUtil.fromX64_Decimal(_liquidity.mul(_upperPrice.sub(_lowerPrice)));
    }

    // TODO: round up, add up | remove down
    if (round_up) {
      return {
        tokenA: new BN(tokenA.ceil().toString()),
        tokenB: new BN(tokenB.ceil().toString()),
      };
    } else {
      return {
        tokenA: new BN(tokenA.floor().toString()),
        tokenB: new BN(tokenB.floor().toString()),
      };
    }
  }
}
