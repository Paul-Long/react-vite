import {lpApi} from '@rx/api/lp';
import {useObservable} from '@rx/hooks/use-observable';
import {loadEcharts} from '@rx/resource/js';
import {lastTrade$} from '@rx/streams/trade/last-trade';
import {Big} from 'big.js';
import {useEffect, useMemo, useRef, useState} from 'react';

export function RangeChart({contract}: any) {
  const container = useRef(null);
  const chart = useRef<any>();
  const last = useObservable<Record<string, any>>(lastTrade$, {});
  const trade = useMemo(() => last?.[contract?.symbol], [contract, last]);
  const [ready, setReady] = useState(false);
  const [dataList, setDataList] = useState<Record<string, any>[]>([]);

  useEffect(() => {
    loadEcharts().then(() => {
      setReady(true);
    });
  }, []);

  useEffect(() => {
    (async () => {
      const {data} = await lpApi.querySymbolMobility();
      const list = data?.filter((d: any) => d.symbol === contract.symbol);
      setDataList(list);
    })();
  }, [contract]);

  useEffect(() => {
    if (ready && window.echarts) {
      chart.current = window.echarts.init(container.current);

      const xData: number[] = [];
      const xData2: string[] = [];
      const data = dataList.map((d, i) => {
        if (i === 0) {
          xData.push(Big(d.lowerLimit).times(100).minus(1).toNumber());
          xData2.push(Big(d.lowerLimit).times(100).minus(1).toNumber() + '%');
          xData2.push(Big(d.lowerLimit).times(100).minus(0.5).toNumber() + '%');
        }
        xData.push(Big(d.lowerLimit).add(d.upperLimit).div(2).times(100).toNumber());
        xData2.push(Big(d.lowerLimit).times(100).toNumber() + '%');
        xData2.push(Big(d.lowerLimit).add(d.upperLimit).div(2).times(100).toNumber() + '%');
        if (i === dataList.length - 1) {
          xData.push(Big(d.upperLimit).times(100).toNumber());
          xData2.push(Big(d.upperLimit).times(100).toNumber() + '%');
          xData2.push(Big(d.upperLimit).add(0.5).times(100).toNumber() + '%');
        }
        return d.mobility;
      });
      data.unshift(0);
      const option = {
        grid: {
          left: 50,
          right: 50,
          top: 0,
          bottom: 44,
        },
        tooltip: {
          trigger: 'item',
          formatter: (params: any) => {
            if (params?.name) {
              const {name, value, marker} = params;
              const num = Number(name.replace('%', ''));
              return `${marker} ${num - 0.5}-${(num + 0.5).toFixed(1)}% : ${value}`;
            }
            return '';
          },
        },
        axisPointer: {
          show: false,
          snap: true,
          label: {
            show: false,
            color: 'rgba(255, 255, 255, 0.4)',
          },
          lineStyle: {
            color: 'rgba(255, 255, 255, 0.08)',
          },
        },
        xAxis: [
          {
            type: 'category',
            data: xData,
            show: false,
            axisLine: {show: true, lineStyle: {color: '#2C2D2D'}},
            axisTick: {show: true, alignWithLabel: false},
            axisLabel: {show: true, color: '#F6F7F399'},
          },
          {
            type: 'category',
            data: xData2,
            axisLine: {show: true, lineStyle: {color: '#2C2D2D'}},
            position: 'bottom',
            axisTick: {show: true, alignWithLabel: false},
            axisLabel: {align: 'right', interval: 1, color: '#F6F7F399'},
          },
        ],
        yAxis: [
          {
            type: 'value',
            axisLabel: {show: false},
            axisLine: {show: false},
            axisTick: {show: false},
            splitLine: {show: false},
          },
        ],
        series: [
          {
            name: contract.symbol,
            type: 'bar',
            barCategoryGap: 1,
            itemStyle: {
              color: '#8DCC2F',
            },
            data: data,
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
  }, [ready, contract, trade, dataList]);

  return (
    <div className="w-full flex flex-col gap-16px ">
      <div ref={container} className="w-full min-h-390px rounded-8px "></div>
    </div>
  );
}
