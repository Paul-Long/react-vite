import {apy$} from '@/streams/lp/apy';
import {RangeChart} from '@/views/trade/liquidity-slp/RangeChart';
import {numUtil} from '@rx/helper/num';
import {useLang} from '@rx/hooks/use-lang';
import {useObservable} from '@rx/hooks/use-observable';
import {lang} from '@rx/lang/lp.lang';
import {Big} from 'big.js';
import {clsx} from 'clsx';
import {ReactNode, useEffect, useMemo, useState} from 'react';
import {styled} from 'styled-components';

const Table = styled.table`
  th,
  td {
    border: 1px solid #2c2d2d;
  }
`;
export function Detail({contract}: {contract: Record<string, any>}) {
  const {LG} = useLang();
  const [term, setTerm] = useState('7D');
  const apyList = useObservable(apy$, []);
  const apyData = useMemo(() => {
    return apyList?.find((a: any) => a.symbol === contract?.symbol && a.term === term);
  }, [contract, apyList, term]);

  const ar = useMemo(() => {
    if (!contract) {
      return '-';
    }
    return (
      Big(contract.LastPrice ?? '0')
        .times(contract.kValue)
        .times(100)
        .round(2, 3)
        .toString() + '%'
    );
  }, [contract]);

  const apr = useMemo(() => {
    if (!apyData?.apr) {
      return '-';
    }
    return Big(apyData.apr).times(100).toFixed(4);
  }, [apyData]);

  return (
    <Table className="w-full">
      <tbody className="text-gray-60">
        <tr>
          <Col text={LG(lang.Pool)}>{contract?.symbol ?? '-'}</Col>
          <Col text={LG(lang.Maturity)}>{contract?.dueDate ?? '-'}</Col>
          <Col text={LG(lang.Pool)}>{[contract?.ttm, contract?.unit].join(' ')}</Col>
        </tr>
        <tr>
          <td className="w-1/3 py-10px px-20px">
            <div className="relative lh-18px fw-normal">APR {term}</div>
            <div className="font-size-16px lh-24px fw-medium text-lime-500">{apr}%</div>
          </td>
          <td className="w-1/3 py-10px px-20px">
            <SelectTerm onChange={(v: any) => setTerm(v)} />
            <div className="font-size-16px lh-24px fw-medium text-yellow-500">
              {numUtil.trimEnd0(numUtil.floor(apyData?.stVolume ?? 0, 4))} SOL
            </div>
          </td>
          <Col text="TVL">
            <span className="text-yellow-500">
              {numUtil.trimEnd0(numUtil.floor(contract?.AvaLiquidity ?? 0, 4))} SOL
            </span>
          </Col>
        </tr>
        <tr>
          <Col text={LG(lang.ActiveRadio)}>
            <span className="text-lime-500">{ar}</span>
          </Col>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td colSpan={3} className="py-10px px-20px font-size-16px lh-24px">
            {contract?.symbol ?? '-'}
          </td>
        </tr>
        <tr>
          <td colSpan={3} className="py-10px px-20px">
            {!!contract && <RangeChart contract={contract} />}
          </td>
        </tr>
      </tbody>
    </Table>
  );
}

function Col({
  text,
  children,
  className,
}: {
  text: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <td className="w-1/3 py-10px px-20px">
      <div className="relative lh-18px fw-normal">{text}</div>
      <div className="font-size-16px lh-24px fw-medium text-gray-500">{children}</div>
    </td>
  );
}

function SelectTerm({onChange}: {onChange: (v: string) => void}) {
  const [state, setState] = useState(termOptions[1]);
  useEffect(() => {
    onChange?.(state.value);
  }, [state]);
  return (
    <div className="group relative shrink-0">
      <div className="flex shrink-0 flex-row items-center text-gray-600 font-size-14px lh-18px gap-8px cursor-pointer flex-nowrap text-nowrap fw-normal">
        {state?.label ?? ''}
        <i className="block iconfont font-size-12px lh-12px text-gray-600 transform-rotate-90deg group-hover:rotate-[-90deg] group-hover:mt-1px">
          &#xe63c;
        </i>
      </div>
      <div className="hidden group-hover:flex absolute left-8px top-4px pt-16px w-auto z-10 max-w-none overflow-hidden">
        <div className="bg-black rounded-8px">
          <div className="p-12px font-size-14px text-gray-600 flex flex-col gap-16px rounded-8px bg-gray-80 backdrop-blur-24px shadow-lg ring-1 ring-gray-900/5">
            {termOptions?.map((o) => (
              <div
                key={o.label}
                onClick={() => setState(o)}
                className={clsx(
                  'flex-auto text-nowrap font-light hover:text-white cursor-pointer px-8px',
                  [state?.value === o.value && 'text-white']
                )}
              >
                {o.label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const termOptions = [
  {label: '1D Volume', value: '1D'},
  {label: '7D Volume', value: '7D'},
  {label: '30D Volume', value: '30D'},
];
