import {select$} from '@/market/stream/streams';
import {timeUtil} from '@rx/helper/time';
import {useEffect, useState} from 'react';

export function useData() {
  const [select, setSelect] = useState<string>('mSOL-2403');
  const [data, setData] = useState([]);

  useEffect(() => {
    const subscription = select$.subscribe(async (s) => {
      setSelect(s);
      const d = await mock[s]?.();
      const newData = (d?.default ?? []).map((d: any) => ({
        time: timeUtil.formatDate(new Date(d.time).getTime()),
        value: d.value,
      }));
      setData(newData);
    });
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return {data, select};
}

const mock: any = {
  'mSOL-2403': () => import('../mock/price/mSOL-2403.json'),
  'mSOL-2406': () => import('../mock/price/mSOL-2406.json'),
  'mSOL-2412': () => import('../mock/price/mSOL-2412.json'),
  'mSOL-2506': () => import('../mock/price/mSOL-2506.json'),
  'mSOL-2512': () => import('../mock/price/mSOL-2512.json'),
  'JitoSOL-2403': () => import('../mock/price/JitoSOL-2403.json'),
  'JitoSOL-2406': () => import('../mock/price/JitoSOL-2406.json'),
  'JitoSOL-2412': () => import('../mock/price/JitoSOL-2412.json'),
  'JitoSOL-2506': () => import('../mock/price/JitoSOL-2506.json'),
  'JitoSOL-2512': () => import('../mock/price/JitoSOL-2512.json'),
};
