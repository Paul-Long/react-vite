import {IMAGES} from '@/pages/lp/const';
import {PriceChart} from '@/views/trade/market/PriceChart';
import {Reference} from '@/views/trade/market/Reference';
import {TermStructure} from '@/views/trade/market/TermStructure';
import {LeftArrowIcon} from '@rx/components/icons/LeftArrowIcon';
import {numUtil} from '@rx/helper/num';
import {useLang} from '@rx/hooks/use-lang';
import {lang} from '@rx/lang/dashboard.lang';
import {loadEcharts} from '@rx/resource/js';
import {clsx} from 'clsx';
import {useEffect, useState} from 'react';
import {styled} from 'styled-components';

const Table = styled.table`
  th,
  td {
    border: 1px solid #2c2d2d;
  }
`;

export function Detail({data, onBack}: {data: Record<string, any>; onBack: () => void}) {
  const {LG} = useLang();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    loadEcharts().then(() => {
      setReady(true);
    });
  }, []);

  return (
    <div
      className={clsx('relative flex flex-col w-1200px max-w-screen mx-auto mt-40px sm:pl-36px')}
    >
      <div
        className={clsx(
          'absolute left-0 top-0 cursor-pointer',
          'flex justify-center items-center p-6px box-border border-1px border-solid border-#2C2D2D border-r-none'
        )}
        onClick={onBack}
      >
        <LeftArrowIcon color="white" width={24} height={24} />
      </div>
      <Table className="table-auto w-full text-left whitespace-no-wrap">
        <thead>
          <tr className="">
            <th className="p-20px" colSpan={4}>
              <div className="flex flex-row items-center gap-8px mb-16px">
                <img
                  src={IMAGES[data.symbolLevel2Category?.toUpperCase()]}
                  alt=""
                  width={36}
                  height={36}
                />
                <span className="text-gray-500 font-size-24px lh-32px">{data.symbol}</span>
              </div>
              <Reference data={data as ConfigSymbol} />
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="text-gray-60">
            <td className="w-1/4 py-10px px-20px">
              <div>{LG(lang.UnderlyingYield)}</div>
              <div className="font-size-16px lh-24px text-gray-500 fw-medium">
                {data.symbolLevel2Category}
              </div>
            </td>
            <td className="w-1/4 py-10px px-20px">
              <div className="text-gray-400">{LG(lang.Maturity)}</div>
              <div className="font-size-16px lh-24px text-gray-500 fw-medium">
                {data?.dueDate?.slice(0, 11)?.replace(/-/g, '/')}
              </div>
            </td>
            <td className="w-1/4 py-10px px-20px">
              <div className="text-gray-400">{LG(lang.ExpireIn)}</div>
              <div className="font-size-16px lh-24px text-gray-500 fw-medium">
                {[data?.ttm, data.unit].join(' ')}
              </div>
            </td>
            <td className="w-1/4 py-10px px-20px">
              <div className="text-gray-400">{LG(lang.ImpliedYield)}</div>
              <div className="font-size-16px lh-24px text-lime-500 fw-medium">
                {data?.impliedYield}
              </div>
            </td>
          </tr>
          <tr className="text-gray-60">
            <td className="w-1/4 py-10px px-20px">
              <div className="text-gray-400">{data.symbol} price</div>
              <div className="font-size-16px lh-24px text-white fw-medium">
                {data?.LastPrice ?? '-'}
              </div>
            </td>
            <td className="w-1/4 py-10px px-20px">
              <div className="text-gray-400">{LG(lang.OpenInterest)}</div>
              <div className="font-size-16px lh-24px text-white fw-medium">
                {numUtil.trimEnd0(data?.OpenInterest ?? '')} SOL
              </div>
            </td>
            <td className="w-1/4 py-10px px-20px">
              <div className="text-gray-400">{LG(lang.AvaLiquidity)}</div>
              <div className="font-size-16px lh-24px text-white fw-medium">
                {numUtil.floor(data?.AvaLiquidity || 0, 2)} SOL
              </div>
            </td>
            <td className="w-1/4 py-10px px-20px"></td>
          </tr>
        </tbody>
      </Table>
      <Table className="w-full mt-40px">
        <thead>
          <tr>
            <td colSpan={3} className="w-3/4 font-size-16px lh-24px fw-medium py-12px px-20px">
              {LG(lang.PriceChart)}
            </td>
            <td className="w-1/4 font-size-16px lh-24px fw-medium  py-12px px-20px">
              {LG(lang.TermStructure)}
            </td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan={3} className="w-3/4 p-0">
              <PriceChart ready={ready} detail={data as ConfigSymbol} />
            </td>
            <td className="w-1/4 p-0">
              <TermStructure ready={ready} detail={data as ConfigSymbol} />
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}
