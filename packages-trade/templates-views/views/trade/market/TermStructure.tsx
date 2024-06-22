import {numUtil} from '@rx/helper/num';
import {useObservable} from '@rx/hooks/use-observable';
import {lastTrade$} from '@rx/streams/trade/last-trade';
import {Big} from 'big.js';
import {useEffect, useMemo, useRef} from 'react';

export function TermStructure({ready, detail}: {ready: boolean; detail: ConfigSymbol}) {
  const container = useRef<HTMLDivElement | null>(null);
  const chart = useRef<any>();
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
          left: 0,
          right: 50,
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
            show: false,
            lineStyle: {
              color: '#2C2D2D7F',
            },
          },
          splitLine: {
            lineStyle: {
              color: '#2C2D2D7F',
            },
          },
        },
        yAxis: {
          type: 'value',
          position: 'right',
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
              color: '#2C2D2D7F',
            },
          },
          splitLine: {
            lineStyle: {
              color: '#2C2D2D7F',
            },
          },
        },
        series: [
          {
            name: 'Price',
            type: 'line',
            itemStyle: {
              color: '#8DCC2F',
            },
            data,
          },
        ],
      };
      chart.current.setOption(option);
      chart.current.resize();
    }
    return () => {
      if (chart.current) {
        chart.current.clear();
        chart.current.dispose();
      }
    };
  }, [data, ready]);

  return (
    <div className="flex flex-col overflow-hidden">
      <div ref={container} className="h-390px w-full mt-[-2px]"></div>
    </div>
  );
}

function calcTTM(days: any) {
  if (!days) {
    return '-';
  }
  days = Big(days);
  if (days.gt(Big(365))) {
    return numUtil.trimEnd0(days.div(365).toFixed(2, 0)) + 'Y';
  }
  return numUtil.trimEnd0(days.toFixed(0, 0)) + 'D';
}
