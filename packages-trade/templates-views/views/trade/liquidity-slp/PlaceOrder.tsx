import {query$} from '@/streams/lp/positions';
import {RangeSelect} from '@/views/trade/liquidity-slp/RangeSelect';
import {WalletBalance} from '@/views/trade/liquidity-slp/WalletBalance';
import {useLang} from '@rx/hooks/use-lang';
import {useStream} from '@rx/hooks/use-stream';
import {lang} from '@rx/lang/lp.lang';
import {updateBalance$} from '@rx/web3/streams/balance';
import {rateXClient$} from '@rx/web3/streams/rate-x-client';
import {Button, Toast} from '@rx/widgets';
import {Big} from 'big.js';
import {clsx} from 'clsx';
import {useCallback, useState} from 'react';

export function PlaceOrder({contract}: {contract: ConfigSymbol}) {
  const {LG} = useLang();
  const {state, loading, handleSubmit, handleChange} = useOrder({contract});
  return (
    <div className="w-full h-full bg-#131315 border-1px border-solid border-#2C2D2D border-l-none">
      <div
        className={clsx(
          'px-20px py-12px',
          'font-size-16px lh-24px fw-medium text-gray-500',
          'border-b-1px border-b-solid border-#2C2D2D'
        )}
      >
        {LG(lang.StandardRange)}
      </div>
      <div className="p-16px">
        <RangeSelect value={state.range} onChange={handleChange('range')} />
        <WalletBalance
          value={state.amount}
          currency={contract.symbolLevel2Category}
          marketIndex={contract.id}
          onChange={handleChange('amount')}
        />
        <Button size="lg" type="lime" className="w-full h-48px font-size-16px fw-medium mt-12px">
          {LG(lang.AddLiquidity)}
        </Button>
      </div>
    </div>
  );
}

function useOrder({contract}: {contract: Record<string, any>}) {
  const [client] = useStream(rateXClient$);
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState({
    amount: '',
    range: '6-8',
  });

  const handleChange = useCallback(
    (key: string) => (value: string | number) => {
      setState((prevState) => ({...prevState, [key]: value}));
    },
    []
  );

  const handleSubmit = useCallback(async () => {
    if (!client) {
      return;
    }
    const {range, amount} = state;
    const [lowerRate, upperRate] = range.split('-');
    if (!amount || !lowerRate || !upperRate) {
      return;
    }
    if (Number(amount) < 2) {
      Toast.warn(`Must be more than 2 ${contract.symbolLevel2Category}`);
      return;
    }
    const params = {
      lowerRate: Big(lowerRate).div(100).toNumber(),
      upperRate: Big(upperRate).div(100).toNumber(),
      amount,
      marketIndex: contract?.id,
      maturity: contract?.maturity,
    };
    setLoading(true);
    try {
      await client.addPerpLpShares(params);
    } catch (e) {}
    updateBalance$.next(0);
    setLoading(false);
    setState((prevState) => ({...prevState, amount: ''}));
    setTimeout(() => query$.next(0), 500);
  }, [state, client, contract]);

  return {state, loading, handleChange, handleSubmit};
}
