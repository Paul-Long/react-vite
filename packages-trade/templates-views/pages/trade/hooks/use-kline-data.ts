import {useStream} from '@rx/hooks/use-stream';
import {kline$} from '@rx/streams/subscription/kline';
import {queryKLine$} from '@rx/streams/trade/kline';
import {useEffect} from 'react';
import {chartType$, contract$, maturity$, time$} from '../streams/streams';

export function useKlineData() {
  const [contract] = useStream(contract$);
  const [maturity] = useStream(maturity$);
  const [time] = useStream(time$);
  const [type] = useStream(chartType$);

  useEffect(() => {
    if (contract && maturity && time) {
      queryKLine$.next({
        securityID: [contract, maturity].join('-') + (type === 'yield' ? '_yield' : ''),
        text: time,
        type: 'price',
      });
      kline$.next(
        `dc.md.kline.${time}.${[contract, maturity].join('-')}${type === 'yield' ? '_yield' : ''}`
      );
    }
  }, [contract, maturity, time, type]);
}
