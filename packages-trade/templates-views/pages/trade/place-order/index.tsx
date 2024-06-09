import {useForm} from '@/pages/trade/hooks/use-form';
import {OrderConfirm} from '@/pages/trade/place-order/OrderConfirm';
import {OrderType} from '@/pages/trade/place-order/OrderType';
import {RateInput} from '@/pages/trade/place-order/RateInput';
import {useLang} from '@rx/hooks/use-lang';
import {lang} from '@rx/lang/trade.lang';
import {Button, Loading, RadioButton} from '@rx/widgets';
import {AmountInput} from './AmountInput';
import {AssetsInfo} from './AssetsInfo';
import {DepositMargin} from './DepositMargin';
import {Leverage} from './Leverage';
import {genDirection, genMargin} from './const';

export function PlaceOrder() {
  const {LG} = useLang();
  const {
    input,
    focus,
    state,
    info2,
    loading,
    swapLoading,
    visible,
    handleSubmit,
    handleChange,
    setVisible,
    baseContract,
  } = useForm();
  return (
    <>
      <div className="max-w-424px min-w-424px w-424px flex flex-col px-24px py-24px gap-16px bg-#030B0F">
        <RadioButton
          options={genMargin(LG)}
          value={state.marginType}
          onChange={handleChange('marginType')}
        />
        <RadioButton
          options={genDirection(LG)}
          value={state.direction}
          onChange={handleChange('direction')}
        />
        <OrderType value={state.orderType as any} onChange={handleChange('orderType')} />
        <div className="flex flex-col b-1px b-solid b-gray-40">
          <AmountInput
            value={state.amount}
            onChange={(v) => {
              input.current = 'amount';
              handleChange('amount')(v);
            }}
            onFocus={() => (focus.current = 'amount')}
          />
          <Leverage
            value={state.leverage}
            max={state.maxLeverage}
            onChange={handleChange('leverage')}
          />
          <DepositMargin
            value={state.margin}
            onChange={(v) => {
              input.current = 'margin';
              handleChange('margin')(v);
            }}
            onFocus={() => (focus.current = 'margin')}
            marginType={state.marginType}
            marginWaiver={state.marginWaiver}
            onMarginWaiverChange={handleChange('marginWaiver')}
          />
          <RateInput direction={state.direction as any} fixedRate={info2.priceImpact} />
        </div>
        <AssetsInfo info={info2} marginType={state.marginType} />
        <Button
          size="md"
          type={state.direction.toLowerCase() as any}
          disabled={loading || swapLoading}
          onClick={() => handleSubmit(true)}
        >
          <div className="flex flex-row justify-center items-center flex-nowrap gap-10px font-size-16px lh-18px fw-semibold py-4px">
            {(loading || swapLoading) && <Loading size={18} />}
            {LG(lang.Trade)}
          </div>
        </Button>
      </div>
      <OrderConfirm
        contract={baseContract}
        loading={loading}
        visible={visible}
        order={state}
        onConfirm={() => handleSubmit(false)}
        onClose={() => setVisible(false)}
        calcInfo={info2}
      />
    </>
  );
}
