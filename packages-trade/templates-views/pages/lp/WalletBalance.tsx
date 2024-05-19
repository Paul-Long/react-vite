import {ProgressSlider} from '@/pages/lp/ProgressSlider';
import {IMAGES} from '@/pages/lp/const';
import {InputNumber} from '@/pages/trade/place-order/InputNumber';
import {useLang} from '@rx/hooks/use-lang';
import {useObservable} from '@rx/hooks/use-observable';
import {lang} from '@rx/lang/lp.lang';
import {balance$} from '@rx/web3/streams/balance';
import {useCallback, useState} from 'react';

interface Props {
  value?: string | number;
  onChange?: (v: string | number) => void;
}

export function WalletBalance(props: Props) {
  const {LG} = useLang();
  const balance = useObservable(balance$, 0);
  const [percent, setPercent] = useState(10);

  const handlePercentChange = useCallback(() => {}, []);

  const handleChange = useCallback(() => {}, []);

  return (
    <div className="flex flex-col gap-12px">
      <div className="font-size-16px lh-24px">{LG(lang.AddLiquidity)}</div>
      <div className="flex flex-row py-10px px-16px justify-between rounded-8px bg-gray-40">
        <div className="flex flex-row items-center gap-8px">
          <img src={IMAGES.MSOL} alt="" width={24} height={24} />
          SOL
        </div>
        <div className="flex flex-col items-end gap-8px">
          <div className="flex flex-row items-center gap-4px">
            <img src={IMAGES.WALLET} alt="" />
            {balance}
          </div>
          <InputNumber
            align="right"
            color="text-#FFD166"
            value={props.value}
            onChange={props.onChange}
            placeholder="0.00"
            step={4}
          />
        </div>
      </div>

      <div className="w-full px-10px mt-8px">
        <ProgressSlider
          value={percent}
          min={0}
          max={100}
          unit="%"
          onChange={(v) => setPercent(v)}
        />
      </div>
    </div>
  );
}
