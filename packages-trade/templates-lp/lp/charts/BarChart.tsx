import {useChart} from '@/lp/charts/hooks';
import {select$} from '@/lp/stream/streams';
import {useStream} from '@rx/hooks/use-stream';
import {useEffect} from 'react';

export function BarChart() {
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
        color: ['#3BFFB9', '#53B997', '#6750AA', '#F8C541', '#294680'],
        tooltip: {
          trigger: 'item',
          formatter: (params: any) => {
            if (params) {
              const {name, value, marker} = params;
              const num = Number(name.replace('%', ''));
              return `${marker} ${name}-${(num + 0.5).toFixed(1)}% : ${value}`;
            }
            return '';
          },
        },
        grid: {left: 10, right: 10, bottom: 20},
        xAxis: [
          {
            type: 'category',
            data: [
              '4.0%',
              '4.5%',
              '5.0%',
              '5.5%',
              '6.0%',
              '6.5%',
              '7.0%',
              '7.5%',
              '8.0%',
              '8.5%',
              '9.0%',
              '9.5%',
              '10.0%',
            ],
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
            type: 'bar',
            name: select,
            barCategoryGap: 0,
            data: data[select] ?? [],
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
      <div className="w100% h300px" ref={container} style={{marginBottom: -16}} />
    </div>
  );
}

const data: any = {
  'mSOL-2403': [0.0, 0.0, 0.0, 0.5, 1.0, 7.0, 8.0, 2.0, 1.0, 0.5, 0.0, 0.0, 0.0],
  'mSOL-2406': [0.0, 0.0, 0.5, 0.5, 1.5, 7.0, 7.0, 1.5, 1.0, 0.5, 0.5, 0.0, 0.0],
  'mSOL-2412': [0.0, 0.0, 0.5, 1.0, 1.5, 14.0, 1.5, 1.0, 0.5, 0.0, 0.0, 0.0, 0.0],
  'mSOL-2506': [0.0, 0.5, 0.5, 1.5, 7.0, 7.0, 1.5, 1.0, 0.5, 0.5, 0.0, 0.0, 0.0],
  'mSOL-2512': [0.0, 0.5, 1.0, 1.5, 14.0, 1.5, 1.0, 0.5, 0.0, 0.0, 0.0, 0.0, 0.0],
  'JitoSOL-2403': [0.0, 0.0, 0.0, 0.5, 1.0, 1.5, 14.0, 1.5, 1.0, 0.5, 0.0, 0.0, 0.0],
  'JitoSOL-2406': [0.0, 0.0, 0.0, 0.5, 1.0, 1.5, 14.0, 1.5, 1.0, 0.5, 0.0, 0.0, 0.0],
  'JitoSOL-2412': [0.0, 0.0, 0.0, 0.5, 1.0, 8.0, 7.0, 2.0, 1.0, 0.5, 0.0, 0.0, 0.0],
  'JitoSOL-2506': [0.0, 0.0, 0.5, 1.0, 1.5, 14.0, 1.5, 1.0, 0.5, 0.0, 0.0, 0.0, 0.0],
  'JitoSOL-2512': [0.0, 0.0, 0.5, 1.0, 7.0, 8.0, 2.0, 1.0, 0.5, 0.0, 0.0, 0.0, 0.0],
};
