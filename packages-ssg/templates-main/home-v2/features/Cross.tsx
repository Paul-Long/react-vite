import {clsx} from 'clsx';

export function Cross({className, direction}: any) {
  return (
    <div
      className={clsx(
        'absolute w-15px h-15px box-border z-1',
        [direction === 'tl' && 'top-[-8px] left-[-8px]'],
        [direction === 'bl' && 'bottom-[-8px] left-[-8px]'],
        [direction === 'tr' && 'top-[-8px] right-[-8px]'],
        [direction === 'br' && 'bottom-[-8px] right-[-8px]'],
        className
      )}
    >
      <img
        className="w-15px h-15px"
        src="https://static.rate-x.io/img/v1/360e32/cross.svg"
        alt=""
      />
      <div className="absolute top-5px left-5px w-5px h-5px bg-#09090A" />
    </div>
  );
}
