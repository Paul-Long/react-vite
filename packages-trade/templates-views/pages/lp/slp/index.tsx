import {IMAGES} from '@/pages/lp/const';
import {PlaceOrder} from '@/pages/lp/slp/PlaceOrder';
import {Reference} from '@/pages/lp/slp/Reference';
import {useFixLink} from '@rx/hooks/use-fix-link';
import {useLang} from '@rx/hooks/use-lang';
import {useObservable} from '@rx/hooks/use-observable';
import {lang} from '@rx/lang/lp.lang';
import {contracts$} from '@rx/streams/config';
import {ttmMap$} from '@rx/streams/epoch';
import {queryReferencePrice$} from '@rx/streams/market/reference-price';
import {referencePrice$} from '@rx/streams/subscription/reference-price';
import {Button} from '@rx/widgets';
import {clsx} from 'clsx';
import {useEffect, useMemo, useState} from 'react';
import {useNavigate, useSearchParams} from 'react-router-dom';

export default function () {
  const {LG} = useLang();
  const {fixLink} = useFixLink();
  const navigate = useNavigate();
  const [select, setSelect] = useState('Detail');
  const {contract} = useData();

  useEffect(() => {
    queryReferencePrice$.next(0);
    referencePrice$.next('dc.aps.referenceprice');
  }, []);

  return (
    <div className="flex flex-col w-1200px mx-auto">
      <div className="flex flex-row items-center mt-50px gap-24px">
        <div
          className="flex justify-center items-center w-32px h-32px bg-gray-80 rounded-4px cursor-pointer"
          onClick={() => navigate(fixLink('/lp'))}
        >
          <i className="iconfont font-size-24px lh-24px rotate-180">&#xe63c;</i>
        </div>
        <div className="flex flex-row items-center gap-8px">
          <img src={IMAGES.MSOL} alt="" width={28} height={28} />
          <span className="font-size-32px lh-20px">{contract?.symbol ?? '-'}</span>
        </div>
      </div>
      <div className="w-full pl-56px flex flex-col gap-24px pt-24px">
        <Reference symbol="mSOL" />
        <div className="flex flex-row items-center mt-24px gap-8px">
          <Button
            className={clsx([select === 'Detail' && 'text-gray-600'])}
            type="default"
            onClick={() => setSelect('Detail')}
            selected={select === 'Detail'}
          >
            <span className={clsx([select !== 'Detail' && 'text-gray-600'])}>
              {LG(lang.Detail)}
            </span>
          </Button>
          <Button
            type="default"
            onClick={() => setSelect('LiveLPPosition')}
            selected={select === 'LiveLPPosition'}
          >
            <span className={clsx([select !== 'LiveLPPosition' && 'text-gray-600'])}>
              {LG(lang.LiveLPPosition)}
            </span>
          </Button>
          <Button
            className={clsx([select === 'ResidualLPPosition' && 'text-gray-600'])}
            type="default"
            onClick={() => setSelect('ResidualLPPosition')}
            selected={select === 'ResidualLPPosition'}
          >
            <span className={clsx([select !== 'ResidualLPPosition' && 'text-gray-600'])}>
              {LG(lang.ResidualLPPosition)}
            </span>
          </Button>
        </div>
        <PlaceOrder contract={contract as any} />
      </div>
    </div>
  );
}

function useData() {
  const contracts = useObservable(contracts$, []);
  const ttmMap: any = useObservable(ttmMap$, {});
  const [search] = useSearchParams();

  const contract = useMemo(() => {
    const symbol: any = search.get('symbol');
    const contract = contracts.find((c) => c.symbol === symbol);
    const data: any = {...(contract || {})};
    if (contract) {
      const key = [
        contract.symbolLevel1Category,
        contract.symbolLevel2Category,
        contract.term,
      ].join('_');
      data.maturity = ttmMap?.[key]?.days;
      data.maturityStr = ttmMap?.[key].ttm + ttmMap?.[key].unit;
    }
    console.log('ttm map : ', ttmMap);
    return data;
  }, [search, contracts, ttmMap]);
  return {contract};
}