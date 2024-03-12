// Header.tsx
import {Setting} from '@/header/Setting';
import {IMAGES} from '@rx/const/images';
import {ConnectButton} from '@rx/web3';
import React from 'react';
import {styled} from 'styled-components';
import {Navigation} from './Navigation';

// 创建一个styled组件，用于Header的容器
const HeaderContainer = styled.header`
  backdrop-filter: blur(10px);
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media (max-width: 640px) {
    height: 40px;
    padding: 0 20px;
  }
`;

// Logo组件
const Logo = styled.div`
  // Logo样式
  width: 150px;
  height: 100%;
  min-width: 150px;
  max-width: 150px;
  border-right: 1px solid rgba(0, 0, 0, 0.3);
`;

// Header组件
export const Header: React.FC = () => {
  return (
    <HeaderContainer className="B2">
      <Logo className="df jcc aic">
        <img className="db" src={IMAGES.logo} alt="RateX" height={28} />
      </Logo>
      <Navigation />
      <div className="df fdr aic g20 pr24px">
        <ConnectButton />
        <Setting />
      </div>
    </HeaderContainer>
  );
};
