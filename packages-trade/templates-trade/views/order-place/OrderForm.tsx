import {useContract} from '@/hooks/use-contract';
import {useOrderForm} from '@/hooks/use-order-form';
import {DepositMargin} from '@/views/order-place/components/DepositMargin';
import {Direction} from '@/views/order-place/components/Direction';
import {Info} from '@/views/order-place/components/Info';
import {Leverage} from '@/views/order-place/components/Leverage';
import {LimitPrice} from '@/views/order-place/components/LimitPrice';
import {MarginType} from '@/views/order-place/components/MarginType';
import {NotionalAmount} from '@/views/order-place/components/NotionalAmount';
import {OrderType} from '@/views/order-place/components/OrderType';
import {PayFixed} from '@/views/order-place/components/PayFixed';
import {RecFloating} from '@/views/order-place/components/RecFloating';
import {SlippageTolerance} from '@/views/order-place/components/SlippageTolerance';
import {TradeMode} from '@/views/order-place/components/TradeMode';
import {TriggerPrice} from '@/views/order-place/components/TriggerPrice';
import {StyledSubmitButton} from '@/views/order-place/styles';
import {IMAGES} from '@rx/const/images';
import {env} from '@rx/env';
import {useLang} from '@rx/hooks/use-lang';
import {lang as tradeLang} from '@rx/lang/trade.lang';
import {Button} from '@rx/widgets/button/Button';

export function OrderForm() {
  const {LG} = useLang();
  const {contract, maturity} = useContract();
  const {formData, updateForm, handleSubmit} = useOrderForm();

  return (
    <>
      <div className="df fdc g10 fwbold" style={{padding: 16}}>
        <MarginType value={formData.marginType} onChange={updateForm} />
        <Direction value={formData.direction} onChange={updateForm} />
        <TradeMode value={formData.mode} onChange={updateForm} />
        <OrderType value={formData.orderType} onChange={updateForm} />
        <NotionalAmount
          mode={formData.mode}
          direction={formData.direction}
          contract={contract as string}
          maturity={maturity as string}
          value={formData.amount}
          onChange={updateForm}
        />
        {formData.orderType !== 'StopLimit' && (
          <Leverage
            mode={formData.mode}
            direction={formData.direction}
            maxLeverage={formData.maxLeverage ?? 10}
            value={formData.leverage ?? 5}
            onChange={updateForm}
            contract={contract as string}
            maturity={maturity as string}
          />
        )}
        {formData.orderType !== 'StopLimit' && (
          <DepositMargin
            mode={formData.mode}
            contract={contract as string}
            value={formData.depositMargin}
            direction={formData.direction}
          ></DepositMargin>
        )}

        {['Limit'].includes(formData.orderType) && (
          <LimitPrice
            value={formData.liquidation}
            current={formData.current}
            mode={formData.mode}
            direction={formData.direction}
          />
        )}

        {['StopMarket', 'StopLimit'].includes(formData.orderType) && (
          <TriggerPrice
            orderType={formData.orderType}
            value={formData.mode === 'IRS' ? formData.pay : formData.entry}
            mode={formData.mode}
            current={formData.current}
            direction={formData.direction}
          />
        )}

        {formData.orderType !== 'StopLimit' && (
          <SlippageTolerance
            value={formData.slippageTolerance}
            mode={formData.mode}
            direction={formData.direction}
          />
        )}
        {formData.orderType !== 'StopLimit' && (
          <div className="w100% df fdr aic gap16px">
            <PayFixed value={formData.pay} direction={formData.direction} />
            <img src={IMAGES.transfer} alt="" width={44} />
            <RecFloating value={formData.rec} direction={formData.direction} />
          </div>
        )}
        <Info info={formData} />
        <StyledSubmitButton className="mt8px">
          <Button
            className="font-size-20px"
            type={env.isMobile ? 'warning' : 'default'}
            size={42}
            width="100%"
            onClick={handleSubmit}
          >
            {LG(tradeLang.Trade).toUpperCase()}
          </Button>
        </StyledSubmitButton>
      </div>
    </>
  );
}
