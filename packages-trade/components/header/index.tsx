// Header.tsx
import {Logo} from '@/components/Logo';
import {H5Menu} from '@/header/H5Menu';
import {Setting} from '@/header/Setting';
import {loginApi} from '@rx/api/login';
import {ConnectButton} from '@rx/components/wallet';
import {writeToken} from '@rx/helper/token';
import {checkAuth} from '@rx/streams/auth';
import {Toast} from '@rx/widgets';
import React, {useCallback} from 'react';
import {styled} from 'styled-components';
import {Navigation} from './Navigation';

// 创建一个styled组件，用于Header的容器
const HeaderContainer = styled.header`
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px 0 0;
  @media (max-width: 640px) {
    height: 40px;
    padding: 10px 24px;
  }
`;

// Header组件
export const Header: React.FC = () => {
  const handleLogin = useCallback(async (params: SignResult) => {
    const {data} = await loginApi.login(params);
    if (data) {
      writeToken(data.token);
      Toast.success('Login Success');
      await Promise.all([checkAuth()]);
    }
  }, []);
  return (
    <HeaderContainer className="B2">
      <Logo />
      <Navigation />
      <div className="df fdr aic g20 xs:g16">
        <ConnectButton />
        <Setting />
        <H5Menu />
      </div>
    </HeaderContainer>
  );
};
