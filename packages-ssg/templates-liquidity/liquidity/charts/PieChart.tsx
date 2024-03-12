import {useChart} from '@/liquidity/charts/hooks';
import {select$} from '@/liquidity/stream/streams';
import {useStream} from '@rx/hooks/use-stream';
import React, {useEffect} from 'react';

export function PieChart() {
  const {chart, container, loaded} = useChart();
  const [select] = useStream(select$);

  useEffect(() => {
    window.addEventListener('resize', () => {
      chart?.current?.resize();
    });
  }, []);

  useEffect(() => {
    if (chart.current) {
      chart.current.setOption({
        title: {
          text: select,
          left: 12,
          top: 12,
          textStyle: {
            color: '#B7BDC6',
          },
        },
        color: ['#376DF7', '#53B997', '#6750AA', '#F8C541', '#294680'],
        tooltip: {
          trigger: 'item',
        },
        legend: {
          orient: 'vertical',
          right: 12,
          top: 'middle',
          textStyle: {
            color: 'rgba(255, 255, 255, 0.65)',
          },
        },
        series: [
          {
            type: 'pie',
            name: select,
            radius: ['30%', '50%'],
            center: ['30%', '50%'],
            label: {
              position: 'inner',
              show: true,
              formatter: `{c}%`,
              backgroundColor: '#E8F3FF',
              borderRadius: 2,
              color: '#001E3D',
              width: 40,
              height: 20,
              shadowColor: '0px 4px 16px 0px rgba(0,30,61,0.54)',
            },
            labelLine: {
              show: false,
            },
            data: data[select] ?? [],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)',
              },
            },
          },
        ],
      });
    }
  }, [chart.current, select]);

  return (
    <div
      className="flex-1 w100% box-border border-rd-6px"
      style={{background: '#00162A', border: '1px solid #333333'}}
    >
      <div className="w100% h300px" ref={container} />
    </div>
  );
}

const data: any = {
  'RLP-mSOL': [
    {name: 'mSOL-2403', value: 16},
    {name: 'mSOL-2406', value: 16},
    {name: 'mSOL-2412', value: 24},
    {name: 'mSOL-2506', value: 22},
    {name: 'mSOL-2512', value: 22},
  ],
  'RLP-JitoSOL': [
    {name: 'JitoSOL-2403', value: 16},
    {name: 'JitoSOL-2406', value: 16},
    {name: 'JitoSOL-2412', value: 24},
    {name: 'JitoSOL-2506', value: 22},
    {name: 'JitoSOL-2512', value: 22},
  ],
};
