import {ProgressBar} from '@/trade/components/ProgressBar';
import {useContract} from '@/trade/hooks/contract';
import {
  genDirections,
  genMarginOptions,
  genOrderTypes,
  genTradingInfos,
  useContractInfo,
  useFormState,
} from '@/trade/order-place/state';
import {StyledInputWrap} from '@/trade/order-place/styles';
import {IMAGES} from '@rx/const/images';
import {useLang} from '@rx/hooks/use-lang';
import {lang as tradeLang} from '@rx/lang/trade.lang';
import {RadioButtonGroup, Tabs} from '@rx/widgets';
import {Button} from '@rx/widgets/button/Button';
import {NumberInput} from '@rx/widgets/input/NumberInput';
import cn from 'classnames';
import React from 'react';

export function OrderForm() {
  const {LG} = useLang();
  const {contract} = useContract();
  const {options} = useContractInfo();
  const {formData, updateForm, handleSubmit} = useFormState();

  return (
    <>
      <div className="df fdc g10 fwbold" style={{padding: 16}}>
        <RadioButtonGroup
          options={genMarginOptions(LG)}
          value={formData.margin}
          size="middle"
          onChange={(v) => updateForm('margin', v)}
        />
        <RadioButtonGroup
          options={genDirections(LG)}
          value={formData.direction}
          onChange={(v) => updateForm('direction', v)}
        />
        <RadioButtonGroup
          size="small"
          options={[
            {
              text: (
                <div className="df fdc aic">
                  <span>{LG(tradeLang.YieldTrading)}</span>
                  <span>{LG(tradeLang.Mode)}</span>
                </div>
              ),
              value: 'Yield',
            },
            {
              text: (
                <div className="df fdc aic">
                  <span style={{whiteSpace: 'nowrap'}}>{LG(tradeLang.IntrestRateSwap)}</span>
                  <span>{LG(tradeLang.Mode)}</span>
                </div>
              ),
              value: 'Notional',
            },
          ]}
          value={formData.qtyType}
          onChange={(v) => updateForm('qtyType', v)}
        />
        <Tabs
          type="card"
          size="small"
          filled={true}
          options={genOrderTypes(LG)}
          active={formData.orderType}
          onChange={(v: string) => updateForm('orderType', v)}
        />
      </div>
      <div className="df fdc g12" style={{padding: 16}}>
        <StyledInputWrap>
          <div className="T2 f16">
            {formData.qtyType === 'Notional'
              ? LG(tradeLang.Notional)
              : LG(tradeLang.YieldTokenAmount)}
          </div>
          <NumberInput
            className={cn('fwbold', {
              buy: formData.direction === 'Long',
              sell: formData.direction === 'Short',
            })}
            bordered={false}
            suffix={<span className="T2">{formData.qtyType === 'Notional' ? contract : 'yT'}</span>}
            align="left"
            placeholder="max 200"
            value={formData.size}
            onChange={(v) => updateForm('size', v)}
          />
        </StyledInputWrap>

        <StyledInputWrap className="df fdc gap-26px">
          <div className="df fdr aic jcsb">
            <div className="T2 f16">{LG(tradeLang.LeverageSlider)}</div>
            <div className="font-size-12px T7">
              {LG(tradeLang.MaximumLeverage)}: {Math.round(formData.maxLeverage ?? 200)}
            </div>
          </div>
          <div className="pb20px">
            <ProgressBar
              value={formData.leverage}
              max={formData.maxLeverage ?? 200}
              onChange={(v: any) => updateForm('leverage', v)}
              color={formData.direction === 'Long' ? '#27F2A9' : '#f24e53'}
            />
          </div>
        </StyledInputWrap>

        <StyledInputWrap>
          <div className="T2 f16">{LG(tradeLang.Margin)}</div>
          <div className="df fdr aic jcsb T7 f14">
            <span>{LG(tradeLang.InitialMarginRate)}</span>
            <span>{formData.initialMarginRate ?? '-'}</span>
          </div>
          <div className="df fdr aic jcsb T7 f14">
            <span>{LG(tradeLang.MaintenanceMarginRate)}</span>
            <span>{formData.maintenanceMarginRate ?? '0%'}</span>
          </div>

          <div className="df fdr aic w100%">
            <div className="df fdc f1">
              <NumberInput
                className={cn('fwbold', {
                  buy: formData.direction === 'Long',
                  sell: formData.direction === 'Short',
                })}
                bordered={false}
                align="left"
                placeholder=""
                precision={4}
                value={formData.marginCost}
              />
              <div className="T7">
                {LG(tradeLang.MinRequired)} {formData.initialMarginRate ?? '-'}
              </div>
            </div>
            <div>{contract}</div>
          </div>
        </StyledInputWrap>
        <div className="df fdr aic g6">
          <StyledInputWrap className="f1 df fdc aic jcsb">
            <div className="T7 f16 tc" style={{maxWidth: 50}}>
              {LG(tradeLang.PayFixed)}
            </div>
            <div
              className={cn('f16 tc f22 mt8px fwbold', {
                buy: formData.direction === 'Long',
                sell: formData.direction === 'Short',
              })}
              style={{maxWidth: '100%'}}
            >
              {formData.yield}
            </div>
          </StyledInputWrap>
          <img src={IMAGES.transcation} alt="" width={30} />
          <StyledInputWrap className="f1 df fdc aic jcsb">
            <div className="T7 f16 tc" style={{maxWidth: 60}}>
              {LG(tradeLang.ReceiveFloating)}
            </div>
            <div className={cn('f16 tc f22 mt8px sell fwbold')} style={{maxWidth: 60}}>
              {formData.referenceApr ?? ''}
            </div>
          </StyledInputWrap>
        </div>
        <div
          className="df fdc gap-30px pb20px"
          style={{borderBottom: '1px dashed var(--dark-gray)'}}
        >
          {options.map((o) => (
            <div key={o.text} className="df fdr aic jcsb">
              <span className="T7">{o.text}</span>
              <span
                className={cn('fwbold', {
                  buy: formData.direction === 'Long',
                  sell: formData.direction === 'Short',
                })}
              >
                {o.value}
              </span>
            </div>
          ))}
        </div>
        <div className="df fdc gap-30px pb20px">
          {genTradingInfos(LG).map((o) => (
            <div key={o.text} className="df fdr aic jcsb">
              <span className="T7">{o.text}</span>
              <span
                className={cn('fwbold', {
                  buy: formData.direction === 'Long',
                  sell: formData.direction === 'Short',
                })}
              >
                {o.value} <span className="T2">ETH</span>
              </span>
            </div>
          ))}
        </div>
        <div style={{height: 42}}>
          <Button type="default" size={42} width="100%" onClick={handleSubmit}>
            {LG(tradeLang.Trade)}
          </Button>
        </div>
      </div>
    </>
  );
}
