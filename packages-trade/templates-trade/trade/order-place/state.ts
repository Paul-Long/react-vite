import {useContract} from '@/trade/hooks/contract';
import {db} from '@rx/db';
import {useCallback, useEffect, useState} from 'react';

export const useFormState = () => {
  const {contract, maturity} = useContract();
  const [formData, setFormData] = useState<any>({
    marginType: 'Cross',
    direction: 'Long',
    mode: 'YT',
    orderType: 'Market',
    maxLeverage: 10,
    leverage: 5,
    ...(dataMap?.[`YT-Long`] || {}),
  });

  useEffect(() => {
    const mc: any = dataMap?.[`${formData.mode}-${formData.direction}`] || {};
    setFormData((base: any) => {
      return {...base, ...mc};
    });
  }, [formData.mode, formData.direction]);

  const updateForm = useCallback(
    (name: string, value: any) => {
      const form = {[name]: value};
      const mc: any = dataMap?.[`${formData.mode}-${formData.direction}`] || {};
      setFormData((base: any) => {
        return {...mc, ...base, ...form};
      });
    },
    [formData]
  );

  useEffect(() => {
    if (contract && maturity) {
      updateForm('Contract', `${contract}-${maturity}`);
    }
  }, [contract, maturity]);

  const handleSubmit = useCallback(async () => {
    const {...tmp} = formData;
    tmp.transaction = new Date().getTime();
    await db.positions.add(tmp);
  }, [formData]);

  return {formData, updateForm, handleSubmit};
};

const dataMap: any = {
  ['YT-Long']: {
    amount: 100,
    leverage: 5,
    maxLeverage: 11.2,
    depositMargin: 0.45,
    balance: 10,
    slippageTolerance: '1.0',
    pay: '7.025%',
    rec: '7.110%',
    estimatedTrade: '0.022440',
    impact: '0.02%',
    liquidation: 0.018953,
    estimatedTradingFee: 0.002244,
    executionFee: 0.001122,
    pnl: 0,
    entry: '0.022440',
    current: '0.022440',
    liq: '0.018953',
    tpsl: '-/-',
    cr: '120.0%',
  },
  ['YT-Short']: {
    amount: 100,
    leverage: 5,
    maxLeverage: 11.6,
    depositMargin: 0.46,
    balance: 10,
    slippageTolerance: '1.0',
    pay: '7.406%',
    rec: '7.261%',
    estimatedTrade: '0.023151',
    impact: '-0.02%',
    liquidation: '0.026783',
    estimatedTradingFee: '0.002315',
    executionFee: '0.001158',
    pnl: 0,
    entry: '0.023151',
    current: '0.023151',
    liq: '0.026783',
    tpsl: '-/-',
    cr: '120.0%',
  },
  ['IRS-Long']: {
    amount: 100,
    leverage: 5,
    maxLeverage: 11.6,
    depositMargin: '0.50',
    balance: 10,
    slippageTolerance: '7',
    pay: '7.25%',
    rec: '7.110%',
    estimatedTrade: '7.035%',
    impact: '1bp',
    liquidation: '5.73%',
    estimatedTradingFee: '0.002247',
    executionFee: '0.001123',

    pnl: 0,
    entry: '7.035%',
    current: '7.035%',
    liq: '5.735%',
    tpsl: '-/-',
    cr: '122.3%',
  },
  ['IRS-Short']: {
    amount: 100,
    leverage: 5,
    maxLeverage: 11.6,
    depositMargin: '0.50',
    balance: 10,
    slippageTolerance: '7',
    pay: '7.261%',
    rec: '7.406%',
    estimatedTrade: '7.251%',
    impact: '-1dp',
    liquidation: '8.58%',
    estimatedTradingFee: '0.0.002313',
    executionFee: '0.001156',

    pnl: 0,
    entry: '7.251%',
    current: '7.251%',
    liq: '8.576%',
    tpsl: '-/-',
    cr: '121.6%',
  },
};
