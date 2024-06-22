import {useObservable} from '@rx/hooks/use-observable';
import {kline$} from '@rx/streams/subscription/kline';
import {clear$, kLine$, queryKLine$} from '@rx/streams/trade/kline';
import dayjs from 'dayjs';
import {useEffect, useRef} from 'react';

export function PriceChart({ready, detail}: {ready: boolean; detail: ConfigSymbol}) {
  const container = useRef<HTMLDivElement | null>(null);
  const chart = useRef<any>();
  const klineData = useObservable(kLine$, []);

  useEffect(() => {
    const {symbol} = detail || {};
    if (symbol) {
      queryKLine$.next({
        securityID: symbol,
        text: '1D',
      });
      kline$.next(`dc.md.kline.1D.${symbol}`);
    }
    return () => {
      clear$.next(0);
      chart.current.dispose();
    };
  }, [detail]);

  useEffect(() => {
    if (ready && window.echarts) {
      chart.current = window.echarts.init(container.current);
      const date = [];
      const data = [];
      for (let i = 0; i < klineData?.length; i++) {
        const item: any = klineData[i];
        if (!!item.close) {
          date.push(item.time * 1000);
          data.push(item.close);
        }
      }
      const option = {
        grid: {
          left: 0,
          right: 50,
          top: 0,
          bottom: 24,
        },
        tooltip: {
          trigger: 'item',
          show: true,
          backgroundColor: 'rgba(255, 255, 255, 0.08)',
          borderColor: 'rgba(255, 255, 255, 0.08)',
          textStyle: {
            color: 'rgba(255, 255, 255, 0.6)',
          },
          formatter: (params: any) => {
            if (params?.[0]) {
              const {axisValue, value} = params[0];
              return `<span style='color:white'>${value}</span> </br><span style='color:rgba(255, 255, 255, 0.6)'>${dayjs(
                Number(axisValue)
              ).format('YYYY-MM-DD')}</span>`;
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
          boundaryGap: false,
          data: date,
          axisLabel: {
            color: 'rgba(255, 255, 255, 0.4)',
            fontSize: 10,
            showMaxLabel: false,
            formatter: (value: any) => {
              return dayjs(Number(value)).format('YYYY-MM-DD');
            },
          },
          axisLine: {
            show: false,
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
          scale: true,
          position: 'right',
          boundaryGap: ['20%', '20%'],
          axisLabel: {
            color: 'rgba(255, 255, 255, 0.4)',
            fontSize: 10,
            showMaxLabel: false,
            showMinLabel: false,
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
            areaStyle: {
              color: new window.echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {offset: 0, color: 'rgba(141, 204, 47, 0.5)'},
                {offset: 1, color: 'rgba(141, 204, 47, 0.0)'},
              ]),
            },
            data,
          },
        ],
      };
      chart.current.setOption(option, true);
      chart.current.resize();
    }
    return () => {
      if (chart.current) {
        chart.current.clear();
        chart.current.dispose();
        chart.current = null;
      }
    };
  }, [klineData, ready]);
  return (
    <div className="w-full flex flex-col overflow-hidden">
      <div ref={container} className="h-390px w-full mt-[-2px]"></div>
    </div>
  );
}
