import {StyledWalletConnected} from '@/components/styles';
import {useConnect} from '@/hooks/use-connect';
import {abbreviateString} from '@/utils/string';
import {IMAGES} from '@rx/const/images';
import {env} from '@rx/env';
import {useLang} from '@rx/hooks/use-lang';
import {lang as clang} from '@rx/lang/common.lang';
import {Button, Dropdown} from '@rx/widgets';
import React from 'react';

const ConnectWalletButton: React.FC = () => {
  const {LG} = useLang();
  const {connected, address, onConnect, onDisconnect} = useConnect();

  if (connected) {
    return (
      <Dropdown
        contentStyle={{background: '#0A253D'}}
        content={
          <Button style={{width: '100%'}} onClick={onDisconnect}>
            {LG(clang.Disconnect)}
          </Button>
        }
      >
        <StyledWalletConnected className="dif fdr aic gap10px border-rd-4px fw700 cp">
          <img className="dib" src={IMAGES.sol} alt="sol" />
          <span className="T3">{abbreviateString(address as string)}</span>
          <i className="iconfont T3">&#xe624;</i>
        </StyledWalletConnected>
      </Dropdown>
    );
  }

  return (
    <Button className="min-w160px font-size-18px" onClick={onConnect}>
      {LG(clang.Connect)}
    </Button>
  );
};

export function ConnectButton() {
  if (env.isServer) {
    return null;
  }

  return <ConnectWalletButton />;
}
