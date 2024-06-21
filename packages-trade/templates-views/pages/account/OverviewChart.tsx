import {accountApi} from '@rx/api/account';
import {loadEcharts} from '@rx/resource/js';
import {Big} from 'big.js';
import {useEffect, useRef, useState} from 'react';

export function OverviewChart() {
  const [ready, setReady] = useState(false);
  const container = useRef(null);
  const chart = useRef<any>();
  const [baseData, setBaseData] = useState<Record<string, any>[]>([]);

  useEffect(() => {
    loadEcharts().then(() => {
      setReady(true);
    });
  }, []);

  useEffect(() => {
    (async () => {
      const {data} = await accountApi.queryUsersTotalBalance();
      setBaseData(data);
    })();
  }, []);

  useEffect(() => {
    if (ready && window.echarts) {
      chart.current = window.echarts.init(container.current);
      const date: string[] = [];
      const realizedPnl: string[] = [];
      const totalBalance: string[] = [];
      for (let i = 0; i < baseData.length; i++) {
        const item = baseData[i];
        date.push(item.tradeDate);
        realizedPnl.push(Big(item.realizedPnl).toFixed(9));
        totalBalance.push(Big(item.totalBalance).toFixed(9));
      }
      console.log(realizedPnl, totalBalance);
      const option = {
        grid: {
          left: 50,
          right: 0,
          top: 0,
          bottom: 24,
        },
        tooltip: {
          trigger: 'axis',
          show: true,
          backgroundColor: 'rgba(255, 255, 255, 0.08)',
          borderColor: 'rgba(255, 255, 255, 0.08)',
          textStyle: {
            color: 'rgba(255, 255, 255, 0.6)',
          },
          lineStyle: {
            color: 'rgba(255, 255, 255, 0.08)',
          },
          valueFormatter: (v: string) => Big(v).toFixed(9),
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: date,
          axisLabel: {
            color: 'rgba(255, 255, 255, 0.4)',
            fontSize: 10,
            showMaxLabel: false,
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
        yAxis: [
          {
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
          {
            type: 'value',
            scale: true,
            boundaryGap: ['20%', '20%'],
            axisLabel: {
              show: false,
              color: 'rgba(255, 255, 255, 0.4)',
              fontSize: 10,
              showMaxLabel: false,
              showMinLabel: false,
            },
            axisLine: {
              show: false,
              lineStyle: {
                color: 'rgba(255, 255, 255, 0.08)',
              },
            },
            splitLine: {
              show: false,
              lineStyle: {
                color: 'rgba(255, 255, 255, 0.08)',
              },
            },
          },
        ],
        series: [
          {
            name: 'Realized PNL',
            type: 'line',
            itemStyle: {
              color: '#14F195',
            },
            yAxisIndex: 1,
            data: realizedPnl,
          },
          {
            name: 'Total Balance',
            type: 'line',
            itemStyle: {
              color: '#F0B92D',
            },
            yAxisIndex: 0,
            data: totalBalance,
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
  }, [baseData, ready]);
  return (
    <div className="flex-[60%] flex flex-col gap-16px">
      <div
        ref={container}
        className="h-390px w-full rounded-8px border-1px border-solid border-#FFFFFF14"
      ></div>
    </div>
  );
}
