import {Filters} from '@/pages/lp/Filters';
import {SpecificPool} from '@/pages/lp/SpecificPool';
import {UniversalPool} from '@/pages/lp/UniversalPool';
import {queryReferencePrice$} from '@rx/streams/market/reference-price';
import {referencePrice$} from '@rx/streams/subscription/reference-price';
import {useEffect} from 'react';

export default function () {
  useEffect(() => {
    queryReferencePrice$.next(0);
    referencePrice$.next('dc.aps.referenceprice');
  }, []);
  return (
    <div className="flex flex-col w-1200px mx-auto">
      <Filters />
      <UniversalPool />
      <SpecificPool />
    </div>
  );
}
