import {Header} from '@/views/page/header';
import {ContextProvider} from '@rx/web3';
import {ToastManager} from '@rx/widgets';
import {Outlet} from 'react-router-dom';
import {styled} from 'styled-components';

const Page = styled.main`
  font-family: 'Helvetica Neue', Helvetica, PingFangSC, -apple-system, 'Hiragino Sans GB',
    'Microsoft YaHei', '微软雅黑', Arial;
`;

export default function () {
  return (
    <ContextProvider>
      <Page className="flex min-h-screen flex-col items-center bg-#09090A">
        <Header />
        <Outlet />
      </Page>
      <ToastManager />
    </ContextProvider>
  );
}
