// Menu.tsx
import React, {useState, useCallback} from 'react';
import {StyledMenuList, StyledMenuItem} from './MenuStyles';

type SizeType = 'small' | 'medium' | 'large';

interface Option {
  text: string | JSX.Element | ((option: Option) => JSX.Element);
  key: string | number;
}

interface MenuProps {
  onClick?: (option: Option) => void;
  options: Option[];
  size: SizeType;
  selectEnable?: boolean;
}

export const Menu: React.FC<MenuProps> = ({
  onClick,
  options,
  size = 'medium',
  selectEnable = true,
}) => {
  const [selectedKey, setSelectedKey] = useState<string | number | null>(null);

  const handleClick = useCallback(
    (option: Option) => {
      if (selectEnable) {
        setSelectedKey(option.key);
      }
      onClick?.(option);
    },
    [onClick, selectEnable]
  );

  const renderOptionContent = useCallback((option: Option) => {
    if (typeof option.text === 'function') {
      return option.text(option);
    }
    return option.text;
  }, []);

  return (
    <StyledMenuList>
      {options.map((option) => (
        <StyledMenuItem
          key={option.key}
          $size={size}
          $selected={selectEnable && option.key === selectedKey}
          onClick={() => handleClick(option)}
        >
          {renderOptionContent(option)}
        </StyledMenuItem>
      ))}
    </StyledMenuList>
  );
};
