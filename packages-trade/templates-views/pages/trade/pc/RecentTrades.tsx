import {useLang} from '@rx/hooks/use-lang';
import {useObservable} from '@rx/hooks/use-observable';
import {lang as clang} from '@rx/lang/common.lang';
import {lang} from '@rx/lang/trade.lang';
import {recentTradesState$} from '@rx/streams/trade/recent-trades';
import {clsx} from 'clsx';
import {useState} from 'react';
import {css, styled} from 'styled-components';

const TrapezoidStyled = styled.div<{$show: boolean}>`
  top: calc(50% - 19px);
  transition: all 0.1s ease;
  border-top: 4px solid transparent;
  border-bottom: 4px solid transparent;
  ${({$show}) => {
    if ($show) {
      return css`
        left: 0;
        border-left: 14px solid #ffffff14;
      `;
    }
    return css`
      left: 7px;
      border-right: 14px solid #ffffff14;
    `;
  }}
`;

const header =
  'sticky top-0 border-b-1px border-solid border-gray-40 pt-4px pb-11px box-border text-gray-600 bg-#030B0F';
const body = 'py-4px box-border text-gray-600';

export function RecentTrades() {
  const {LG} = useLang();
  const [show, setShow] = useState<boolean>(true);
  const trades = useObservable(recentTradesState$, []);
  return (
    <div
      className={clsx(
        'relative flex flex-col max-h-448px',
        [show ? 'max-w-336px min-w-336px min-h-full overflow-auto' : 'w-0'],
        [show && 'border-l-1px border-solid border-gray-40']
      )}
    >
      <div className={clsx('items-center px-18px py-14px lh-22px', [show ? 'flex' : 'hidden'])}>
        {LG(lang.RecentTrades)}
      </div>
      <div className="relative overflow-y-auto sv">
        <div className={clsx('grid grid-cols-4', [show ? 'grid' : 'hidden'])}>
          <div className="contents">
            <div className={clsx(header, 'pl-16px')}>{LG(clang.Price)}</div>
            <div className={clsx(header, 'text-right')}>{LG(clang.Yield)}</div>
            <div className={clsx(header, 'text-right')}>{LG(clang.Amount)}</div>
            <div className={clsx(header, 'text-right pr-16px')}>{LG(clang.Time)}</div>
          </div>
          {trades?.map((t, i) => (
            <div key={i} className="contents">
              <div className={clsx(body, 'pl-16px')}>{t.price ?? '-'}</div>
              <div
                className={clsx(
                  body,
                  'text-right',
                  [t.direction === 'LONG' && 'text-green-500'],
                  [t.direction === 'SHORT' && 'text-red-500']
                )}
              >
                {t.yield ?? '-'}
              </div>
              <div className={clsx(body, 'text-right')}>{t.amount ?? '-'}</div>
              <div className={clsx(body, 'text-right pr-16px')}>{t.time ?? '-'}</div>
            </div>
          ))}
        </div>
      </div>
      <TrapezoidStyled
        $show={show}
        className="absolute top-1/2 transform -translate-y-1/2 w-18px h-38px cursor-pointer"
        onClick={() => setShow(!show)}
      >
        <i
          className={clsx('absolute top-10px  iconfont font-size-10px lh-10px text-white', [
            !show ? 'transform-rotate-180deg right-[-12px]' : 'left-[-12px]',
          ])}
        >
          &#xe63c;
        </i>
      </TrapezoidStyled>
    </div>
  );
}
