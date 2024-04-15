import {Deposit} from '@/views/contracts/Deposit';
import {StyledWrap} from '@/views/contracts/styles';
import {ConnectButton} from '@rx/components/wallet';
import {MockMintToAccount} from '@rx/web3/components/MockMintToAccount';

export function Demo() {
  return (
    <div className="df fdr jcc w100% gap48px">
      <div className="df fdc aic w400px gap32px">
        <StyledWrap className="df fdr jcfe">
          <ConnectButton />
        </StyledWrap>
        <MockMintToAccount />
        <Deposit />
      </div>
      <div className="df fdc aic w600px gap32px"></div>
    </div>
  );
}
