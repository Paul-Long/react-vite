import {Header} from '@/header';
import {WalletModal} from '@rx/components/wallet';
import {AutoConnect} from '@rx/components/wallet/AutoConnect';
import {ContextProvider} from '@rx/web3';
import {ToastManager} from '@rx/widgets';
import React, {ReactNode, useEffect} from 'react';
import {css, styled} from 'styled-components';

interface PageProps {
  children?: ReactNode;
  showHeader?: boolean;
  title?: string;
  desc?: string;
  scrollVisible?: boolean;
}

const headerHeight = '60px';
const headerHeightResponsive = '60px';

const responsiveStyles = css<{$show?: boolean}>`
  @media (max-width: 640px) {
    padding: 0 16px;

    ${({$show}) =>
      $show &&
      css`
        margin-top: ${headerHeightResponsive};
      `}

    ${({$show}) =>
      !$show &&
      css`
        margin-top: 0;
      `}
  }
`;

const StyledContent = styled.main<{$show?: boolean; $scrollVisible?: boolean}>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  padding-top: ${headerHeight};
  box-sizing: border-box;

  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
  .rotate-animation {
    transform-origin: 60% 60%;
    animation: rotate 120s linear infinite;
  }

  ${responsiveStyles}
`;

export const Page: React.FC<PageProps> = ({
  children,
  showHeader = true,
  title,
  desc,
  scrollVisible = true,
}) => {
  useEffect(() => {
    const loadingEle: HTMLElement | null = document.getElementById('page-loading');
    if (loadingEle) {
      loadingEle.style.transition = 'opacity 0.2s';
      loadingEle.style.opacity = '0';
      setTimeout(() => {
        loadingEle?.parentNode?.removeChild(loadingEle);
      }, 200);
    }
  }, []);
  useEffect(() => {
    if (title) {
      document.title = title;
    }
    if (desc) {
      let metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', desc);
      } else {
        metaDescription = document.createElement('meta');
        metaDescription.setAttribute('name', 'description');
        metaDescription.setAttribute('content', desc);
        document.head.appendChild(metaDescription);
      }
    }
  }, [title, desc]);

  return (
    <ContextProvider>
      <Header />
      <StyledContent className="flex bg-black">{children}</StyledContent>
      <ToastManager />
      <AutoConnect />
      <WalletModal />
    </ContextProvider>
  );
};
