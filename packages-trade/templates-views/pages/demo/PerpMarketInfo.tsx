import {StyledWrap} from '@/pages/demo/styles';
import {useStream} from '@rx/hooks/use-stream';
import {rateXClient$} from '@rx/web3/streams/rate-x-client';
import {Button} from '@rx/widgets';
import {useCallback, useState} from 'react';

export function PerpMarketInfo() {
  const [client] = useStream(rateXClient$);
  const [state, setState] = useState<any>({
    0: {tickCurrentIndex: '', tokenVaultA: 0, tokenVaultB: 0},
    1: {tickCurrentIndex: '', tokenVaultA: 0, tokenVaultB: 0},
    2: {tickCurrentIndex: '', tokenVaultA: 0, tokenVaultB: 0},
    3: {tickCurrentIndex: '', tokenVaultA: 0, tokenVaultB: 0},
    4: {tickCurrentIndex: '', tokenVaultA: 0, tokenVaultB: 0},
  });
  const query = useCallback(async () => {
    if (!client) {
      return;
    }
    const info0 = await client?.getPerpMarketInfo({marketIndex: 0});
    const info1 = await client?.getPerpMarketInfo({marketIndex: 1});
    const info2 = await client?.getPerpMarketInfo({marketIndex: 2});
    const info3 = await client?.getPerpMarketInfo({marketIndex: 3});
    const info4 = await client?.getPerpMarketInfo({marketIndex: 4});
    setState({0: info0, 1: info1, 2: info2, 3: info3, 4: info4});
  }, [client]);
  return (
    <StyledWrap className="flex flex-col gap-24px">
      <div className="font-size-18px fw-semibold">PerpMarket Vault </div>
      {['0', '1', '2', '3', '4'].map((k) => (
        <div className="flex flex-row items-start" key={k}>
          <div className="px-10px">Market Index {k}</div>
          <div className="flex flex-col">
            <div>TickCurrentIndex: {state?.[k].tickCurrentIndex}</div>
            <div>TokenVaultA: {state?.[k].tokenVaultA}</div>
            <div>TokenVaultB: {state?.[k].tokenVaultB}</div>
          </div>
        </div>
      ))}

      <Button className="font-size-16px" onClick={() => query()}>
        Query Info
      </Button>
    </StyledWrap>
  );
}
