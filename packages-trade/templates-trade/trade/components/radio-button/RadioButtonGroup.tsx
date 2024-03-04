import {Key, useCallback, useState} from 'react';
import {StyledRadioButtonWrap, StyledRadioButton} from './styles';

interface Option {
  text: string | JSX.Element;
  value: Key;
}

interface Props {
  value: Key;
  size?: 'large' | 'small';
  options: Option[];
  onChange?: (value: Key) => void;
}

export function RadioButtonGroup(props: Props) {
  const {size = 'large'} = props;
  const [selected, setSelected] = useState<Key>(props.value);
  const handleClick = useCallback(
    (option: Option) => () => {
      setSelected(option.value);
      props?.onChange?.(option.value);
    },
    []
  );
  return (
    <StyledRadioButtonWrap className={`df fdr aic cp ${size}`}>
      {props.options.map((o) => (
        <StyledRadioButton
          className="f1 df jcc aic fwbold"
          key={o.value}
          $selected={selected === o.value}
          onClick={handleClick(o)}
        >
          {o.text}
        </StyledRadioButton>
      ))}
    </StyledRadioButtonWrap>
  );
}
