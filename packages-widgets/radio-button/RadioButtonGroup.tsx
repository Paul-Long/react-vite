import React, {Key, useCallback, useState} from 'react';
import {StyledRadioButton, StyledRadioButtonWrap} from './styles';

interface Option {
  text: React.ReactNode;
  value: Key;
}

interface Props {
  value: Key;
  className?: string;
  size?: 'large' | 'middle' | 'small';
  options: Option[];
  onChange?: (value: Key) => void;
  nowrap?: boolean;
}

export function RadioButtonGroup(props: Props) {
  const {size = 'large', nowrap = false} = props;
  const [selected, setSelected] = useState<Key>(props.value);
  const handleClick = useCallback(
    (option: Option) => () => {
      setSelected(option.value);
      props?.onChange?.(option.value);
    },
    []
  );
  return (
    <StyledRadioButtonWrap className={`df fdr aic cp`}>
      {props.options.map((o) => (
        <StyledRadioButton
          className="f1 df jcc aic fwbold"
          key={o.value}
          $size={size}
          $selected={selected === o.value}
          $nowrap={nowrap}
          onClick={handleClick(o)}
        >
          {o.text}
        </StyledRadioButton>
      ))}
    </StyledRadioButtonWrap>
  );
}
