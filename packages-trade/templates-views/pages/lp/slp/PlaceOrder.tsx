import {WalletBalance} from '@/pages/lp/WalletBalance';
import {Info} from '@/pages/lp/slp/Info';
import {Range} from '@/pages/lp/slp/Range';
import {useLang} from '@rx/hooks/use-lang';
import {useStream} from '@rx/hooks/use-stream';
import {lang} from '@rx/lang/lp.lang';
import {rateXClient$} from '@rx/web3/streams/rate-x-client';
import {Button, Loading} from '@rx/widgets';
import {Big} from 'big.js';
import {useCallback, useState} from 'react';

interface Props {
  contract: any;
}
export function PlaceOrder(props: Props) {
  const {LG} = useLang();
  const {state, loading, handleChange, handleSubmit} = usePlaceOrder(props);
  return (
    <div className="flex flex-row gap-24px">
      <div className="flex flex-col flex-1">
        <Info contract={props.contract} />
      </div>
      <div className="flex flex-col w-384px rounded-8px bg-gray-40 py-16px px-24px gap-20px">
        <div className="font-size-16px">{LG(lang.StandardRange)}</div>
        <Range value={state.range} onChange={handleChange('range')} />
        <div className="flex flex-col">
          <div className="w-full h-1px bg-gray-40 mb-8px" />
          <WalletBalance value={state.amount} onChange={handleChange('amount')} />
          <div className="w-full h-1px bg-gray-40 mt-16px" />
        </div>
        <div className="flex flex-row items-center justify-between">
          <span className="text-gray-600">{LG(lang.EstimatedAPR)}</span>
          <span className="bg-#fff1eb19 font-size-14px lh-16px text-#FFD166 py-2px px-8px rounded-20px">
            0.03%
          </span>
        </div>
        <Button type="trade" disabled={loading} onClick={handleSubmit}>
          <div className="flex flex-row justify-center items-center flex-nowrap gap-10px font-size-16px lh-18px">
            {loading && <Loading size={18} />}
            {LG(lang.AddLiquidity)}
          </div>
        </Button>
      </div>
    </div>
  );
}

function usePlaceOrder(props: Props) {
  const [client] = useStream(rateXClient$);
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState({
    amount: '',
    range: '6-8',
  });

  const handleChange = useCallback(
    (key: string) => (value: string | number) => {
      setState((prevState: any) => {
        return {...prevState, [key]: value};
      });
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
    const params = {
      lowerRate: Big(lowerRate).div(100).toNumber(),
      upperRate: Big(upperRate).div(100).toNumber(),
      amount,
      marketIndex: props?.contract?.id,
      maturity: props?.contract?.maturity,
    };
    console.log('order ', params);
    setLoading(true);
    const tx = await client.addPerpLpShares(params);
    setLoading(false);
    console.log('add lp tx : ', tx);
  }, [state, client, props]);

  return {state, loading, handleChange, handleSubmit};
}
