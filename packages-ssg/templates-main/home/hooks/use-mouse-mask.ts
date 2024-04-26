import {MouseEvent, useCallback, useMemo, useState} from 'react';

interface Props {
  size?: number;
}

export function useMouseMask(props?: Props) {
  const {size = 256} = props || {};
  const [state, setState] = useState<{x: number; y: number}>({x: 0, y: 0});

  const maskImage = useMemo(() => {
    return `radial-gradient(${size}px at ${state.x}px ${state.y}px, #14F195, transparent)`;
  }, [state]);

  const handleMouseMove = useCallback(
    ({currentTarget, clientX, clientY}: MouseEvent<HTMLDivElement>) => {
      const {left, top} = currentTarget.getBoundingClientRect();
      setState({x: clientX - left, y: clientY - top});
    },
    []
  );
  return {maskImage, handleMouseMove};
}
