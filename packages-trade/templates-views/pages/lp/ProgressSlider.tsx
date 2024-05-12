import {Big} from 'big.js';
import {clsx} from 'clsx';
import {useEffect, useState} from 'react';
import {css, styled} from 'styled-components';

type ChangeFunc = (v: number) => void;

interface Props {
  value: number;
  max?: number;
  min?: number;
  onChange?: ChangeFunc;
  color?: string;
  unit?: string;
  dp?: number;
}

const options = [0, 25, 50, 75, 100];

const Wrap = styled.div<{$color: string}>`
  --base-color: ${({$color}) => $color};
  input[type='range'] {
    position: absolute;
    top: 0;
    left: -2px;
    right: -2px;
    height: 2px;
    border: 2px solid transparent;
    cursor: pointer;
    -webkit-appearance: none;
    background-color: transparent;
    &:focus,
    &::-moz-focus-outer {
      outline: none;
    }
    &::-webkit-slider-thumb {
      -webkit-appearance: none;
      width: 12px;
      height: 12px;
      border-radius: 50%;
      box-sizing: border-box;
      background-color: var(--base-color);
      margin-top: -2px;
      &:hover {
        cursor: grabbing;
        box-shadow: 0 0 0 4px #777e90;
      }
    }
    &::-moz-range-thumb {
      // firefox滑块
      border-radius: 50%;
      width: 12px;
      height: 12px;
      background-color: var(--base-color);
      margin-top: -2px;
      &:hover {
        cursor: grabbing;
        box-shadow: 0 0 0 4px #777e90;
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
  const {value, max = 1, min = 0, color = '#14F195', unit = 'x', dp = 1, onChange} = props;

  const [progress, setProgress] = useState(calculateProgress(value, max));

  useEffect(() => {
    setProgress(calculateProgress(value, max));
  }, [max, value]);

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
        <div className="w-100% h-2px bg-#777E90"></div>
        <div
          className={`absolute top-[-2px] h-6px z-10 rounded-l-4px`}
          style={{width: `${Math.min(progress, 100)}%`, background: color}}
        ></div>
      </div>
      <div className="absolute top-[-2px] w-100%">
        <div className="relative flex items-center justify-between pointer-events-none">
          {options.map((op) => (
            <Dot
              key={op}
              className={clsx(
                'relative w-2px h-6px bg-#777E90 text-gray-600 rounded-2px pointer-events-auto',
                [progress >= op && 'bg-opacity-0']
              )}
              $leverage={genNum(max, min, op) + unit}
            />
          ))}
        </div>
      </div>
      <input
        className="bg-#777E90"
        max="100"
        min="0"
        value={progress}
        onChange={handleChange}
        step="1"
        type="range"
      />
    </Wrap>
  );
}
