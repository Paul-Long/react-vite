import {useLang} from '@rx/hooks/use-lang';
import {RadioButton} from '@rx/widgets';
import {useCallback, useState} from 'react';
import {AmountInput} from './AmountInput';
import {AssetsInfo} from './AssetsInfo';
import {DepositMargin} from './DepositMargin';
import {Leverage} from './Leverage';
import {RateInput} from './RateInput';
import {SlippageTolerance} from './SlippageTolerance';
import {SubmitButton} from './SubmitButton';
import {genDirection, genMargin, genMode} from './const';

export function PlaceOrder() {
  const {LG} = useLang();
  const [state, setState] = useState({
    marginType: 'Cross',
    direction: 'Short',
    mode: 'Yield',
  });

  const handleChange = useCallback(
    (key: string) => {
      return (v: string | number) => {
        setState((prevState) => {
          return {...prevState, [key]: v};
        });
      };
    },
    [state]
  );
  return (
    <div className="max-w-424px min-w-424px w-424px flex flex-col px-24px py-24px gap-16px">
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
      <RadioButton options={genMode(LG)} value={state.mode} onChange={handleChange('mode')} />
      <div className="flex flex-col b-1px b-solid b-gray-40">
        <AmountInput />
        <Leverage />
        <DepositMargin />
        <SlippageTolerance />
        <RateInput />
      </div>
      <AssetsInfo />
      <SubmitButton />
    </div>
  );
}
