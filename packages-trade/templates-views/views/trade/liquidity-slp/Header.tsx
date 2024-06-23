import {IMAGES} from '@/pages/lp/const';
import {Reference} from '@/views/trade/market/Reference';
import {useLang} from '@rx/hooks/use-lang';
import {lang} from '@rx/lang/lp.lang';
import {clsx} from 'clsx';
import {useCallback, useState} from 'react';

export function Header({data, onChange}: {data: ConfigSymbol; onChange: (tab: string) => void}) {
  const {LG} = useLang();
  const [tab, setTab] = useState<string>('Detail');

  const handleTabChange = useCallback(
    (t: string) => () => {
      setTab(t);
      onChange?.(t);
    },
    []
  );

  return (
    <div className="flex flex-col gap-16px px-20px pt-20px pb-10px  border-1px border-solid border-#2C2D2D border-b-none">
      <div className="flex flex-row items-center gap-8px mb-16px">
        <img
          src={IMAGES[data?.symbolLevel2Category?.toUpperCase()]}
          alt=""
          width={36}
          height={36}
        />
        <span className="text-gray-500 font-size-24px lh-32px">{data?.symbol}</span>
      </div>
      <Reference data={data as ConfigSymbol} />
      <div className="flex flex-row items-center">
        {Tabs(LG).map(({text, value}) => (
          <div
            key={value}
            className={clsx('flex flex-col items-center py-4px px-12px box-border cursor-pointer')}
            onClick={handleTabChange(value)}
          >
            <span
              className={clsx('lh-18px pb-2px', [
                tab === value ? 'text-lime-500 fw-medium' : 'text-gray-60',
              ])}
            >
              {text}
            </span>
            <div
              className={clsx('w-10px h-2px bg-lime-500 rounded-2px', [
                tab === value ? 'opacity-100' : 'opacity-0',
              ])}
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
}

const Tabs = (LG: any) => [
  {text: LG(lang.Detail), value: 'Detail'},
  {text: LG(lang.LiveLPPosition), value: 'LiveLPPosition'},
  {text: LG(lang.ResidualLPPosition), value: 'ResidualLPPosition'},
];
