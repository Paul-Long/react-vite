import {ProgressSlider} from '@/pages/lp/ProgressSlider';
import {IMAGES} from '@/pages/lp/const';
import {useLang} from '@rx/hooks/use-lang';
import {lang} from '@rx/lang/lp.lang';
import {useState} from 'react';

export function WalletBalance() {
  const {LG} = useLang();
  const [percent, setPercent] = useState(10);
  return (
    <>
      <div className="font-size-16px lh-24px">{LG(lang.AddLiquidity)}</div>
      <div className="flex flex-row py-10px px-16px justify-between rounded-8px bg-gray-40">
        <div className="flex flex-row items-center gap-8px">
          <img src={IMAGES.MSOL} alt="" width={24} height={24} />
          mSOL
        </div>
        <div className="flex flex-col items-end">
          <div className="flex flex-row items-center gap-4px">
            <img src={IMAGES.WALLET} alt="" />
            10.0000
          </div>
          <span className="text-#FFD166 fw-medium">10.0189</span>
        </div>
      </div>

      <div className="w-full px-10px">
        <ProgressSlider
          value={percent}
          min={0}
          max={100}
          unit="%"
          onChange={(v) => setPercent(v)}
        />
      </div>
    </>
  );
}
