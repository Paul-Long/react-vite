import {useState, useEffect, useRef, useCallback} from 'react';
import {styled} from 'styled-components';
import {Big} from 'big.js';

const options = [0, 25, 50, 75, 100];

const Wrap = styled.div<{$color: string}>`
  position: relative;
  width: 100%;

  --base-color: ${({$color}) => $color ?? 'var(--mint-green)'};

  input[type='range'] {
    position: absolute;
    top: 0;
    width: 100%;
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

export function ProgressBar({value, max, onChange, color}) {
  const dotBoxRef = useRef<HTMLDivElement>();
  const [progress, setProgress] = useState(calculateProgress(value, max));

  useEffect(() => {
    setProgress(calculateProgress(value, max));
  }, [value, max]);

  function calculateProgress(value, max) {
    return Number(Big(value).div(max).times(100).toFixed(0, 3));
  }

  function updateProgress(value) {
    setProgress(value);
    const real = Number(Big(value).times(max).div(100).toFixed(0, 3));
    onChange?.(Math.max(1, Math.min(real, max)));
  }

  function handlePositionClick(position) {
    updateProgress(position);
  }

  function handleChange(event) {
    updateProgress(event.target.value);
  }

  function genNum(max, v) {
    return Number(Big(max).div(100).times(v).toFixed(0, 3));
  }

  const genLeft = useCallback(() => {
    if (dotBoxRef.current) {
      const width = dotBoxRef.current?.getBoundingClientRect()?.width ?? 0;
      const maxPer = Big(width - 30)
        .div(width)
        .times(100)
        .toNumber();
      if (progress > maxPer) {
        return `${maxPer}%`;
      }
      const per = Big(progress).div(100).times(width).minus(16).div(width).times(100).toNumber();
      return `${Math.max(per, 0)}%`;
    }
  }, [max, progress]);

  return (
    <Wrap className="progress-bar dark" $color={color ?? '--mint-green'}>
      <div className="position-relative">
        <div className="line" />
        <div className="high-light-line position-absolute" style={{width: `${progress}%`}} />
      </div>
      <div className="dot-box position-absolute">
        <div className="dots df aic jcsb">
          {options.map((op) => (
            <div
              key={op}
              className={`dot cp ${progress >= op ? 'active' : ''}`}
              onClick={() => handlePositionClick(genNum(max, op))}
            />
          ))}
        </div>
      </div>
      <input max="100" min="0" value={progress} onChange={handleChange} step="1" type="range" />
      <div className="dot-box mt26px">
        <div className="dots df aic jcsb" ref={dotBoxRef}>
          <div className="dot-item-active cp f12 f2 T6" style={{left: genLeft()}}>{`${genNum(
            max,
            progress
          )}X`}</div>
        </div>
      </div>
    </Wrap>
  );
}
