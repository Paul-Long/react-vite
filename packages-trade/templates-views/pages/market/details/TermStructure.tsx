import {detail$} from '@/pages/market/streams';
import {numUtil} from '@rx/helper/num';
import {useLang} from '@rx/hooks/use-lang';
import {useObservable} from '@rx/hooks/use-observable';
import {useStream} from '@rx/hooks/use-stream';
import {lang} from '@rx/lang/dashboard.lang';
import {lastTrade$} from '@rx/streams/trade/last-trade';
import {Big} from 'big.js';
import {useEffect, useMemo, useRef} from 'react';

export function TermStructure({ready}: {ready: boolean}) {
  const {LG} = useLang();
  const container = useRef(null);
  const chart = useRef<any>();
  const [detail] = useStream(detail$);
  const trade: any = useObservable(lastTrade$, {});

  const data = useMemo(() => {
    const {symbolLevel2Category} = detail;
    return Object.keys(trade || {})
      .filter((k) => k.includes(symbolLevel2Category))
      .reduce((arr: any[], k: string) => {
        if (!trade[k]?.TTM || !trade[k]?.Yield) {
          return arr;
        }
        return [...arr, trade[k]];
      }, [])
      .sort((a, b) => (Number(a.TTM) > Number(b.TTM) ? 1 : -1))
      .map((o: any) => [calcTTM(o.TTM), o.Yield]);
  }, [detail, trade]);

  useEffect(() => {
    if (ready && window.echarts) {
      chart.current = window.echarts.init(container.current);
      const option = {
        grid: {
          left: 50,
          right: 0,
          top: 0,
          bottom: 24,
        },
        tooltip: {
          show: true,
          backgroundColor: 'rgba(255, 255, 255, 0.08)',
          borderColor: 'rgba(255, 255, 255, 0.08)',
          textStyle: {
            color: 'rgba(255, 255, 255, 0.6)',
          },
          formatter: (params: any) => {
            if (params?.[0]) {
              const {value} = params[0];
              return `<span style='color:white'>${Big(value[1]).times(100).toFixed(2)}%</span>`;
            }
            return '';
          },
        },
        axisPointer: {
          show: true,
          snap: true,
          label: {
            show: false,
            color: 'rgba(255, 255, 255, 0.4)',
          },
          lineStyle: {
            color: 'rgba(255, 255, 255, 0.08)',
          },
        },
        xAxis: {
          type: 'category',
          boundaryGap: ['20%', '20%'],
          axisLabel: {
            color: 'rgba(255, 255, 255, 0.4)',
            fontSize: 10,
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: 'rgba(255, 255, 255, 0.08)',
            },
          },
          splitLine: {
            lineStyle: {
              color: 'rgba(255, 255, 255, 0.08)',
            },
          },
        },
        yAxis: {
          type: 'value',
          boundaryGap: [0, '100%'],
          axisLabel: {
            color: 'rgba(255, 255, 255, 0.4)',
            fontSize: 10,
            showMinLabel: false,
            showMaxLabel: false,
            formatter: (value: any) => {
              return Big(value).times(100).toFixed(2) + '%';
            },
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: 'rgba(255, 255, 255, 0.08)',
            },
          },
          splitLine: {
            lineStyle: {
              color: 'rgba(255, 255, 255, 0.08)',
            },
          },
        },
        series: [
          {
            name: 'Price',
            type: 'line',
            itemStyle: {
              color: '#14F195',
            },
            data,
          },
        ],
      };
      chart.current.setOption(option);
      chart.current.resize();
    }
  }, [data, ready]);

  return (
    <div className="flex-[40%] flex flex-col gap-16px">
      <span className="font-size-18px lh-32px">{LG(lang.TermStructure)}</span>
      <div
        ref={container}
        className="h-390px w-full rounded-8px border-1px border-solid border-#FFFFFF14"
      ></div>
    </div>
  );
}

function calcTTM(days: any) {
  if (!days) {
    debugger;
  }
  days = Big(days);
  if (days.gt(Big(365))) {
    return numUtil.trimEnd0(days.div(365).toFixed(2, 0)) + 'Y';
  }
  return numUtil.trimEnd0(days.toFixed(0, 0)) + 'D';
}
