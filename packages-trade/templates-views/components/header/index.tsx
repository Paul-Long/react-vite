import {H5Menu} from '@/components/header/H5Menu';
import {Menu} from '@/components/header/Menu';
import {ConnectButton} from '@rx/components/wallet';
import {Mint} from '@rx/components/wallet/Mint';
import {HOME_IMAGES} from '@rx/const/images';
import {clsx} from 'clsx';
import {useEffect, useState} from 'react';

interface Props {
  onMenuShow?: (show: boolean) => void;
  notScrollTop?: boolean;
}

export function Header(props: Props) {
  const [show, setShow] = useState<boolean>(false);

  useEffect(() => {
    props?.onMenuShow?.(show);
  }, [show]);

  return (
    <>
      <header
        className={clsx(
          'fixed top-0 left-0 right-0 z-999 box-border b-b-1px b-s-solid b-b-gray-80 backdrop-filter backdrop-blur-160px'
        )}
      >
        <nav className="mx-auto flex max-w-100% items-center justify-between px-24px gap-64px sm:h-60px">
          <div className="flex">
            <img className="h-24px w-auto" src={HOME_IMAGES.LOGO} alt="" />
          </div>
          <button
            type="button"
            className="w-32px h-32px inline-flex sm:hidden items-center justify-center rounded-md"
            onClick={() => setShow(true)}
          >
            <i className="iconfont font-size-22px text-white">&#xe607;</i>
          </button>
          <Menu />
          <div className="flex flex-row items-center gap-16px">
            <Mint />
            <ConnectButton />
          </div>
        </nav>
      </header>
      <H5Menu show={show} onChange={(s) => setShow(s)} />
    </>
  );
}
