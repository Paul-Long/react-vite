import {ReactNode} from 'react';

interface Props {
  children?: ReactNode;
}
export function Content(props: Props) {
  return (
    <div className="w-100% overflow-hidden">
      <div className="relative w-1200px mx-auto">
        <img
          className="rotate-animation hidden sm:block absolute left-10% top-[-240px] z-[-1]"
          src="//static.rate-x.io/img/v1/2160b9/home-bg-1.png"
          alt=""
          width={1920}
        />
      </div>
      <div className="w-100% bg-#00000033 backdrop-filter backdrop-blur-160px min-h-100% overflow-x-auto">
        {props.children}
      </div>
    </div>
  );
}
