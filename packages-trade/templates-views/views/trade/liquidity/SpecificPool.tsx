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

const headerRow = 'bg-gray-40 py-8px';
const bodyRow = 'td flex flex-row items-center py-12px hover:bg-gray-40';

export function SpecificPool() {
  const {LG} = useLang();
  return (
    <div className="w-full flex flex-col">
      <div className="w-full font-size-16px lh-24px fw-medium py-18px px-20px border-b-1px border-solid border-#2C2D2D">
        {LG(lang.SpecificLiquidityPool)}
      </div>
      <div className="w-full grid grid-cols-6 gap-y-12px text-gray-500">
        <div className="contents bg-gray-40 text-gray-60">
          <div className={clsx(headerRow, 'pl-10px sm:pl-20px')}>{LG(lang.Pool)}</div>
          <div className={clsx(headerRow)}>{LG(lang.APR)}</div>
          <div className={clsx(headerRow)}>{LG(lang.Maturity)}</div>
          <div className={clsx(headerRow)}>{LG(lang.ExpireIn)}</div>
          <div className={clsx(headerRow)}>{LG(lang.ActiveRadio)}</div>
          <div className={clsx(headerRow)}>{LG(lang.TVL)}</div>
        </div>
      </div>
    </div>
  );
}
