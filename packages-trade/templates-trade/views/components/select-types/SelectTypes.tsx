import {mode$} from '@/streams/streams';
import {env} from '@rx/env';
import {CSSProperties, useCallback, useEffect, useState} from 'react';
import {css, styled} from 'styled-components';

export const StyledTypesWrap = styled.div<{$theme: 'dark' | 'light'}>`
  padding: 4px;
  background: ${({$theme}) =>
    $theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.7)'};
  border-radius: 2px;
`;

export const StyledTypeItem = styled.div<{$active: boolean; $theme: 'dark' | 'light'}>`
  padding: 2px 6px;
  min-width: 36px;
  font-weight: 700;
  ${({$active, $theme}) => {
    if ($active) {
      return css`
        color: var(--black);
        background: var(--golden);
      `;
    }
    if ($theme === 'light') {
      if (!$active) {
        return css`
          color: var(--black);
        `;
      }
    }
    if ($theme === 'dark') {
      if (!$active) {
        return css`
          color: var(--white);
        `;
      }
    }
  }}
`;
export function SelectTypes({
  value,
  onChange,
  theme = env.isMobile ? 'dark' : 'light',
  style,
}: {
  onChange?: Function;
  value?: string;
  theme?: 'dark' | 'light';
  style?: CSSProperties;
}) {
  const [type, setType] = useState<string>(value ?? 'YT');

  useEffect(() => {
    const subscription = mode$.subscribe((m) => {
      handleClick(m);
    });
    return function () {
      subscription.unsubscribe();
    };
  }, []);
  const handleClick = useCallback((t: string) => {
    setType(t);
    onChange?.(t);
  }, []);

  return (
    <StyledTypesWrap $theme={theme} className="df fdr aic cp font-size-14px" style={style ?? {}}>
      <StyledTypeItem
        $active={type === 'YT'}
        $theme={theme}
        className="w40px df jcc aic"
        onClick={() => handleClick('YT')}
      >
        yT
      </StyledTypeItem>
      <StyledTypeItem
        $active={type === 'IRS'}
        $theme={theme}
        className="w40px df jcc aic"
        onClick={() => handleClick('IRS')}
      >
        IRS
      </StyledTypeItem>
    </StyledTypesWrap>
  );
}
