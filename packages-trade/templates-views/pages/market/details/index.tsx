import {PriceChart} from '@/pages/market/details/PriceChart';
import {TermStructure} from '@/pages/market/details/TermStructure';
import {loadEcharts} from '@rx/resource/js';
import {useEffect, useState} from 'react';
import {Infos} from './Infos';

export function Details() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    loadEcharts().then(() => {
      setReady(true);
    });
  }, []);
  return (
    <div className="flex flex-col w-1200px mx-auto gap-40px">
      <Infos />
      <div className="flex flex-row gap-24px">
        <PriceChart ready={ready} />
        <TermStructure ready={ready} />
      </div>
    </div>
  );
}
