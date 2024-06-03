import {clsx} from 'clsx';
import {useCallback, useEffect, useRef, useState} from 'react';
import {css, styled} from 'styled-components';

const Wrap = styled.div<{$isPercentage: boolean; $size: string}>`
  &::after {
    position: absolute;
    left: var(--left, 50%);
    pointer-events: none;
    content: '%';
    top: 0;
    ${({$size}) => {
      if ($size === 'lg') {
        return css`
          font-size: 24px;
          line-height: 36px;
        `;
      } else if ($size === 'md') {
        return css`
          font-size: 18px;
          line-height: 24px;
        `;
      }
    }}
    ${({$isPercentage}) => {
      if ($isPercentage) {
        return css`
          display: flex;
        `;
      }
      return css`
        display: none;
      `;
    }}
`;

const StyledInput = styled.input`
  border: none;
  background: transparent;
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    margin: 0;
    -webkit-appearance: none;
  }
  &::placeholder {
    color: #ffffff33;
  }
  &::after {
  }
`;

interface Props {
  className?: string;
  size?: 'lg' | 'md' | 'sm';
  align?: 'left' | 'right' | 'center';
  type?: 'number' | 'percentage';
  color?: string;
  value?: string | number;
  autoFocus?: boolean;
  step?: number;
  placeholder?: string;
  onChange?: (e: any) => void;
  onFocus?: (e: any) => void;
  onBlur?: (e: any) => void;
}

export function InputNumber(props: Props) {
  const {
    size = 'lg',
    align = 'left',
    type = 'number',
    color = 'text-green-500',
    autoFocus = false,
    step = 1,
    placeholder,
    onChange,
    onFocus,
    onBlur,
  } = props;
  const wrap = useRef<HTMLDivElement>(null);
  const ref = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState(props.value);

  useEffect(() => {
    ref.current?.addEventListener('input', function () {
      let v = this.value;
      if (v?.indexOf('-') > -1) {
        v = v.replace('-', '');
        this.value = v;
      }
      if (v.indexOf('.') !== -1 && v.split('.')[1].length > step) {
        v = parseFloat(v).toFixed(step);
        this.value = v;
      }
      updatePercentagePosition();
    });
    ref.current?.addEventListener('blur', function () {
      let v = this.value;
    });
    if (autoFocus) {
      ref.current?.focus();
    }
    setTimeout(() => {
      updatePercentagePosition();
    }, 200);
  }, [step]);

  useEffect(() => {
    onChange?.(value);
  }, [value]);

  const handleChange = useCallback((e: any) => {
    setValue(e.target.value);
  }, []);

  const updatePercentagePosition = useCallback(() => {
    if (!ref.current) {
      return;
    }
    if (align === 'right') {
      wrap.current?.style.setProperty('--left', `calc(100% - 12px)`);
      return;
    }
    const inputWidth = ref.current?.offsetWidth ?? 0;
    const contentWidth = getTextWidth(
      ref.current?.value || '',
      getComputedStyle(ref.current as any).font
    );
    if (align === 'center') {
      const size = Math.ceil(inputWidth / 2 + contentWidth / 2);
      wrap.current?.style.setProperty('--left', `${size + 2}px`);
      return;
    }
    wrap.current?.style.setProperty('--left', `${contentWidth + 2}px`);
  }, []);

  return (
    <Wrap
      $isPercentage={type === 'percentage'}
      $size={size}
      className={clsx('flex-1 flex relative', props?.className ?? '', [
        type === 'percentage' && 'pr-14px',
      ])}
      ref={wrap}
    >
      <StyledInput
        ref={ref}
        className={clsx(
          'outline-none appearance-none font-medium w-100%',
          color,
          [size === 'lg' && 'font-size-24px lh-36px'],
          [size === 'md' && 'font-size-18px lh-24px'],
          [align === 'left' && 'text-left'],
          [align === 'center' && 'text-center'],
          [align === 'right' && 'text-right']
        )}
        type="number"
        step={step}
        placeholder={placeholder ?? ''}
        value={props.value}
        onChange={handleChange}
        onFocus={onFocus}
        onBlur={onBlur}
      />
    </Wrap>
  );
}

function getTextWidth(text: string, font: string) {
  // @ts-ignore
  const canvas = getTextWidth.canvas || (getTextWidth.canvas = document.createElement('canvas'));
  const context: any = canvas.getContext('2d');
  context.font = font;
  const metrics = context.measureText(text);
  return metrics.width;
}
