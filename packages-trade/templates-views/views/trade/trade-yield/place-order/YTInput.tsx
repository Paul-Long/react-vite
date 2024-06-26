import {IMAGES} from '@/pages/lp/const';
import {current$} from '@/streams/trade/page-state';
import {useLang} from '@rx/hooks/use-lang';
import {useObservable} from '@rx/hooks/use-observable';
import {lang} from '@rx/lang/trade.lang';
import {NumberInput} from '@rx/widgets';

interface Props {
  onFocus?: (e: any) => void;
}

export function YTInput(props: FormItemProps & Props) {
  const {LG} = useLang();
  const current = useObservable(current$, null);
  return (
    <div className="w-full pb-12px border-b-1px border-b-solid border-#2C2D2D">
      <div className="text-gray-60 font-size-12px lh-18px">{LG(lang.YTAmount)}</div>
      <div className="flex flex-row items-center justify-between">
        <div className="relative flex flex-row items-center font-size-14px lh-24px fw-medium gap-8px">
          <div className="absolute bottom-[-2px] left-13px flex justify-center items-center bg-#AFD615 border-1 border-solid border-#2C2D2D rounded-12px font-size-10px text-#09090A w-12px h-12px box-border">
            <div className="scale-70 font-size-12px lh-12px fw-medium">Y</div>
          </div>
          <img
            src={IMAGES[current?.symbolLevel2Category?.toUpperCase()]}
            alt=""
            width={20}
            height={20}
          />
          <span className="lh-18px fw-medium text-nowrap">YT-{current?.symbol}</span>
        </div>

        <NumberInput
          value={props.value}
          onChange={props?.onChange}
          placeholder="0.00"
          onFocus={props?.onFocus}
          align="right"
          step={9}
          color="text-yellow-500"
        />
      </div>
    </div>
  );
}
