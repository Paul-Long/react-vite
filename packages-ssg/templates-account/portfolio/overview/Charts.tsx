import {useChart} from '@rx/hooks/use-chart';
import {useLang} from '@rx/hooks/use-lang';
import {lang} from '@rx/lang/account.lang';
import React, {useEffect} from 'react';

export function Charts() {
  const {LG} = useLang();
  const {chart, container, loaded} = useChart({});

  useEffect(() => {
    if (chart.current) {
      chart.current.setOption({
        title: {show: false},
        xAxis: {
          type: 'category',
          show: false,
          data: [
            '2024-02-20',
            '2024-02-21',
            '2024-02-22',
            '2024-02-23',
            '2024-02-24',
            '2024-02-25',
          ],
        },
        yAxis: [
          {type: 'value', show: false, min: 0, max: 6},
          {type: 'value', show: false, min: 0, max: 7},
        ],
        color: ['#E8BC31', '#27F2A9'],
        grid: {left: 0, top: 0, right: 0, bottom: 0},
        tooltip: {
          trigger: 'axis',
        },
        series: [
          {
            type: 'line',
            name: LG(lang.TotalBalance),
            data: [1, 3, 4, 2, 5, 2],
          },
          {
            type: 'line',
            name: LG(lang.TodayPNL),
            yAxisIndex: 1,
            data: [3, 2, 1, 6, 4, 3],
          },
        ],
      });
    }
  }, [chart.current]);

  return <div className="flex-1" ref={container} />;
}
