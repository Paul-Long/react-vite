import {HeaderLiquidityIcon} from '@rx/components/icons/HeaderLiquidityIcon';
import {HeaderMarketIcon} from '@rx/components/icons/HeaderMarketIcon';
import {HeaderTradeYieldIcon} from '@rx/components/icons/HeaderTradeYieldIcon';
import {ConnectButton} from '@rx/components/wallet';
import {SLUGS} from '@rx/const/slugs';
import {useFixLink} from '@rx/hooks/use-fix-link';
import {useStream} from '@rx/hooks/use-stream';
import {url$} from '@rx/streams/url';
import {clsx} from 'clsx';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {useNavigate} from 'react-router-dom';

export function Header() {
  const [url] = useStream(url$);
  const {fixLink} = useFixLink();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const [page, setPage] = useState<string>('Trade');
  const [menu, setMenu] = useState<string>('');

  const menus = useMemo(() => Menus, []);
  const subMenus = useMemo(() => {
    return Menus.find((m) => m.value === page)?.children || [];
  }, [page, menu, url]);

  useEffect(() => {
    [...Menus, {value: 'Account', link: SLUGS.Account, children: []}].forEach(
      ({link, children, value}) => {
        if (url.slug === '/') {
          const menu = children?.find((m) => m.link == url.slug);
          if (menu) {
            setPage(value);
            setMenu(menu.value);
            return;
          }
        }
        if (url?.slug?.startsWith(link) && link !== '/') {
          setPage(value);
          return;
        }
        const menu = children?.find((m) => url?.slug?.startsWith(m.link) && m.link !== '/');
        if (menu) {
          setPage(value);
          setMenu(menu.value);
        }
      }
    );
  }, [url]);

  const handlePageChange = useCallback(
    (menu: Record<string, any>) => (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      setPage(menu.value);
      if (menu.link) {
        navigate(fixLink(menu.link));
        return;
      }
      if (menu.children?.length > 0 && menu.children[0].link) {
        setMenu(menu.children[0].value);
        navigate(fixLink(menu.children[0].link));
        return;
      }
    },
    [menus]
  );

  const handleMenuChange = useCallback(
    (menu: Record<string, any>) => (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      setMenu(menu.value);
      if (menu.link) {
        navigate(fixLink(menu.link));
      }
    },
    [subMenus]
  );

  return (
    <nav className={clsx('sticky top-0 z-20 bg-#09090A w-full', [show && 'min-h-screen'])}>
      <div className="sticky top-0 mx-auto px-0 bg-#09090A sm:border-b-1px sm:border-b-solid sm:border-#2C2D2D sm:static">
        <div className="relative flex h-60px items-center justify-between">
          <div className="flex h-full flex-1 items-center justify-start sm:items-stretch sm:justify-start">
            <div className="flex h-full flex-shrink-0 items-center bg-lime-500 px-12px sm:px-52px">
              <img
                className="h-8 w-auto"
                src="https://static.rate-x.io/img/v1/e1e9e5/logo_black.svg"
                alt="Your Company"
              />
            </div>
            <div className="hidden h-full flex-1 justify-center sm:ml-6 sm:flex">
              <div className="flex h-full items-center">
                {menus.map((mu) => (
                  <a
                    key={mu.value}
                    onClick={handlePageChange(mu)}
                    className={clsx(
                      'h-full box-border px-3 py-5 hover:bg-#121313 hover:text-white',
                      [mu.value === page ? 'bg-#121313 text-white' : 'text-gray-60']
                    )}
                    aria-current="page"
                  >
                    {mu.text}
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center gap-1 sm:gap-3 pr-2 box-border sm:static sm:inset-auto sm:ml-6 sm:pr-6">
            <a
              href="javascript:void(0);"
              onClick={handlePageChange({value: 'Account', link: SLUGS.Account})}
              className={clsx(
                'hidden sm:block h-full box-border px-3 py-5 hover:bg-#121313 hover:text-white',
                ['Account' === page ? 'bg-#121313 text-white' : 'text-gray-60']
              )}
              aria-current="page"
            >
              Account
            </a>

            {/* Profile dropdown */}
            <div className="user-profile relative">
              <ConnectButton />
            </div>
            <button
              type="button"
              className="relative inline-flex items-center justify-center rounded-md p-2 text-white focus:outline-none sm:hidden"
              aria-controls="mobile-menu"
              aria-expanded="false"
              onClick={() => setShow((prevState) => !prevState)}
            >
              {/*
                Icon when menu is closed.
                Menu open: "hidden", Menu closed: "block"
              */}
              <svg
                className={clsx('h-6 w-6 outline-none', [show ? 'hidden' : 'block'])}
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
                data-slot="icon"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
              {/*
                Icon when menu is open.
                Menu open: "block", Menu closed: "hidden"
              */}
              <svg
                className={clsx('h-6 w-6 outline-none', [show ? 'block' : 'hidden'])}
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
                data-slot="icon"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
        <div
          className={clsx('h-50px justify-center bg-#121313', [
            subMenus.length > 0 ? 'hidden sm:flex' : 'hidden',
          ])}
        >
          <div className="flex h-full items-center">
            {subMenus.map((mu) => (
              <a
                key={mu.value}
                onClick={handleMenuChange(mu)}
                className={clsx(
                  'h-full box-border px-3 py-6px gap-8px hover:bg-gray-700 hover:text-white',
                  menu === mu.value ? 'text-white' : 'text-gray-60'
                )}
                aria-current="page"
              >
                <div
                  className={clsx('h-full flex flex-row items-center border-b-2px border-b-solid', [
                    menu === mu.value ? 'border-lime-500' : 'border-transparent',
                  ])}
                >
                  <mu.Icon
                    width={16}
                    height={16}
                    color={menu === mu.value ? '#8DCC2F' : '#F6F7F399'}
                  />
                  {mu.text}
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state. */}
      <div className={clsx('sm:hidden', [show ? 'block' : 'hidden'])} id="mobile-menu">
        <div className="space-y-1 px-2 pb-3 pt-2">
          {menus.map((mu) =>
            !!mu.children?.length ? (
              <div className="flex flex-col box-border gap-1" key={mu.value}>
                <a
                  href="javascript:void(0);"
                  key={mu.value}
                  className="block rounded-md bg-gray-900 px-3 py-2 text-base text-white"
                  aria-current="page"
                >
                  {mu.text}
                </a>
                {mu.children.map((sub) => (
                  <a
                    href="javascript:void(0);"
                    key={sub.value}
                    className="block rounded-md bg-gray-900 px-3 py-2 ml-4 text-base text-white"
                    aria-current="page"
                  >
                    {sub.text}
                  </a>
                ))}
              </div>
            ) : (
              <a
                href="javascript:void(0);"
                key={mu.value}
                className="block rounded-md bg-gray-900 px-3 py-2 text-base text-white"
                aria-current="page"
              >
                {mu.text}
              </a>
            )
          )}
        </div>
      </div>
    </nav>
  );
}

const Menus = [
  {
    text: 'Trade',
    value: 'Trade',
    children: [
      {text: 'Market', value: 'Market', link: SLUGS.Home, Icon: HeaderMarketIcon},
      {text: 'Trade Yield', value: 'TradeYield', link: SLUGS.Trade, Icon: HeaderTradeYieldIcon},
      {text: 'Liquidity', value: 'Liquidity', link: SLUGS.Liquidity, Icon: HeaderLiquidityIcon},
    ],
  },
  {
    text: 'Earn',
    value: 'Earn',
    link: SLUGS.Earn,
  },
];
