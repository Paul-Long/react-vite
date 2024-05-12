import {useStream} from '@rx/hooks/use-stream';
import {kline$} from '@rx/streams/subscription/kline';
import {queryKLine$} from '@rx/streams/trade/kline';
import {useEffect} from 'react';
import {contract$, maturity$, time$} from '../streams/streams';

export function useKlineData() {
  const [contract] = useStream(contract$);
  const [maturity] = useStream(maturity$);
  const [time] = useStream(time$);

  useEffect(() => {
    if (contract && maturity && time) {
      queryKLine$.next({securityID: [contract, maturity].join('-'), text: time});
      kline$.next(`dc.md.kline.1M.${[contract, maturity].join('-')}`);
    }
  }, [contract, maturity, time]);
}
