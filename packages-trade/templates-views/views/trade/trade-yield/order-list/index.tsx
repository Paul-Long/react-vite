import {useLang} from '@rx/hooks/use-lang';
import {lang as clang} from '@rx/lang/common.lang';
import {lang} from '@rx/lang/trade.lang';
import {clsx} from 'clsx';
import {styled} from 'styled-components';

const Contents = styled.div`
  cursor: pointer;
  &:hover .td {
    background: #2c2d2d !important;
    backdrop-filter: blur(200px);
  }
`;

const headerRow = 'bg-gray-4 py-8px';
const bodyRow = 'td flex flex-row items-center py-12px hover:bg-gray-4';

export function OrderList() {
  const {LG} = useLang();
  return (
    <div className={clsx('w-full grid grid-cols-auto-5 gap-y-12px text-gray-500')}>
      <div className="contents bg-gray-4 text-gray-60">
        <div className={clsx(headerRow, 'pl-10px sm:pl-20px')}>{LG(clang.No)}.</div>
        <div className={clsx(headerRow)}>{LG(lang.MarginType)}</div>
        <div className={clsx(headerRow)}>{LG(clang.Contract)}</div>
        <div className={clsx(headerRow)}>YT/ST</div>
        <div className={clsx(headerRow)}>{LG(clang.Margin)}</div>
      </div>
    </div>
  );
}
