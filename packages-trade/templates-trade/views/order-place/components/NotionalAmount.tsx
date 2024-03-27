import {StyledInputWrap} from '@/views/order-place/styles';
import {useLang} from '@rx/hooks/use-lang';
import {lang as tradeLang} from '@rx/lang/trade.lang';
import {NumberInput} from '@rx/widgets';
import cn from 'classnames';

interface Props {
  mode: string;
  direction: string;
  contract: string;
  maturity: string;
  value: any;
  onChange: (key: string, v: any) => void;
}

export function NotionalAmount(props: Props) {
  const {direction, mode, contract, maturity, value, onChange} = props;
  const {LG} = useLang();
  return (
    <StyledInputWrap>
      <div className="T5 f16">
        {mode === 'IRS' ? LG(tradeLang.NotionalAmount) : LG(tradeLang.YieldTokenAmount)}
      </div>
      <NumberInput
        className={cn('fwbold', {
          buy: direction === 'Long',
          sell: direction === 'Short',
        })}
        style={{padding: 0, marginTop: 12, fontWeight: 700, fontSize: 22}}
        bordered={false}
        suffix={
          <span className="T2">{mode === 'IRS' ? 'SOL' : 'y' + contract + '-' + maturity}</span>
        }
        align="left"
        placeholder="max 200"
        value={value}
        onChange={(v) => onChange('amount', v)}
      />
    </StyledInputWrap>
  );
}
