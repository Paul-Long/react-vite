import {StyledWrap} from '@/pages/demo/styles';
import {useStream} from '@rx/hooks/use-stream';
import {rateXClient$} from '@rx/web3/streams/rate-x-client';
import {Button} from '@rx/widgets';
import {useCallback, useState} from 'react';

export function PerpMarketInfo() {
  const [client] = useStream(rateXClient$);
  const [state, setState] = useState<any>({
    8: {tickCurrentIndex: '', tokenVaultA: 0, tokenVaultB: 0},
    9: {tickCurrentIndex: '', tokenVaultA: 0, tokenVaultB: 0},
    11: {tickCurrentIndex: '', tokenVaultA: 0, tokenVaultB: 0},
    12: {tickCurrentIndex: '', tokenVaultA: 0, tokenVaultB: 0},
    13: {tickCurrentIndex: '', tokenVaultA: 0, tokenVaultB: 0},
  });
  const query = useCallback(async () => {
    if (!client) {
      return;
    }
    const info0 = await client?.getPerpMarketInfo({marketIndex: 8});
    const info1 = await client?.getPerpMarketInfo({marketIndex: 9});
    const info2 = await client?.getPerpMarketInfo({marketIndex: 11});
    const info3 = await client?.getPerpMarketInfo({marketIndex: 12});
    const info4 = await client?.getPerpMarketInfo({marketIndex: 13});
    setState({8: info0, 9: info1, 11: info2, 12: info3, 13: info4});
  }, [client]);
  return (
    <StyledWrap className="flex flex-col gap-24px">
      <div className="font-size-18px fw-semibold">PerpMarket Vault </div>
      {['8', '9', '11', '12', '13'].map((k) => (
        <div className="flex flex-row items-start" key={k}>
          <div className="px-10px">Market Index {k}</div>
          <div className="flex flex-col">
            <div>TickCurrentIndex: {state?.[k].tickCurrentIndex}</div>
            <div>IndexPrice: {state?.[k].currentIndexPrice}</div>
            <div>SqrtPrice: {state?.[k].sqrtPrice}</div>
            <div>Liquidity: {state?.[k].liquidity}</div>
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
