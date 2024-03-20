import {BarChart} from '@/lp/charts/BarChart';
import {PieChart} from '@/lp/charts/PieChart';
import {SelectBps} from '@/lp/order/SelectBps';
import {useForm} from '@/lp/order/state';
import {select$} from '@/lp/stream/streams';
import {useLang} from '@rx/hooks/use-lang';
import {useStream} from '@rx/hooks/use-stream';
import {lang as clang} from '@rx/lang/common.lang';
import {lang} from '@rx/lang/lp.lang';
import {Button, NumberInput} from '@rx/widgets';
import {StyledInputWrap, StyledItemWrap} from './styles';

export function Order() {
  const {LG} = useLang();
  const [select] = useStream(select$);
  const {handleSubmit, amount, setAmount, record, range, setRange} = useForm();
  const getRange = () => range.replace(/\ /g, '').split('-');

  return (
    <div className="df fdc p24px">
      {select?.includes('ULP') && <PieChart />}
      {select && !select?.includes('ULP') && <BarChart />}

      <div className="df fdc w100% gap8px mt24px">
        {select && !select?.includes('ULP') && <SelectBps onChange={(r: string) => setRange(r)} />}
        {select && !select?.includes('ULP') && (
          <div className="df fdr jcsb gap16px">
            <StyledInputWrap className="df fdc jcc tc gap8px fw700 flex-1">
              <span className="font-size-14px T5">{LG(lang.LowerRange)}</span>
              <span className="font-size-22px T3">{getRange()[0]}</span>
            </StyledInputWrap>
            <StyledInputWrap className="df fdc jcc tc gap8px fw700 flex-1">
              <span className="font-size-14px T5">{LG(lang.UpperRange)}</span>
              <span className="font-size-22px T3">{getRange()[1]}</span>
            </StyledInputWrap>
          </div>
        )}

        <StyledItemWrap className="df fdc jcc tc gap8px fw700">
          <div className="df fdr jcsb aic font-size-14px T5">
            <span>{LG(lang.AddLiquidity)}</span>
            <span>{LG(clang.Balance)} : 100.0</span>
          </div>
          <div className="df fdr jcsb aic">
            <NumberInput
              align="left"
              className="T6"
              style={{padding: 0, fontWeight: 700, fontSize: 22}}
              value={amount}
              size="small"
              bordered={false}
              onChange={(v: any) => setAmount(v)}
            />
            <span className="font-size-14px">{record?.Contract?.split('-')[0]}</span>
          </div>
        </StyledItemWrap>
      </div>

      <div className="df fdc T5 font-size-14px mt16px gap12px">
        <div className="df fdr aic jcsb">
          <span>{LG(lang.EstimatedAPR)}</span>
          <span>{record?.APR}</span>
        </div>
        <div className="df fdr aic jcsb">
          <span>{LG(lang.EstimatedGas)}</span>
          <span>0.000001 SOL</span>
        </div>
      </div>
      <Button className="mt16px" type="default" onClick={handleSubmit}>
        {LG(lang.AddLiquidity)}
      </Button>
    </div>
  );
}
