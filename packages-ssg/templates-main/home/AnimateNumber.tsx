import {numUtil} from '@rx/helper/num';
import {useEffect, useRef, useState} from 'react';

export function AnimateNumber(props: {value: number}) {
  const ref = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState(0);
  const [width, setWidth] = useState(120);

  useEffect(() => {
    const duration = 1500;
    let startTime: any = null;
    function animateNumber(timestamp: number) {
      if (!startTime) startTime = timestamp;

      const progress = timestamp - startTime;
      const currentNumber = Math.min((progress / duration) * props.value, props.value);
      setValue(Math.floor(currentNumber));
      if (progress < duration) {
        requestAnimationFrame(animateNumber);
      }
    }
    const width = getTextWidth(
      `$${numUtil.delimit(props.value)}`,
      getComputedStyle(ref?.current as any).font
    );
    setWidth(width + 8);
    requestAnimationFrame(animateNumber);
  }, [ref]);

  function getTextWidth(text: string, font: string) {
    // @ts-ignore
    const canvas = getTextWidth.canvas || (getTextWidth.canvas = document.createElement('canvas'));
    const context: any = canvas.getContext('2d');
    context.font = font;
    const metrics = context.measureText(text);
    return metrics.width;
  }

  return (
    <div
      ref={ref}
      className="font-size-18px sm:font-size-30px line-height-120%"
      style={{minWidth: width}}
    >
      ${numUtil.delimit(value)}
    </div>
  );
}
