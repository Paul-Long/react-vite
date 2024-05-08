import {useLang} from '@rx/hooks/use-lang';
import {RadioButton} from '@rx/widgets';
import {useForm} from '../hooks/use-form.ts';
import {AmountInput} from './AmountInput';
import {AssetsInfo} from './AssetsInfo';
import {DepositMargin} from './DepositMargin';
import {Leverage} from './Leverage';
import {SlippageTolerance} from './SlippageTolerance';
import {SubmitButton} from './SubmitButton';
import {genDirection, genMargin} from './const';

export function PlaceOrder() {
  const {LG} = useLang();
  const {state, info, handleSubmit, handleChange} = useForm();
  return (
    <div className="max-w-424px min-w-424px w-424px flex flex-col px-24px py-24px gap-16px bg-black">
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
      <div className="flex flex-col b-1px b-solid b-gray-40">
        <AmountInput value={state.amount} onChange={handleChange('amount')} />
        <Leverage value={state.leverage} onChange={handleChange('leverage')} />
        <DepositMargin value={state.margin} onChange={handleChange('margin')} />
        <SlippageTolerance value={state.slippage} onChange={handleChange('slippage')} />
        {/*<RateInput />*/}
      </div>
      <AssetsInfo info={info} />
      <SubmitButton onSubmit={handleSubmit} />
    </div>
  );
}
