import {MouseEvent, useCallback, useMemo, useState} from 'react';

export function useMouseMask() {
  const [state, setState] = useState<{x: number; y: number}>({x: 0, y: 0});

  const maskImage = useMemo(() => {
    return `radial-gradient(256px at ${state.x}px ${state.y}px, #14F195, transparent)`;
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
