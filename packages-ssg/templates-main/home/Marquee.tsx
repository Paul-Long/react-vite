import {clsx} from 'clsx';
import React, {useEffect, useRef, useState} from 'react';

export const MarqueeDivs = ({children, speed = 0.5}: any) => {
  const marqueeRef = useRef(null);
  const [shouldDuplicate, setShouldDuplicate] = useState(false);
  const [contentWidth, setContentWidth] = useState(0);
  const animationFrameRef = useRef<any>(null);

  useEffect(() => {
    const marqueeElem: any = marqueeRef.current;

    const updateDimensions = () => {
      setTimeout(() => {
        const childrenWidth: any = Array.from(marqueeElem.children).reduce((total, child: any) => {
          return total + child.offsetWidth;
        }, 0);

        setContentWidth(childrenWidth);
        setShouldDuplicate(childrenWidth > marqueeElem.offsetWidth);
      }, 100);
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);

    const moveMarquee = () => {
      if (shouldDuplicate) {
        // 如果滚动到了复制的子元素的开始位置，就跳回到真实的开始位置
        if (marqueeElem.scrollLeft >= contentWidth) {
          marqueeElem.scrollLeft = 0;
        } else {
          marqueeElem.scrollLeft += speed;
        }
      }

      animationFrameRef.current = requestAnimationFrame(moveMarquee);
    };

    animationFrameRef.current = requestAnimationFrame(moveMarquee);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      window.removeEventListener('resize', updateDimensions);
    };
  }, [speed, shouldDuplicate]); // 移除 contentWidth 作为依赖项

  // 渲染两次子元素，第二次是为了循环滚动
  const renderChildren = () => {
    return (
      <>
        {React.Children.map(children, (child, index) => (
          <div key={index} className="inline-block mr-4">
            {child}
          </div>
        ))}
        {shouldDuplicate &&
          React.Children.map(children, (child, index) => (
            <div key={`duplicate-${index}`} className="inline-block mr-4">
              {child}
            </div>
          ))}
      </>
    );
  };

  return (
    <div
      className={clsx('flex flex-row overflow-hidden whitespace-nowrap w-full', [
        shouldDuplicate ? 'justify-start' : 'justify-center',
      ])}
      ref={marqueeRef}
    >
      {renderChildren()}
    </div>
  );
};
