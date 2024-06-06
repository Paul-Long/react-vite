import {useObservable} from '@rx/hooks/use-observable';
import {loadEcharts} from '@rx/resource/js';
import {lastTrade$} from '@rx/streams/trade/last-trade';
import {Big} from 'big.js';
import {useEffect, useMemo, useRef, useState} from 'react';

export function Chart({contract}: any) {
  const container = useRef(null);
  const chart = useRef<any>();
  const last = useObservable<Record<string, any>>(lastTrade$, {});
  const trade = useMemo(() => last?.[contract?.symbol], [contract, last]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    loadEcharts().then(() => {
      setReady(true);
    });
  }, []);

  useEffect(() => {
    if (ready && window.echarts) {
      chart.current = window.echarts.init(container.current);
      let data = [0.0, 0.5, 0.5, 1.5, 6.0, 7.0, 4.5, 1.0, 0.5, 0.5, 0.0, 0.0, 0.0];

      const xData = [];
      if (trade?.Yield) {
        const sum = data.reduce((sum, d) => Big(sum).add(d), Big(0));
        data = data.map((n) => {
          return Big(trade?.AvaLiquidity ?? 0)
            .times(n)
            .div(sum)
            .round(2, 3)
            .toNumber();
        });
        const y = Big(trade.Yield).div(0.005).round(0, 0).times(0.005);
        for (let i = -6; i < 7; i++) {
          xData.push(
            y
              .add(i * 0.005)
              .times(100)
              .round(2, 0)
              .toString() + '%'
          );
        }
      }

      const option = {
        grid: {
          left: 50,
          right: 50,
          top: 0,
          bottom: 24,
        },
        tooltip: {
          trigger: 'item',
          formatter: (params: any) => {
            if (params?.name) {
              const {name, value, marker} = params;
              const num = Number(name.replace('%', ''));
              return `${marker} ${name}-${(num + 0.5).toFixed(1)}% : ${value}`;
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
        xAxis: [
          {
            type: 'category',
            data: xData,
            axisLine: {show: true},
            axisTick: {show: true, alignWithLabel: false},
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
              color: '#14F195',
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
  }, [ready, contract, trade]);

  return (
    <div className="w-full h-full flex flex-col gap-16px">
      <span className="font-size-18px lh-32px text-gray-600">{contract.symbol}</span>
      <div ref={container} className="h-full w-full rounded-8px "></div>
    </div>
  );
}

function distributeTotalNumber(total: number, sections: number) {
  let randomNumbers = Array.from({length: sections}, () => Math.random());
  let midIndex = (sections - 1) / 2;
  let weightedNumbers = randomNumbers.map((num, index) => {
    let distance = Math.abs(index - midIndex);
    let weight = 1 - distance / midIndex;
    return num * weight;
  });

  let weightedSum = weightedNumbers.reduce((sum, num) => sum + num, 0);
  let normalizedNumbers = weightedNumbers.map((num) => (num / weightedSum) * total);
  let normalizedSum = normalizedNumbers.reduce((sum, num) => sum + num, 0);
  let discrepancy = total - normalizedSum;
  normalizedNumbers[sections - 1] += discrepancy;

  return normalizedNumbers;
}
