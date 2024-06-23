import {IMAGES} from '@/pages/lp/const';
import {query$} from '@/streams/lp/positions';
import {WalletBalance} from '@/views/trade/liquidity-slp/WalletBalance';
import {selectPosition$} from '@/views/trade/liquidity-slp/state';
import {InfoIcon} from '@rx/components/icons/InfoIcon';
import {numUtil} from '@rx/helper/num';
import {useLang} from '@rx/hooks/use-lang';
import {useStream} from '@rx/hooks/use-stream';
import {lang as clang} from '@rx/lang/common.lang';
import {lang} from '@rx/lang/lp.lang';
import {updateBalance$} from '@rx/web3/streams/balance';
import {rateXClient$} from '@rx/web3/streams/rate-x-client';
import {Button, ProgressSlider, Tooltip} from '@rx/widgets';
import {Big} from 'big.js';
import {clsx} from 'clsx';
import {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {styled} from 'styled-components';

const TrapezoidButton = styled.button`
  outline: none;
  &.left {
    clip-path: polygon(10% 0, 100% 0, 100% 100%, 0 100%);
  }
  &.right {
    clip-path: polygon(0 0, 90% 0, 100% 100%, 0 100%);
  }
`;

export function PositionPlaceOrder() {
  const {LG} = useLang();
  const [position] = useStream(selectPosition$);
  console.log('select position : ', position);
  const [type, setType] = useState('Deposit');
  return (
    <div className="h-full flex flex-col border-1px border-solid border-#2C2D2D border-l-none">
      <div className="flex flex-row items-center">
        <TrapezoidButton
          className={clsx('flex-1 py-15px', [type === 'Withdraw' && 'right bg-#131315'])}
          onClick={() => setType('Withdraw')}
        >
          {LG(clang.Withdraw)}
        </TrapezoidButton>
        <TrapezoidButton
          className={clsx('flex-1 py-15px', [type === 'Deposit' && 'left bg-#131315'])}
          onClick={() => setType('Deposit')}
        >
          {LG(clang.Deposit)}
        </TrapezoidButton>
      </div>
      {type === 'Withdraw' && <Withdraw position={position} />}
      {type === 'Deposit' && <Deposit position={position} />}
    </div>
  );
}

function Withdraw({position}: {position: Record<string, any>}) {
  const {LG} = useLang();
  const {ammPosition} = position;
  const {lowerRate, upperRate} = ammPosition || {};
  const {loading, info, percent, ytClose, maxMarginAmount, setPercent, handleSubmit} =
    useWithdraw(position);
  return (
    <div className="w-full flex-1 bg-#131315 p-16px">
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row items-center gap-8px font-size-14px lh-18px fw-medium">
          <img
            src={IMAGES[position?.symbolLevel2Category.toUpperCase()]}
            alt={position?.symbol}
            width={20}
            height={20}
          />
          {position?.symbol}
        </div>
        <div>
          {!lowerRate ? '-' : numUtil.floor(lowerRate, 2, -2)}% ~{' '}
          {!upperRate ? '-' : numUtil.floor(upperRate, 2, -2)}%
        </div>
      </div>
      <div className="flex flex-row items-center gap-8px font-size-12px lh-18px py-12px border-b-1px border-b-solid border-b-#2C2D2D">
        <span className="text-gray-60">{LG(lang.YourLPPosition)}</span>
        <span className="text-yellow-500">{numUtil.floor(position?.total, 6)}</span>
      </div>

      <div className="flex flex-col py-12px border-b-1px border-b-solid border-b-#2C2D2D">
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-row items-center gap-8px">
            <img
              src={IMAGES[position?.symbolLevel2Category.toUpperCase()]}
              alt={position?.symbolLevel2Category}
              width={20}
              height={20}
            />
            {position?.symbolLevel2Category}
          </div>
          <div className="flex flex-row items-center gap-4px font-size-16px text-yellow-500 fw-medium">
            <span className="font-size-12px text-gray-60">({percent}%)</span>
            {info?.marginAmount
              ? Big(info.marginAmount ?? 0)
                  .round(5, 0)
                  .abs()
                  .toString()
              : '-'}
            <Tooltip
              text={
                <div className="flex flex-col text-gray-500 font-size-12px gap-10px fw-normal">
                  <div className="flex flex-row items-center justify-between flex-nowrap overflow-hidden gap-8px">
                    <span className="text-nowrap">Max Withdrawable Value</span>
                    <span className="text-nowrap">
                      {maxMarginAmount} {position?.symbolLevel2Category}
                    </span>
                  </div>
                  <div className="flex flex-row items-center justify-between gap-8px">
                    <span className="text-nowrap text-gray-60">YT to be closed</span>
                    <span className="text-nowrap">
                      {ytClose} {position?.symbol}
                    </span>
                  </div>
                  <div className="flex flex-row items-center justify-between gap-8px">
                    <span className="text-nowrap text-gray-60">Estimated YT price</span>
                    <span className="text-nowrap">
                      {Number(ytClose) > 0 ? info?.entryPrice ?? '-' : '-'}
                    </span>
                  </div>
                </div>
              }
            >
              <InfoIcon width={16} height={16} color="#F6F7F399" />
            </Tooltip>
          </div>
        </div>
        <div className="w-full mt-24px">
          <ProgressSlider
            value={percent}
            min={0}
            max={100}
            unit="%"
            onChange={(p) => setPercent(p)}
          />
        </div>
      </div>
      <Button
        size="lg"
        type="lime"
        disabled={loading}
        loading={loading}
        className="w-full h-48px font-size-16px fw-medium mt-12px"
        onClick={handleSubmit}
      >
        {LG(clang.Withdraw)}
      </Button>
    </div>
  );
}

function Deposit({position}: {position: Record<string, any>}) {
  const {LG} = useLang();
  const {loading, amount, setAmount, handleSubmit} = useDeposit(position);

  return (
    <div className="w-full flex-1 bg-#131315 p-16px">
      <div className="flex flex-row items-center gap-8px font-size-12px lh-18px pb-12px border-b-1px border-b-solid border-b-#2C2D2D">
        <span className="text-gray-60">{LG(lang.YourLPPosition)}</span>
        <span className="text-gray-500">{numUtil.floor(position?.total, 6)}</span>
      </div>
      <WalletBalance
        marketIndex={position?.id}
        currency={position?.symbolLevel2Category}
        value={amount}
        onChange={(v) => setAmount(v)}
      />
      <Button
        size="lg"
        type="lime"
        disabled={loading}
        loading={loading}
        className="w-full h-48px font-size-16px fw-medium mt-12px"
        onClick={handleSubmit}
      >
        {LG(clang.Deposit)}
      </Button>
    </div>
  );
}

function useDeposit(position: Record<string, any>) {
  const [client] = useStream(rateXClient$);
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState<string | number>(0);

  const handleSubmit = useCallback(async () => {
    if (!amount || Number(amount) <= 0) {
      return;
    }
    setLoading(true);
    const {ammPosition, marketIndex} = position;
    const {upperRate, lowerRate} = ammPosition || {};

    const params = {marketIndex, upperRate, lowerRate, amount, maturity: position.seconds};
    console.log('add lp params : ', params);
    await client.addPerpLpShares(params);
    updateBalance$.next(0);
    query$.next(0);
    setLoading(false);
  }, [position, amount, client]);

  return {loading, amount, setAmount, handleSubmit};
}

function useWithdraw(position: Record<string, any>) {
  const timer = useRef<any>(null);
  const [client] = useStream(rateXClient$);
  const [loading, setLoading] = useState(false);
  const [percent, setPercent] = useState(0);
  const [totalInfo, setTotalInfo] = useState<Record<string, any> | null>(null);
  const [info, setInfo] = useState<Record<string, any> | null>(null);

  const maxMarginAmount = useMemo(() => {
    if (!totalInfo?.marginAmount) {
      return '-';
    }
    return Big(totalInfo.marginAmount ?? 0)
      .round(6, 0)
      .abs()
      .toString();
  }, [totalInfo]);

  const ytClose = useMemo(() => {
    if (!position || !percent) {
      return '-';
    }
    return Big(position.baseAssetAmount).times(percent).div(100).round(6, 0).toString();
  }, [position, percent]);

  const retainRatio = useMemo<{ratio: string; st: string; yt: string}>(() => {
    if (!position || !info) {
      return {ratio: '-', yt: '-', st: '-'};
    }
    const {ammPosition, reserveBaseAmount, reserveQuoteAmount, baseAssetAmount} = position;
    const {tokenA} = ammPosition || {};
    if (tokenA > 0 && tokenA > 0 - reserveBaseAmount) {
      return {ratio: '-', yt: '-', st: '-'};
    }
    if (!Big(reserveBaseAmount).eq(0)) {
      const ratio = Big(baseAssetAmount).div(reserveBaseAmount).abs().round(2, 0);

      if (info?.amountA) {
        const yt = Big(baseAssetAmount).add(!info.atob ? info?.amountA : 0 - (info?.amountA || 0));
        const rr = yt.div(baseAssetAmount).round(6, 3);
        const st = Big(reserveQuoteAmount).times(ratio).times(rr).round(6, 3);
        return {
          ratio: ratio.times(100).toString() + '%',
          yt: yt.round(4, 3).toString(),
          st: st.round(4, 3).toString(),
        };
      }

      return {ratio: ratio.times(100).toString() + '%', yt: '-', st: '-'};
    }
    return {ratio: '-', yt: '-', st: '-'};
  }, [position, info]);

  useEffect(() => {
    if (!client || !position) {
      return;
    }
    setTotalInfo(null);
    (async () => {
      const {ammPosition, marketIndex, baseAssetAmount, userPda} = position;
      const {upperRate, lowerRate} = ammPosition || {};
      const params = {
        marketIndex,
        upperRate,
        lowerRate,
        rmLiquidityPercent: 100,
        maturity: position.seconds,
        baseAssetAmount: Big(baseAssetAmount).times(-1).toNumber(),
        userPda,
      };
      const result = await client.removePerpLpSharesView(params);
      setTotalInfo(result);
      console.log('remove perp shares view : ', 100, result);
    })();
  }, [position, client]);

  useEffect(() => {
    if (!client || !position || !percent || Number(percent) <= 0) {
      setInfo(null);
      return;
    }
    setInfo(null);
    if (timer.current) {
      clearTimeout(timer.current);
    }
    timer.current = setTimeout(async () => {
      const {ammPosition, marketIndex, baseAssetAmount, userPda} = position;
      const {upperRate, lowerRate} = ammPosition || {};
      const params = {
        marketIndex,
        upperRate,
        lowerRate,
        rmLiquidityPercent: percent,
        maturity: position.seconds,
        baseAssetAmount: Big(baseAssetAmount).times(-1).toNumber(),
        userPda,
      };
      const result = await client.removePerpLpSharesView(params);
      setInfo(result);
      console.log('remove perp shares view : ', percent, result);
      clearTimeout(timer.current);
      timer.current = null;
    }, 300);
  }, [position, percent, client]);

  const handleSubmit = useCallback(async () => {
    const {ammPosition, marketIndex, baseAssetAmount, userPda} = position;
    const {upperRate, lowerRate} = ammPosition || {};
    if (Number(percent) <= 0) {
      return;
    }
    setLoading(true);
    const params = {
      marketIndex,
      upperRate,
      lowerRate,
      rmLiquidityPercent: Big(percent).toNumber(),
      maturity: position.seconds,
      baseAssetAmount: Big(baseAssetAmount).times(-1).toNumber(),
      userPda,
    };
    console.log('remove lp params : ', params);
    await client.removePerpLpShares(params);
    updateBalance$.next(0);
    query$.next(0);
    setLoading(false);
  }, [position, percent, client]);

  return {loading, percent, info, ytClose, maxMarginAmount, setPercent, handleSubmit};
}
