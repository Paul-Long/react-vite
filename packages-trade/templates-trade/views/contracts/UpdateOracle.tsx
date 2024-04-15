import {walletModalVisible$} from '@rx/streams/wallet';
import {useConnect} from '@rx/web3/hooks/use-connect';
import {useUpdateOracle} from '@rx/web3/hooks/use-update-oracle';
import {Button, NumberInput, Toast} from '@rx/widgets';
import {useCallback, useState} from 'react';
import {StyledWrap} from './styles';

export function UpdateOracle() {
  const [marketRate, setMarketRate] = useState(1);
  const [rate, setRate] = useState(1);
  const [tx, setTx] = useState<string>('');
  const {connected} = useConnect();
  const {submit} = useUpdateOracle({
    onFinish(t: string) {
      setTx(t);
    },
  });

  const handleSubmit = useCallback(() => {
    if (!connected) {
      walletModalVisible$.next(true);
      return;
    }
    if (marketRate <= 0 || rate <= 0) {
      Toast.warn('Please input rate');
      return;
    }
    submit(Number(marketRate), Number(rate)).then();
  }, [connected, marketRate, rate]);

  return (
    <StyledWrap className="df fdc gap24px">
      <p className="w100% text-wrap" style={{wordWrap: 'break-word'}}>
        TX: {tx}
      </p>
      <div className="df fdr aic gap12px">
        <div>Market Rate :</div>
        <NumberInput
          className="flex-1"
          value={marketRate}
          precision={4}
          onChange={(v: number) => setMarketRate(v)}
          style={{paddingLeft: 10, paddingRight: 10, fontSize: 16, fontWeight: 500}}
        />
        <div>rate :</div>
        <NumberInput
          className="flex-1"
          value={rate}
          precision={4}
          onChange={(v: number) => setRate(v)}
          style={{paddingLeft: 10, paddingRight: 10, fontSize: 16, fontWeight: 500}}
        />
      </div>
      <div className="df jcfe">
        <Button className="font-size-16px" width="auto" onClick={handleSubmit}>
          Update Oracle
        </Button>
      </div>
    </StyledWrap>
  );
}
