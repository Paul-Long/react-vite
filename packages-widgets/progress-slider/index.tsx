import {Big} from 'big.js';
import {clsx} from 'clsx';
import {useEffect, useRef, useState} from 'react';
import {css, styled} from 'styled-components';

type ChangeFunc = (v: number) => void;

interface Props {
  value: number;
  max?: number;
  min?: number;
  color?: string;
  unit?: string;
  dp?: number;
  onChange?: ChangeFunc;
  onFocus?: (e: any) => void;
  onBlur?: (e: any) => void;
}

const options = [0, 25, 50, 75, 100];

const Wrap = styled.div<{$color: string}>`
  --base-color: ${({$color}) => $color};
  input[type='range'] {
    position: absolute;
    top: 0;
    left: -2px;
    right: -4px;
    height: 2px;
    border: 4px solid transparent;
    cursor: pointer;
    -webkit-appearance: none;
    background-color: transparent;
    &:focus,
    &::-moz-focus-outer {
      outline: none;
    }
    &::-webkit-slider-thumb {
      -webkit-appearance: none;
      width: 16px;
      height: 16px;
      border-radius: 50%;
      box-sizing: border-box;
      background-color: #09090a;
      margin-top: -6px;
      border: 5px solid #f6f7f3;
      box-shadow: 0 0 0 1px #09090a;
      &:hover {
        cursor: grabbing;
      }
    }
    &::-moz-range-thumb {
      border-radius: 50%;
      width: 16px;
      height: 16px;
      background-color: #09090a;
      margin-top: -2px;
      box-sizing: border-box;
      border: 5px solid #f6f7f3;
      box-shadow: 0 0 0 1px #09090a;
      &:hover {
        cursor: grabbing;
      }
    }
  }
`;

const Dot = styled.div<{$leverage: string}>`
  &::after {
    ${({$leverage}) => {
      return css`
        content: '${$leverage}';
      `;
    }}
    font-size: 12px;
    position: absolute;
    display: block;
    left: -6px;
    bottom: -24px;
  }
  &:first-child::after {
    left: 0;
  }
  &:last-child::after {
    left: auto;
    right: 0;
  }
`;

export function ProgressSlider(props: Props) {
  const bar = useRef<HTMLDivElement | null>(null);
  const {value, max = 1, min = 0, color = '#F6F7F3', unit = 'x', dp = 1, onChange} = props;
  const [progress, setProgress] = useState(calculateProgress(value, max));
  const [width, setWidth] = useState(0);

  useEffect(() => {
    setProgress(calculateProgress(value, max));
  }, [max, value]);

  useEffect(() => {
    if (bar.current) {
      setWidth(
        Big(bar.current?.getBoundingClientRect().width)
          .minus((16 * progress) / 100)
          .times(progress)
          .div(100)
          .toNumber()
      );
    }
  }, [progress]);

  function calculateProgress(value: number, max: number) {
    return Number(
      Big(value - min)
        .div(max - min)
        .times(100)
        .toFixed(dp)
    );
  }

  function updateProgress(value: number) {
    setProgress(value);
    const real = Number(
      Big(value)
        .times(max - min)
        .div(100)
        .add(min)
        .toFixed(dp)
    );
    onChange?.(Math.max(min, Math.min(real, max)));
  }

  function handleChange(event: any) {
    updateProgress(event.target.value);
  }

  function genNum(max: number, min: number, v: number) {
    return Number(
      Big(max - min)
        .div(100)
        .times(v)
        .add(min)
        .toFixed(dp)
    );
  }

  return (
    <Wrap className="relative mb-24px" $color={color}>
      <div className="relative">
        <div className="w-100% h-2px bg-#2C2D2D" ref={bar}></div>
        <div
          className={`absolute top-[-2px] left-0 right-16px h-6px z-10 rounded-l-4px`}
          style={{width: `${width}px`, background: color}}
        ></div>
      </div>
      <div className="absolute top-[-2px] w-100%">
        <div className="relative flex items-center justify-between pointer-events-none">
          {options.map((op) => (
            <Dot
              key={op}
              className={clsx(
                'relative w-2px h-6px bg-#2C2D2D text-gray-60 rounded-2px pointer-events-auto',
                [progress >= op && 'bg-opacity-0']
              )}
              $leverage={genNum(max, min, op) + unit}
            />
          ))}
        </div>
      </div>
      <input
        className="bg-#2C2D2D"
        max="100"
        min="0"
        value={progress}
        onChange={handleChange}
        step="1"
        type="range"
        onFocus={props?.onFocus}
        onBlur={props?.onBlur}
      />
    </Wrap>
  );
}
