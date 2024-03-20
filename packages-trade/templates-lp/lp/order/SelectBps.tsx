import {StyledBpsItem, StyledBpsWrap, StyledItemWrap} from '@/lp/order/styles';
import {useLang} from '@rx/hooks/use-lang';
import {lang} from '@rx/lang/lp.lang';
import {useCallback, useState} from 'react';

export function SelectBps({onChange}: any) {
  const {LG} = useLang();
  const [bp, setBp] = useState<string>('6.00% - 8.00%');

  const handleChange = useCallback((b: string) => {
    setBp(b);
    onChange?.(b);
  }, []);
  return (
    <StyledItemWrap className="df fdc gap16px fw700 p12px">
      <div className="T5">{LG(lang.StandardRange)}</div>
      <StyledBpsWrap className="gap10px">
        {['6.00% - 8.00%', '5.00% - 9.00%', '4.00% - 10.00%', '2.00% - 12.00%'].map((bps) => (
          <StyledBpsItem
            key={bps}
            $active={bp === bps}
            onClick={() => handleChange(bps)}
            className="font-size-12px"
          >
            {bps}
          </StyledBpsItem>
        ))}
      </StyledBpsWrap>
    </StyledItemWrap>
  );
}
