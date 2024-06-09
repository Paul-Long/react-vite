import {ProgressSlider} from '@/pages/lp/ProgressSlider';
import {IMAGES} from '@/pages/lp/const';
import {InputNumber} from '@/pages/trade/place-order/InputNumber';
import {closePosition$} from '@/streams/trade/close-position';
import {useLang} from '@rx/hooks/use-lang';
import {useStream} from '@rx/hooks/use-stream';
import {lang as clang} from '@rx/lang/common.lang';
import {lang} from '@rx/lang/trade.lang';
import {rateXClient$} from '@rx/web3/streams/rate-x-client';
import {Button, Loading, Modal} from '@rx/widgets';
import {clsx} from 'clsx';
import {DependencyList, EffectCallback, useCallback, useEffect, useRef, useState} from 'react';

export function ClosePositionModal() {
  const {LG} = useLang();
  const timer = useRef<any>(null);
  const [client] = useStream(rateXClient$);
  const [state] = useStream(closePosition$);
  const [loading, setLoading] = useState(false);

  const {visible, data, onClose} = state;

  useEffect(() => {
    if (timer.current) {
      clearTimeout(timer.current);
    }
    timer.current = setTimeout(() => {
      const {baseAssetAmount, direction, marketIndex} = data || {};
    }, 300);
  }, [data, client]);

  const renderTitle = useCallback(() => {
    return (
      <div className="flex flex-row items-center gap-8px">
        <img
          src={IMAGES[data?.symbolLevel2Category?.toUpperCase()]}
          alt=""
          width={24}
          height={24}
        />
        {data?.symbol}
      </div>
    );
  }, [data]);

  const handleClose = useCallback(() => {
    if (loading) {
      return;
    }
    onClose?.();
    closePosition$.next({visible: false, data: null});
  }, [loading]);

  const handleChange = useCallback(() => {}, []);

  const handlePercentChange = useCallback(() => {}, []);

  return (
    <Modal visible={visible} title={renderTitle()} onClose={handleClose}>
      <div className="flex flex-col px-24px py-16px mx-[-16px] border-t-1px border-solid border-gray-80">
        <div className="flex flex-col bg-gray-40 p-12px rounded-8px gap-10px">
          <div className="flex flex-row items-center text-gray-60 gap-4px">
            <span>{LG(lang.YourPosition)}</span>
            <span className="text-white">{data?.baseAssetAmount}</span>
            <span>YT</span>
          </div>
          <div className="flex flex-row items-center justify-between">
            <div className="relative flex flex-row items-center font-size-14px lh-24px fw-medium gap-8px">
              <div className="absolute bottom-[-2px] left-15px flex justify-center items-center bg-#AFD615 border-1 border-solid border-#202424 rounded-12px font-size-12px text-#00000099 w-14px h-14px box-border">
                <div className="scale-70 font-size-12px lh-12px fw-medium">Y</div>
              </div>
              <img
                src={IMAGES[data?.symbolLevel2Category?.toUpperCase()]}
                alt=""
                width={26}
                height={26}
              />
              {data?.symbol}
            </div>
            <InputNumber
              value={1}
              onChange={handleChange}
              placeholder="0.00"
              align="right"
              step={9}
              color="text-yellow-500"
            />
          </div>
        </div>
        <div className="w-full px-10px mt-20px">
          <ProgressSlider value={0} min={0} max={100} unit="%" onChange={handlePercentChange} />
        </div>
      </div>
      <div
        className={clsx(
          'flex flex-row items-center mx-[-16px] pt-12px pb-4px px-24px gap-4px',
          'border-t-1px border-solid border-gray-80'
        )}
      >
        <Button className="flex-1" size="md" type="default" onClick={handleClose}>
          {loading && <Loading size={18} />}
          <div className="fw-bold font-size-16px lh-16px">{LG(clang.Cancel)}</div>
        </Button>
        <Button className="flex-1 fw-bold" size="md" type="yellow">
          {loading && <Loading size={18} />}
          <div className="fw-bold font-size-16px lh-16px">{LG(lang.ConfirmClose)}</div>
        </Button>
      </div>
    </Modal>
  );
}

function useDelayEffect(effect: EffectCallback, deps?: DependencyList) {
  const timer = useRef<any>(null);
  useEffect(() => {
    if (timer.current) {
      clearTimeout(timer.current);
    }
    timer.current = setTimeout(() => {}, 300);
  }, deps);
}
