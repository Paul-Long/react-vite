import {loadTV} from '@rx/resource/js';
import {useCallback, useEffect, useRef, useState} from 'react';
import {DataType} from './DataType';
import {Resolution} from './Resolution';
import {Widget} from './Widget';
import type {ResolutionString} from './charting_library';
import type {Type} from './types';

export function TradingView(props: {symbol: string}) {
  const {symbol} = props;
  const widget = useRef<Widget>();
  const container = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState<boolean>(false);
  const [interval, setInterval] = useState('5');
  const [dataType, setDataType] = useState<Type>('Price');

  useEffect(() => {
    loadTV().then(() => setReady(true));
  }, []);

  useEffect(() => {
    if (!container.current || !ready) {
      return;
    }
    if (!widget.current) {
      widget.current = new Widget(symbol, '5' as ResolutionString);
    }
    widget.current.render(container.current, dataType);
    return () => {
      widget.current?.dispose();
    };
  }, [ready, dataType]);

  useEffect(() => {
    if (widget.current) {
      widget.current.changeSymbol(symbol);
    }
  }, [symbol]);

  const handleChangeResoluation = useCallback((resoluation: ResolutionString) => {
    if (widget.current) {
      setInterval(resoluation);
      widget.current.changeResolution(resoluation);
    }
  }, []);

  return (
    <div className="w-full border-b-1px border-solid border-#2C2D2D">
      <div ref={container} className="w-full min-h-400px h-400px"></div>
      <div className="flex flex-row justify-between items-center w-full pr-20px">
        <Resolution value={interval} onChange={handleChangeResoluation}></Resolution>
        <DataType value={dataType} onChange={(v: string) => setDataType(v as Type)}></DataType>
      </div>
    </div>
  );
}

const genTimes = () => [
  ['1m', '1'],
  ['5m', '5'],
  ['15m', '15'],
  ['30m', '30'],
  ['1D', '1D'],
  ['1W', '1W'],
  ['1M', '1M'],
  ['1Y', '1Y'],
];
