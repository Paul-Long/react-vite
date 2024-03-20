import type {IChartApi} from 'lightweight-charts';
import {ColorType, createChart, CrosshairMode} from 'lightweight-charts';
import {useCallback, useEffect, useRef, useState} from 'react';

interface Options {
  timeScale?: any;
  rightPriceScale?: any;
  leftPriceScale?: any;
  layout_background?: any;
  crosshair?: any;
}

export function useChart(options?: Options) {
  const {
    timeScale = {},
    rightPriceScale = {},
    leftPriceScale = {},
    layout_background = {},
    crosshair = {},
  } = options || {};
  const chart = useRef<IChartApi>();
  const container = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    window.addEventListener('resize', resize);
    return function () {
      window.removeEventListener('resize', resize);
    };
  }, []);

  useEffect(() => {
    if (!chart?.current && container?.current) {
      chart.current = createChart(container?.current, {
        rightPriceScale: {
          visible: false,
          borderColor: 'rgba(197, 203, 206, 0.2)',
          ...rightPriceScale,
        },
        leftPriceScale: {
          visible: true,
          borderColor: 'rgba(197, 203, 206, 0.2)',
          ...leftPriceScale,
        },
        layout: {
          textColor: 'white',
          background: {type: ColorType.Solid, color: 'rgb(0, 15, 29)', ...layout_background},
        },
        grid: {
          horzLines: {
            color: 'rgba(197, 203, 206, 0.2)',
          },
          vertLines: {
            color: 'rgba(197, 203, 206, 0.2)',
          },
        },
        crosshair: {
          mode: CrosshairMode.Normal,
          ...crosshair,
        },
        timeScale: {
          visible: true,
          borderColor: 'rgba(197, 203, 206, 0.2)',
          ...timeScale,
        },
        handleScroll: {
          vertTouchDrag: false,
        },
      });
      setLoaded(true);
      setTimeout(() => resize(), 100);
    }
  }, [container?.current]);

  const resize = useCallback(() => {
    if (container.current && chart.current) {
      const newWidth: number = container.current.clientWidth;
      const newHeight: number = container.current.clientHeight;
      chart.current?.resize(newWidth, newHeight);
    }
  }, []);

  return {container, chart, loaded, resize};
}
