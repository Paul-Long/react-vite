import {Deposit} from '@/views/contracts/Deposit';
import {PerpFillOrder} from '@/views/contracts/PerpFillOrder';
import {PerpPlaceOrder} from '@/views/contracts/PerpPlaceOrder';
import {StyledWrap} from '@/views/contracts/styles';
import {ConnectButton} from '@rx/components/wallet';
import {load} from '@rx/streams/market/reference-price';
import {useEffect} from 'react';
import {Withdraw} from './Withdraw';

export function Demo() {
  useEffect(() => {
    load().then();
  }, []);

  return (
    <div className="df fdc aic w100%">
      <div className="df fdc aic w500px gap32px">
        <StyledWrap className="df fdr jcfe">
          <ConnectButton />
        </StyledWrap>
        <PerpPlaceOrder />
        <PerpFillOrder />
        <Deposit />
        <Withdraw />
      </div>
    </div>
  );
}
