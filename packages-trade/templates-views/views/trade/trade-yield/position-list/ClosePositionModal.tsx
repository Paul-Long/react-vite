import {IMAGES} from '@/pages/lp/const';
import {closePosition$} from '@/streams/trade/close-position';
import {useLang} from '@rx/hooks/use-lang';
import {useStream} from '@rx/hooks/use-stream';
import {lang} from '@rx/lang/trade.lang';
import {rateXClient$} from '@rx/web3/streams/rate-x-client';
import {Button, Modal, NumberInput, ProgressSlider} from '@rx/widgets';
import {Big} from 'big.js';
import {useCallback, useEffect, useMemo, useRef, useState} from 'react';

export function ClosePositionModal() {
  const {LG} = useLang();
  const timer = useRef<any>(null);
  const focus = useRef(false);
  const [client] = useStream(rateXClient$);
  const [state] = useStream(closePosition$);
  const [loading, setLoading] = useState(false);
  const [percent, setPercent] = useState(100);
  const ytAmount = useMemo(() => Math.abs(state?.data?.baseAssetAmount || 0), [state]);
  const [value, setValue] = useState(ytAmount);

  const {visible, data, onClose} = state;

  useEffect(() => {
    if (visible && data) {
      const v = Math.abs(data?.baseAssetAmount || 0);
      setValue(v);
      setPercent(100);
    }
  }, [visible, data]);

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
    closePosition$.next({visible: false, data: null});
  }, []);

  const handleConfirm = useCallback(async () => {
    if (!value || Number(value) <= 0) {
      return;
    }
    if (loading) {
      return;
    }
    const {baseAssetAmount, marketIndex, userPda, userOrdersPda, marginType, direction} =
      state.data;
    console.log('Close Position : ', marketIndex, userPda, Math.abs(baseAssetAmount));
    setLoading(true);
    const params = {
      marginType,
      marketIndex,
      amount: Math.abs(value),
      orderType: 'MARKET',
      direction: direction === 'LONG' ? 'SHORT' : 'LONG',
      userPda,
      userOrdersPda,
    };
    try {
      await client?.closePosition(params);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
    handleClose();
  }, [loading, state, value]);

  const handlePercentChange = useCallback(
    (v: number) => {
      setPercent(v);
      if (!focus.current) {
        setValue(Big(ytAmount).times(v).div(100).round(9).toNumber());
      }
    },
    [ytAmount]
  );

  const handleChange = useCallback(
    (v: string | number) => {
      if (!!v && Big(v).gt(ytAmount)) {
        v = Number(ytAmount);
      }
      if (focus.current) {
        setPercent(Number(ytAmount) > 0 && !!v ? Big(v).times(100).div(ytAmount).toNumber() : 0);
      }
      setValue(v as number);
    },
    [ytAmount]
  );

  return (
    <Modal visible={visible} title={renderTitle()} onClose={handleClose}>
      <div className="flex flex-col gap-24px p-24px w-480px">
        <div className="flex flex-col bg-gray-4 p-12px rounded-8px gap-10px">
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
            <NumberInput
              value={value}
              onChange={handleChange}
              placeholder="0.00"
              align="right"
              step={9}
              onFocus={() => (focus.current = true)}
              onBlur={() => (focus.current = false)}
              color="text-yellow-500"
            />
          </div>
        </div>
        <div className="w-full px-10px mt-20px">
          <ProgressSlider
            value={percent}
            min={0}
            max={100}
            unit="%"
            onChange={handlePercentChange}
          />
        </div>
        <Button
          className="flex-1"
          size="md"
          type="lime"
          disabled={loading}
          loading={loading}
          onClick={handleConfirm}
        >
          <div className="fw-medium font-size-16px lh-20px">{LG(lang.Close)}</div>
        </Button>
      </div>
    </Modal>
  );
}
