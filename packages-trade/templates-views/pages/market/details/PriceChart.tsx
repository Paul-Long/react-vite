import {detail$} from '@/pages/market/streams';
import {useLang} from '@rx/hooks/use-lang';
import {useObservable} from '@rx/hooks/use-observable';
import {useStream} from '@rx/hooks/use-stream';
import {lang} from '@rx/lang/dashboard.lang';
import {kline$} from '@rx/streams/subscription/kline';
import {clear$, kLine$, queryKLine$} from '@rx/streams/trade/kline';
import dayjs from 'dayjs';
import {useEffect, useRef} from 'react';

export function PriceChart({ready}: {ready: boolean}) {
  const {LG} = useLang();
  const container = useRef(null);
  const chart = useRef<any>();
  const [detail] = useStream(detail$);
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
          left: 50,
          right: 0,
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
              return dayjs(value).format('MM-DD');
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
        yAxis: {
          type: 'value',
          scale: true,
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
            areaStyle: {
              color: new window.echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {offset: 0, color: 'rgba(20, 241, 149, 0.5)'},
                {offset: 1, color: 'rgba(20, 241, 149, 0.0)'},
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
    <div className="flex-[60%] flex flex-col gap-16px">
      <span className="font-size-18px lh-32px">{LG(lang.PriceChart)}</span>
      <div
        ref={container}
        className="h-390px w-full rounded-8px border-1px border-solid border-#FFFFFF14"
      ></div>
    </div>
  );
}
