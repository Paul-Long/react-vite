import {css, styled} from 'styled-components';

const SizeMap = {
  card_large: css`
    font-size: 16px;
    padding: 10px 40px;
  `,
  card_small: css`
    font-size: 14px;
    padding: 2px 12px;
  `,
  line_large: css`
    font-size: 16px;
    padding: 16px 0 10px;
  `,
  line_small: css`
    font-size: 14px;
    padding: 14px 0 8px;
  `,
};
export const StyledTabsWrap = styled.div<{$type: 'card' | 'line'; $filled: boolean}>`
  width: 100%;
  box-sizing: border-box;
  ${({$type, $filled}) => {
    if ($type === 'line') {
      return css`
        color: var(--black);
        background: var(--golden);
        padding: 0 24px 4px;
        gap: 36px;
      `;
    }
    if ($type === 'card') {
      return css`
        padding: ${$filled ? '0' : '0 24px'};
        border-bottom: 1px solid var(--deep-sea-blue);
      `;
    }
  }}

  .right {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    width: auto;
  }
`;

export const StyledTab = styled.div<{
  $active: boolean;
  $size: 'large' | 'small';
  $type: 'card' | 'line';
  $filled: boolean;
}>`
  position: relative;
  margin-right: 2px;
  font-weight: 700;
  cursor: pointer;
  white-space: nowrap;

  ${({$filled}) => {
    if ($filled) {
      return css`
        flex: 1;
      `;
    }
  }}

  ${({$type, $size}) => {
    if ($type === 'card') {
      return css`
        clip-path: polygon(0 0, 100% 0, calc(100% - 8px) 0%, 100% 100%, 0 100%);
      `;
    }
    if ($type === 'line') {
      return css`
        box-sizing: border-box;
      `;
    }
  }}

  ${({$size, $type}) => {
    return SizeMap[`${$type}_${$size}`];
  }}

  ${({$active, $type, $size}) => {
    if ($type === 'line') {
      if ($active) {
        return css`
          border-bottom: 3px solid var(--black);
          padding-bottom: ${$size === 'large' ? 8 : 6}px;
        `;
      }
      return css``;
    }
    if ($active) {
      return css`
        color: var(--black);
        background: linear-gradient(var(--smoke-gray) 0%, var(--white) 100%);
      `;
    }
    return css`
      color: var(--light-gray);
      background: var(--graphite-gray);
    `;
  }}
`;
