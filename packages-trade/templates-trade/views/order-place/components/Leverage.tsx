import {data} from '@/views/mock/header/header-json';
import {StyledInputWrap} from '@/views/order-place/styles';
import {useLang} from '@rx/hooks/use-lang';
import {lang as tradeLang} from '@rx/lang/trade.lang';
import {ProgressBar} from '@rx/widgets';
import {Big} from 'big.js';
import cn from 'classnames';

interface Props {
  mode: string;
  direction: string;
  maxLeverage: number;
  value: any;
  onChange: (key: string, v: any) => void;
  contract: string;
  maturity: string;
}

export function Leverage(props: Props) {
  const {maxLeverage, direction, value, onChange, mode, contract, maturity} = props;
  const {LG} = useLang();
  return (
    <StyledInputWrap className="df fdc gap-26px">
      <div className="df fdr aic jcsb">
        <div className="T5 f16">
          {mode === 'IRS' ? LG(tradeLang.MarginRatioSlider) : LG(tradeLang.LeverageSlider)}
        </div>
        <div
          className={cn('font-size-12px', {
            buy: direction === 'Long',
            sell: direction === 'Short',
          })}
        >
          {mode === 'IRS' ? LG(tradeLang.MinimumMR) : LG(tradeLang.MaximumLeverage)}:{' '}
          {mode === 'IRS' ? '0.5' : maxLeverage}
          {mode === 'IRS' ? '%' : 'x'}
        </div>
      </div>
      <div
        className={cn('df fdr aife w100%', {
          buy: direction === 'Long',
          sell: direction === 'Short',
        })}
      >
        <div className={cn('font-size-22px')}>{value}</div>
        <span className="font-size-12px mb4px">{mode === 'IRS' ? '%' : 'x'}</span>
      </div>
      <div className="pb20px">
        <ProgressBar
          value={value}
          max={mode === 'IRS' ? getMarginRatioMax(contract, maturity) : maxLeverage}
          min={mode === 'IRS' ? 0.2 : 0}
          dp={mode === 'IRS' ? 3 : 1}
          onChange={(v: any) => onChange('leverage', v)}
          color={direction === 'Long' ? '#27F2A9' : '#f24e53'}
          util={mode === 'IRS' ? '%' : 'x'}
        />
      </div>
    </StyledInputWrap>
  );
}

function getMarginRatioMax(contract: string, maturity: string) {
  const item = data[`${contract}-${maturity}`];
  return Big(item?.YT ?? 0.005)
    .times(100)
    .toNumber();
}
