import {positionMarginType$, positionPage$} from '@/streams/trade/page-state';
import {NotConnect} from '@/views/trade/trade-yield/NotConnect';
import {HistoryList} from '@/views/trade/trade-yield/history-list';
import {OrderList} from '@/views/trade/trade-yield/order-list';
import {PositionList} from '@/views/trade/trade-yield/position-list';
import {useLang} from '@rx/hooks/use-lang';
import {useStream} from '@rx/hooks/use-stream';
import {lang} from '@rx/lang/trade.lang';
import {clsx} from 'clsx';

export function PositionWrap() {
  const {LG} = useLang();
  const [page, setPage] = useStream(positionPage$);
  const [marginType, setMarginType] = useStream(positionMarginType$);

  return (
    <>
      <div className="w-full flex flex-row items-center justify-between p-20px">
        <div className="w-full flex flex-row items-center gap-10px">
          {Types(LG).map((t) => (
            <div
              key={t.value}
              className={clsx('box-border px-32px py-12px cursor-pointer', [
                page === t.value ? 'bg-lime-10 text-lime-500' : 'bg-gray-4',
              ])}
              onClick={() => setPage(t.value)}
            >
              {t.text}
            </div>
          ))}
        </div>
        <div
          className={clsx('flex-row items-center gap-10px', [
            page === 'Position' ? 'flex' : 'hidden',
          ])}
        >
          {MarginTypes(LG).map((t) => (
            <div
              key={t.value}
              className={clsx(
                'box-border px-20px py-7px lh-18px border-1px border-solid cursor-pointer rounded-2px',
                [
                  marginType === t.value
                    ? 'bg-lime-10 text-lime-500 border-lime-10'
                    : 'border-#2C2D2D',
                ]
              )}
              onClick={() => setMarginType(t.value)}
            >
              {t.text}
            </div>
          ))}
        </div>
      </div>
      {page === 'Position' && <PositionList />}
      {page === 'Orders' && <OrderList />}
      {page === 'History' && <HistoryList />}
      <NotConnect />
    </>
  );
}

const Types = (LG: any) => [
  {text: LG(lang.Position), value: 'Position'},
  {text: LG(lang.Orders), value: 'Orders'},
  {text: LG(lang.History), value: 'History'},
];

export const MarginTypes = (LG: any) => [
  {text: LG(lang.Cross), value: 'CROSS'},
  {text: LG(lang.Isolated), value: 'ISOLATED'},
];
