import cn from 'classnames';
import React, {CSSProperties, useCallback, useEffect, useState} from 'react';
import {StyledTab, StyledTabsWrap} from './styles';

type Option = {text: string; key: string};

interface TabsProps {
  options: Option[];
  active?: string;
  size?: 'large' | 'small';
  onChange?: (tab: any) => void;
  type?: 'card' | 'line';
  children?: React.ReactNode;
  className?: string;
  style?: CSSProperties;
  filled?: boolean;
}

export function Tabs(props: TabsProps) {
  const {
    options,
    active,
    size = 'large',
    onChange,
    type = 'line',
    children,
    className = '',
    style = {},
    filled = false,
  } = props;
  const [tab, setTab] = useState<string>();

  useEffect(() => {
    if (active) {
      setTab(active);
    } else if (options[0]) {
      setTab(options[0].key);
    }
  }, [active, options]);

  const handleClick = useCallback(
    (tab: string) => () => {
      setTab(tab);
      onChange?.(tab);
    },
    [onChange]
  );

  return (
    <StyledTabsWrap
      className={cn(`pos-relative df fdr aic ${className}`)}
      style={style}
      $type={type}
      $filled={filled}
    >
      {options.map((o) => (
        <StyledTab
          key={o.key}
          className={cn(type)}
          onClick={handleClick(o.key)}
          $active={o.key === tab}
          $size={size}
          $type={type}
          $filled={filled}
        >
          {o.text}
        </StyledTab>
      ))}
      <div className="right df fdr aic">{children}</div>
    </StyledTabsWrap>
  );
}
