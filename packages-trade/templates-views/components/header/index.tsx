import {H5Menu} from '@/components/header/H5Menu';
import {Menu} from '@/components/header/Menu';
import {ConnectButton} from '@rx/components/wallet';
import {Mint} from '@rx/components/wallet/Mint';
import {HOME_IMAGES} from '@rx/const/images';
import {env} from '@rx/env';
import {clsx} from 'clsx';
import {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';

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
          <div className="flex flex-row items-center gap-8px">
            <img
              className="min-w-94px min-h-24px h-24px w-auto"
              src={HOME_IMAGES.LOGO}
              alt="RateX"
            />
            {env.isTestNet && (
              <div className="font-size-12px px-4px rounded-2px text-green-500 bg-gray-80">
                Testnet
              </div>
            )}
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
            {(env.isTestNet || env.isLocal) && (
              <Link
                className="flex flex-row items-center gap-10px flex-nowrap bg-gray-80 rounded-16px p-4px pr-8px font-size-12px lh-12px text-gray-600"
                to="https://static.rate-x.io/3rd/learn/Solana%20Test%20Tokens%20&%20Rate-X%20Test%20Tokens%20Collection%20Guide.pdf"
                target="_blank"
              >
                <img
                  src="https://static.rate-x.io/img/v1/c8d89a/x.svg"
                  width={18}
                  height={18}
                  alt="rate-x"
                />
                How do I get a test token?
              </Link>
            )}
            <Mint />
            <ConnectButton />
          </div>
        </nav>
      </header>
      <H5Menu show={show} onChange={(s) => setShow(s)} />
    </>
  );
}
