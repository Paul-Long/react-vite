import {IMAGES} from '@/pages/lp/const';
import {loading$, marketIndex$, positions$} from '@/streams/lp/positions';
import {selectPosition$} from '@/views/trade/liquidity-slp/state';
import {SignalIcon} from '@rx/components/icons/SignalIcon';
import {numUtil} from '@rx/helper/num';
import {useLang} from '@rx/hooks/use-lang';
import {useObservable} from '@rx/hooks/use-observable';
import {useStream} from '@rx/hooks/use-stream';
import {lang} from '@rx/lang/lp.lang';
import {rateXClient$} from '@rx/web3/streams/rate-x-client';
import {Button, Spin, Toast} from '@rx/widgets';
import {clsx} from 'clsx';
import {useCallback, useEffect, useMemo, useState} from 'react';
import {css, styled} from 'styled-components';

const Contents = styled.div<{$select: boolean}>`
  cursor: pointer;
  &:hover .td {
    background: #2c2d2d !important;
    backdrop-filter: blur(200px);
  }
  ${({$select}) => {
    if ($select) {
      return css`
        & .td {
          background: #2c2d2d !important;
          backdrop-filter: blur(200px);
        }
      `;
    }
  }}
`;

const headerRow = 'bg-gray-4 py-8px';
const bodyRow = 'td flex flex-row items-center py-12px hover:bg-gray-4';

export function LivePosition({contract}: {contract: ConfigSymbol}) {
  const {LG} = useLang();
  const {positions, select, loading, claimLoading, handleSelect, handleClaim} =
    usePosition(contract);
  return (
    <div className="w-full flex-1 pb-12px border-1px border-solid border-#2C2D2D border-t-none">
      <div className="relative w-full grid grid-cols-auto-5 gap-y-12px text-gray-500">
        <div className="contents bg-gray-4 text-gray-60">
          <div className={clsx(headerRow, 'pl-10px sm:pl-20px')}>{LG(lang.Pool)}</div>
          <div className={clsx(headerRow)}>{LG(lang.ARR)}</div>
          <div className={clsx(headerRow)}>{LG(lang.LPValueTotal)}</div>
          <div className={clsx(headerRow)}>{LG(lang.Range)}</div>
          <div className={clsx(headerRow)}>{LG(lang.EarnedFees)}</div>
        </div>
        {positions?.map((pos: Record<string, any>) => {
          const {ammPosition, key} = pos;
          const {lowerRate, upperRate} = ammPosition;
          return (
            <Contents
              $select={select === key}
              key={key}
              className={clsx('contents')}
              onClick={() => handleSelect(pos)}
            >
              <div className={clsx(bodyRow, 'gap-8px py-12px pl-10px sm:pl-20px')}>
                <img
                  src={IMAGES[pos?.symbolLevel2Category.toUpperCase()]}
                  alt={pos?.symbol}
                  width={24}
                  height={24}
                />
                {pos?.symbol}
              </div>
              <div className={clsx(bodyRow, 'text-lime-500')}>{pos.apr}%</div>
              <div className={clsx(bodyRow, 'text-yellow-500')}>
                {numUtil.floor(pos?.total, 6)} SOL
              </div>
              <div className={clsx(bodyRow)}>
                {!lowerRate ? '-' : numUtil.floor(lowerRate, 2, -2)}% ~{' '}
                {!upperRate ? '-' : numUtil.floor(upperRate, 2, -2)}%
              </div>
              <div className={clsx(bodyRow, 'text-yellow-500 gap-8px')}>
                {pos?.earnFee ?? '-'}
                {Number(pos?.earnFee) > 0 && (
                  <Button
                    size="sm"
                    type="default"
                    disabled={claimLoading}
                    loading={claimLoading}
                    className={clsx('font-size-12px')}
                    onClick={handleClaim(pos)}
                  >
                    {LG(lang.Claim)}
                  </Button>
                )}
              </div>
            </Contents>
          );
        })}
        {loading && <Spin className="mt-80px" />}
      </div>
      {!loading && positions?.length <= 0 && (
        <div className="flex flex-col items-center py-100px">
          <SignalIcon width={64} height={64} />
          <div className="font-size-16px lh-24px fw-medium mt-30px text-gray-500">
            Make a deposit to view data
          </div>
          <div className="font-size-14px lh-18px fw-normal mt-8px text-gray-60 max-w-400px text-center">
            You can track your deposit performance as soon as you deposit into the vault.
          </div>
        </div>
      )}
    </div>
  );
}

function usePosition(contract: ConfigSymbol) {
  const [loading] = useStream(loading$);
  const [client] = useStream(rateXClient$);
  const [_, setSelectPosition] = useStream(selectPosition$);
  const positions = useObservable<any[]>(positions$, []);
  const [claimLoading, setClaimLoading] = useState(false);
  const [select, setSelect] = useState('');

  const data = useMemo(() => {
    return positions?.find((p) => p.key === select);
  }, [select, positions]);

  const dataSource = useMemo(() => {
    return positions?.filter((pos) => pos.marketIndex === contract?.id);
  }, [positions, contract]);

  useEffect(() => {
    if (!!contract) {
      marketIndex$.next(contract.id);
    }
  }, [contract]);

  useEffect(() => {
    if (!select && positions.length > 0) {
      handleSelect(positions[0]);
      return;
    }
    if (positions.length > 0 && !positions.find((p) => p.key === select)) {
      handleSelect(positions[0]);
      return;
    }
    if (positions.length <= 0) {
      handleSelect(null);
      return;
    }
  }, [select, positions]);

  const handleSelect = useCallback((position: Record<string, any> | null) => {
    if (!position) {
      setSelect('');
      setSelectPosition(null);
      return;
    }
    setSelect(position.key);
    setSelectPosition(position);
  }, []);

  const handleClaim = useCallback(
    (position: Record<string, any>) => async () => {
      if (!client) {
        return;
      }
      setClaimLoading(true);
      const {marketIndex, userPda, ammPosition, total} = position;
      const {upperRate, lowerRate, tickLowerIndex, tickUpperIndex} = ammPosition;
      const params = {
        upperRate,
        lowerRate,
        marketIndex,
        total,
        userPda,
        maturity: position.seconds,
        tickLowerIndex,
        tickUpperIndex,
      };
      const tx = await client?.withdrawLpEarnFees(params);
      if (tx) {
        Toast.success('Claim success');
      }
      marketIndex$.next(marketIndex);
      setClaimLoading(false);
    },
    [client]
  );

  return {
    loading,
    claimLoading,
    positions: dataSource,
    select,
    data,
    setSelect,
    handleSelect,
    handleClaim,
  };
}
