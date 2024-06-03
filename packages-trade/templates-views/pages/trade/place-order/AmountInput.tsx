import {IMAGES} from '@/pages/lp/const';
import {useLang} from '@rx/hooks/use-lang';
import {useStream} from '@rx/hooks/use-stream';
import {lang} from '@rx/lang/trade.lang';
import {Tooltip} from '@rx/widgets';
import {contract$, maturity$} from '../streams/streams';
import {InputNumber} from './InputNumber';

interface Props {
  value?: string | number;
  onChange?: (v: string | number) => void;
  onFocus?: (e: any) => void;
}

export function AmountInput(props: Props) {
  const {LG} = useLang();
  const [contract] = useStream(contract$);
  const [maturity] = useStream(maturity$);
  return (
    <div className="flex flex-col p-16px gap-8px not-last:b-b-1px b-solid b-gray-40">
      <div className="flex flex-row items-center justify-between text-gray-600">
        <Tooltip text={`input yt amount can't exceed # due to your slippage settings.`}>
          <span className="underline underline-dotted cursor-help">{LG(lang.YTAmount)}</span>
        </Tooltip>
      </div>
      <div className="flex flex-row items-center justify-between">
        <div className="relative flex flex-row items-center font-size-14px lh-24px fw-medium gap-8px">
          <div className="absolute bottom-[-2px] left-15px flex justify-center items-center bg-#AFD615 border-1 border-solid border-#202424 rounded-12px font-size-12px text-#00000099 w-14px h-14px box-border">
            <div className="scale-70 font-size-12px lh-12px fw-medium">Y</div>
          </div>
          <img src={IMAGES[contract?.toUpperCase()]} alt="" width={26} height={26} />
          {contract}-{maturity}
        </div>
        <InputNumber
          value={props.value}
          onChange={props.onChange}
          placeholder="0.00"
          onFocus={props.onFocus}
          align="right"
          step={9}
          color="text-yellow-500"
        />
      </div>
    </div>
  );
}
