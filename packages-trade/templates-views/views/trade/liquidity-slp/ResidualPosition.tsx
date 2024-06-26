import {useLang} from '@rx/hooks/use-lang';
import {lang} from '@rx/lang/lp.lang';
import {clsx} from 'clsx';
import {styled} from 'styled-components';
const Contents = styled.div`
  cursor: pointer;
  &:hover .td {
    background: #ffffff14 !important;
    backdrop-filter: blur(200px);
  }
`;

const headerRow = 'bg-gray-4 py-8px';
const bodyRow = 'td flex flex-row items-center py-12px hover:bg-gray-4';

export function ResidualPosition({contract}: {contract: ConfigSymbol}) {
  const {LG} = useLang();
  return (
    <div className="w-full grid grid-cols-5 gap-y-12px text-gray-500 border-1px border-solid border-#2C2D2D border-t-none">
      <div className="contents bg-gray-4 text-gray-60">
        <div className={clsx(headerRow, 'pl-10px sm:pl-20px')}>{LG(lang.Pool)}</div>
        <div className={clsx(headerRow)}>{LG(lang.ARR)}</div>
        <div className={clsx(headerRow)}>{LG(lang.LPValueTotal)}</div>
        <div className={clsx(headerRow)}>{LG(lang.Range)}</div>
        <div className={clsx(headerRow)}>{LG(lang.EarnedFees)}</div>
      </div>
    </div>
  );
}
