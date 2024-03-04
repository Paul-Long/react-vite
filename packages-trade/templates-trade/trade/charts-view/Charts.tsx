import {genChartTypes, useChartData} from '@/trade/charts-view/state';
import {StyledCharts, StyledChartsContainer} from '@/trade/charts-view/styles';
import {RadioButtonGroup} from '@/trade/components/radio-button/RadioButtonGroup';
import {contractInfo$, resize$} from '@/trade/streams/streams';
import {numUtil} from '@rx/helper/num';
import {timeUtil} from '@rx/helper/time';
import {useLang} from '@rx/hooks/use-lang';
import {useLoadJs} from '@rx/hooks/use-load-js';
import {lang as tradeLang} from '@rx/lang/trade.lang';
import {loadEcharts} from '@rx/resource/js';
import React, {Key, useCallback, useEffect, useRef, useState} from 'react';

export function Charts() {
  const ref = useRef();
  const chart = useRef<any>();
  const {LG} = useLang();
  const {data} = useChartData();
  const [loaded, setLoaded] = useState(false);
  const [type, setType] = useState<Key>('Line');
  const [dataIndex, setDataIndex] = useState<number>(-1);
  const [option, setOption] = useState<any>({});

  useEffect(() => {
    window?.addEventListener('resize', resize);
    const subscription = resize$.subscribe(() => resize());
    return function () {
      window?.removeEventListener('resize', resize);
      subscription?.unsubscribe();
    };
  }, []);

  const resize = useCallback(() => {
    if (chart?.current) {
      chart?.current?.resize();
    }
  }, [option]);

  useLoadJs(() => {
    if (!chart.current) {
      chart.current = window?.echarts?.init(ref?.current);
      chart.current.on('showTip', (p: any) => setDataIndex(p.dataIndex));
      chart.current.on('hideTip', (p: any) => setDataIndex(-1));
    }
    setLoaded(true);
  }, [loadEcharts, [data]]);

  useEffect(() => {
    const len = data?.length;
    contractInfo$.next(data[dataIndex > -1 ? dataIndex : len - 1]);
  }, [data, dataIndex]);

  useEffect(() => {
    if (!loaded) {
      return;
    }
    chart.current.setOption(option);
  }, [loaded, option]);

  useEffect(() => {
    const ytd = [];
    const yd = [];
    for (let i = 0; i < data?.length; i++) {
      const row: any = data[i];
      ytd.push([timeUtil.formatDate(row.time), numUtil.floor(row.cumulativeYt, 4)]);
      yd.push([timeUtil.formatDate(row.time), numUtil.floor(row.yield, 4)]);
    }
    const option: any = {
      title: {show: false},
      xAxis: {type: 'category', show: false},
      yAxis: [
        {type: 'value', show: false, min: (value: any) => value.min * 0.9},
        {type: 'value', show: false, min: (value: any) => value.min * 0.9},
      ],
      color: ['#E8BC31', '#27F2A9'],
      grid: {left: 0, top: 0, right: 0, bottom: 0},
      dataZoom: [
        {
          type: 'inside',
          start: 90,
          end: 100,
        },
        {
          start: 90,
          end: 100,
        },
      ],
      tooltip: {
        trigger: 'axis',
      },
      series: [
        {
          type: 'line',
          name: LG(tradeLang.YT),
          data: ytd,
        },
        {
          type: 'line',
          name: LG(tradeLang.Yield),
          yAxisIndex: 1,
          data: yd,
        },
      ],
    };
    setOption(option);
  }, [data]);

  return (
    <StyledCharts className="position-relative df fdc f1 pt-68px h100% max-w100%" onResize={resize}>
      <div className="pa left-24px top-20px">
        <RadioButtonGroup options={genChartTypes(LG)} value={type} onChange={(v) => setType(v)} />
      </div>
      <StyledChartsContainer ref={ref as any} className="f1" />
    </StyledCharts>
  );
}
