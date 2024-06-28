import {IMAGES} from '@/pages/lp/const';
import {positions$} from '@/streams/lp/position-all';
import {numUtil} from '@rx/helper/num';
import {useLang} from '@rx/hooks/use-lang';
import {useObservable} from '@rx/hooks/use-observable';
import {lang} from '@rx/lang/lp.lang';
import {Button, Spin} from '@rx/widgets';
import {clsx} from 'clsx';
import {useState} from 'react';
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

export function LPLivePosition() {
  const {LG} = useLang();
  const [loading, setLoading] = useState(false);
  const [select, setSelect] = useState<any>();
  const positions = useObservable(positions$, []);
  console.log(positions);
  return (
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
            onClick={() => setSelect(pos)}
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
                  disabled={false}
                  loading={false}
                  className={clsx('font-size-12px')}
                  onClick={() => void 0}
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
  );
}
