import {useContract} from '@/trade/hooks/contract';
import {contractInfo$, lastInfo$} from '@/trade/streams/streams';
import {db} from '@rx/db';
import {useLang} from '@rx/hooks/use-lang';
import {lang as clang} from '@rx/lang/common.lang';
import {lang as tradeLang} from '@rx/lang/trade.lang';
import {Big} from 'big.js';
import {useCallback, useEffect, useState} from 'react';
import {filter} from 'rxjs';

export const useContractInfo = () => {
  const {LG} = useLang();
  const [info, setInfo] = useState<Contract>();
  const [options, setOptions] = useState<any[]>([]);

  useEffect(() => {
    const subscription = contractInfo$.subscribe((c) => setInfo(c as Contract));
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    setOptions(genInfos(LG, info));
  }, [info]);

  return {options};
};

export const useFormState = () => {
  const {contract, maturity} = useContract();
  const [formData, setFormData] = useState<any>({
    margin: 'CrossMargin',
    direction: 'Long',
    orderType: 'Market',
    qtyType: 'Yield',
    size: 1,
    leverage: 150,
    marginCost: 0,
  });

  const updateForm = useCallback(
    (name: string, value: any) => {
      const form = {[name]: value};
      if (name === 'size') {
        const mc: any = marginMap?.[`${contract}-${maturity}`];
        if (mc) {
          form.marginCost = Big(value > 0 ? value : 1)
            .times(mc)
            .toNumber();
        }
      }
      setFormData((base: any) => {
        return {...base, ...form};
      });
    },
    [formData, contract, maturity]
  );

  useEffect(() => {
    if (contract && maturity) {
      updateForm('marginCross', `${contract}-${maturity}`);
      updateForm('marginCost', marginMap[`${contract}-${maturity}`]);
      updateForm('entryPrice',entryPriceMap[`${contract}-${maturity}`]);
      updateForm('liqPrice', liqPriceMap[`${contract}-${maturity}`]);
      updateForm('marketPrice', marketPriceMap[`${contract}-${maturity}`]);
      updateForm('netValue', netValueMap[`${contract}-${maturity}`]);
    }
  }, [contract, maturity]);

  useEffect(() => {
    const subscription = lastInfo$.pipe(filter(Boolean)).subscribe((info: any) => {
      updateForm('maxLeverage', info.leverageSlider ?? 200);
      updateForm('leverage', info.leverageSlider ?? 200);
      updateForm(
        'initialMarginRate',
        Big(info?.initialMarginRate ?? 0.3)
          .round(4)
          .toNumber()
      );
      updateForm('maintenanceMarginRate', info?.initialMarginRate);
      updateForm(
        'referenceApr',
        Big(info?.referenceApr ?? 0.0021)
          .times(100)
          .round(3)
          .toNumber() + '%'
      );
      updateForm(
        'yield',
        Big(info?.yield ?? 0.001)
          .times(100)
          .round(3)
          .toNumber() + '%'
      );
    });
    return () => subscription.unsubscribe();
  }, []);

  const handleSubmit = useCallback(async () => {
    const {...tmp} = formData;
    await db.positions.add(tmp);
  }, [formData]);

  return {formData, updateForm, handleSubmit};
};

export const genMarginOptions = (LG: Function) => [
  {text: LG(tradeLang.CrossMargin), value: 'CrossMargin'},
  {text: LG(tradeLang.IsolatedMargin), value: 'IsolatedMargin'},
];

export const genDirections = (LG: Function) => [
  {text: LG(tradeLang.LongYieldFloater), value: 'Long'},
  {text: LG(tradeLang.ShortYieldFixer), value: 'Short'},
];

export const genOrderTypes = (LG: Function) => [
  {text: LG(tradeLang.Market), key: 'Market'},
  {text: LG(tradeLang.Limit), key: 'Limit'},
  {text: LG(tradeLang.StopMarket), key: 'StopMarket'},
  {text: LG(clang.TP) + '/' + LG(clang.SL), key: 'StopLimit'},
];

export const genInfos = (LG: Function, info?: Record<string, any>) => [
  {
    text: LG(tradeLang.EstimatedEntryYield),
    value: info?.estEntryYield
      ? Big(info?.estEntryYield).times(100).round(2).toNumber() + '%'
      : '--',
  },
  {
    text: LG(tradeLang.EstimatedTokenPrice),
    value: info?.estEntryPrice ? Big(info?.estEntryPrice).round(4).toNumber() : '--',
  },
  {
    text: LG(tradeLang.YieldImpact),
    value: info?.yieldImpact ? Big(info?.yieldImpact).times(100).round(2).toNumber() + '%' : '--',
  },
  {
    text: LG(tradeLang.LiquidationYield),
    value: info?.liqPrice ? Big(info?.liqPrice).times(100).round(2).toNumber() + '%' : '--',
  },
];

export const genTradingInfos = (LG: Function) => [
  {text: LG(tradeLang.TradingFees), value: '0.01'},
  {text: LG(tradeLang.EstimatedGas), value: ''},
];

export const marginMap: Record<string, any> = {
  'StETH-20251231': 0.0132,
  'StETH-20241231': 0.00911867,
  'StETH-20250630': 0.01121163,
  'MSol-20250630': 0.010147,
};

export const entryPriceMap: any = {
  'StETH-20251231': 0.111647,
  'StETH-20241231': 0.07557973,
  'StETH-20250630': 0.09032433,
  'MSol-20250630': 0.17163161,
};

export const liqPriceMap: any = {
  'StETH-20251231': 0.109591,
  'StETH-20241231': 0.07370371,
  'StETH-20250630': 0.08837495,
  'MSol-20250630': 0.16927772,
};

export const marketPriceMap: any = {
  'StETH-20251231': 0.111091,
  'StETH-20241231': 0.07520371,
  'StETH-20250630': 0.08987495,
  'MSol-20250630': 0.17077772,
};

export const netValueMap: any = {
  'StETH-20251231': 0.111091,
  'StETH-20241231': 0.07520371,
  'StETH-20250630': 0.08987495,
  'MSol-20250630': 0.17077772,
};
