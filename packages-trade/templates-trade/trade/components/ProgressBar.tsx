import {Big} from 'big.js';
import React, {useEffect, useState} from 'react';
import {css, styled} from 'styled-components';

const options = [0, 25, 50, 75, 100];

const Wrap = styled.div<{$color: string}>`
  position: relative;
  width: 100%;

  --base-color: ${({$color}) => $color ?? 'var(--mint-green)'};

  input[type='range'] {
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    height: 2px;
    border: none;
    cursor: pointer;
    -webkit-appearance: none;
    background-color: transparent;
    &:focus,
    &::-moz-focus-outer {
      outline: none;
    }
    &::-webkit-slider-thumb {
      -webkit-appearance: none;
      border: 4px solid var(--base-color);
      width: 12px;
      height: 12px;
      transform: rotate(45deg);
      box-sizing: border-box;
      background-color: var(--base-color);
      &:hover {
        cursor: grabbing;
        box-shadow: 0 0 0 6px rgba(10, 166, 75, 0.3);
      }
    }
    &::-moz-range-thumb {
      // firefox滑块
      border: 4px solid var(--base-color);
      border-radius: 50%;
      width: 8px;
      height: 8px;
      background-color: var(--base-color);
    }
  }

  .line {
    width: 100%;
    height: 2px;
    background: var(--white);
  }
  .dot-box {
    top: -5px;
    width: 100%;
  }

  .dot {
    width: 12px;
    height: 12px;
    background: var(--white);
    border: none;
    pointer-events: auto;
    transform: rotate(45deg);
    &:hover {
    }
  }
  .active {
    background: var(--base-color);
    &:hover {
      border: 1px solid var(--base-color);
    }
  }
  .value {
    top: -30px;
    padding: 2px 4px;
    color: #fff;
    border-radius: 2px;
    background: var(--base-color);
    transition: opacity 0.3s;
    opacity: 1;
  }
  .value-hide {
    opacity: 0;
  }
  .high-light-line {
    top: 0;
    height: 2px;
    background: var(--base-color);
  }
  .triangle {
    top: 17px;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 4px 6px 0 6px;
    border-color: var(--base-color) transparent transparent transparent;
  }
  .dots {
    position: relative;
    pointer-events: none;
  }
  .disabled {
    opacity: 0.4;
    input[type='range'] {
      cursor: default;
    }
  }
  .dot-item {
    text-align: right;
  }
  .dot-item-active {
    position: absolute;
  }
`;

const StyledDot = styled.div<{$leverage: number}>`
  position: relative;
  &::after {
    ${({$leverage}) => {
      return css`
        content: '${$leverage}';
      `;
    }}
    color: var(--light-gray);
    font-size: 12px;
    position: absolute;
    display: block;
    left: 10px;
    bottom: -14px;
    transform: rotate(-45deg);
  }
`;

export function ProgressBar({value, max, onChange, color, util = 'x'}: any) {
  const [progress, setProgress] = useState(calculateProgress(value, max));

  useEffect(() => {
    setProgress(calculateProgress(value, max));
  }, [value, max]);

  function calculateProgress(value: number, max: number) {
    return Number(Big(value).div(max).times(100).toFixed(0, 3));
  }

  function updateProgress(value: number) {
    setProgress(value);
    const real = Number(Big(value).times(max).div(100).toFixed(0, 3));
    onChange?.(Math.max(1, Math.min(real, max)));
  }

  function handlePositionClick(position: number) {
    updateProgress(position);
  }

  function handleChange(event: any) {
    updateProgress(event.target.value);
  }

  function genNum(max: number, v: number) {
    return Number(Big(max).div(100).times(v).toFixed(0, 3));
  }

  return (
    <Wrap className="progress-bar dark" $color={color ?? '--mint-green'}>
      <div className="position-relative">
        <div className="line" />
        <div className="high-light-line position-absolute" style={{width: `${progress}%`}} />
      </div>
      <div className="dot-box position-absolute">
        <div className="dots df aic jcsb">
          {options.map((op) => (
            <StyledDot
              key={op}
              className={`dot cp ${progress >= op ? 'active' : ''}`}
              onClick={() => handlePositionClick(genNum(max, op))}
              $leverage={genNum(max, op) + util}
            />
          ))}
        </div>
      </div>
      <input max="100" min="0" value={progress} onChange={handleChange} step="1" type="range" />
    </Wrap>
  );
}
