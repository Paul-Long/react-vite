import {useLang} from '@rx/hooks/use-lang';

export function Info() {
  const {LG} = useLang();
  return (
    <div className="flex-1 flex flex-row items-center gap-24px">
      {genInfo(LG).map((o) => (
        <div
          key={o.title}
          className="flex-1 flex flex-col b-solid b-gray-80 not-last:b-r-1px not-last:pr-24px"
        >
          <span className="font-size-12px lh-20px font-normal text-gray-400 text-nowrap">
            {o.title}
          </span>
          <span className="font-size-14px lh-24px font-medium text-white text-nowrap">
            {o.value}
          </span>
        </div>
      ))}
    </div>
  );
}

const genInfo = (LG: (s: string) => string) => [
  {title: 'TTM', value: '30 days'},
  {title: 'Yield', value: '7.10%'},
  {title: 'Price', value: '0.005620'},
  {title: 'Cumulative Price', value: '0.039040'},
  {title: 'OpenInterest', value: '-'},
  {title: 'Ava.Liquidity', value: '-'},
];
