import {ReactNode, useEffect, useState} from 'react';

export const Delay = ({delay, children}: {delay: number; children: ReactNode}) => {
  const [isShown, setIsShown] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsShown(true);
    }, delay * 1000);

    return () => clearTimeout(timer);
  }, [delay]);

  if (!isShown) {
    return null;
  }

  return <>{children}</>;
};
