import {Header} from '@/header';
import {ContextProvider} from '@rx/web3';
import {ToastManager} from '@rx/widgets';
import React, {useEffect} from 'react';
import {css, styled} from 'styled-components';

interface PageProps {
  children?: JSX.Element;
  showHeader?: boolean;
  title?: string;
  desc?: string;
  scrollVisible?: boolean;
}

const headerHeight = '60px';
const headerHeightResponsive = '60px';

// 共享的样式，用于响应式设计
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

const StyledHeader = styled.header<{$show?: boolean}>`
  display: ${({$show}) => ($show ? 'block' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: ${headerHeight};
  background: #fff;
  z-index: 10;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  @media (max-width: 640px) {
    height: ${headerHeightResponsive};
  }
`;

const StyledContent = styled.main<{$show?: boolean; $scrollVisible: boolean}>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  padding-top: ${headerHeight};
  box-sizing: border-box;
  background: var(--dark-blue);

  ${responsiveStyles}
  ${({$scrollVisible}) => {
    if ($scrollVisible) {
      return css`
        overflow: auto;
      `;
    }
    return css`
      overflow: hidden;
    `;
  }}
`;

export const Page: React.FC<PageProps> = ({
  children,
  showHeader = true,
  title,
  desc,
  scrollVisible = true,
}) => {
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
      <StyledHeader $show={showHeader}>
        <Header />
      </StyledHeader>
      <StyledContent $show={showHeader} $scrollVisible={scrollVisible}>
        {children}
      </StyledContent>
      <ToastManager />
    </ContextProvider>
  );
};
