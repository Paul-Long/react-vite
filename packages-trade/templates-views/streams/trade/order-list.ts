import {symbolMapById$} from '@rx/streams/config';
import {RateClient} from '@rx/web3/sdk';
import {clientReady$, rateXClient$} from '@rx/web3/streams/rate-x-client';
import {Subject, combineLatest, startWith, switchMap} from 'rxjs';

export const queryOrders$ = new Subject();
const _query$ = queryOrders$.pipe(startWith(0));

export const orders$ = combineLatest([rateXClient$, symbolMapById$, clientReady$, _query$]).pipe(
  switchMap(([client, symbolMap, ready]) => query(client, symbolMap, ready))
);

async function query(client: RateClient, symbolMap: Record<string, ConfigSymbol>, ready: boolean) {
  if (!client || !ready) {
    return [];
  }
  const orders = await client.getAllOrders();
  return orders?.map((o: Record<string, any>) => ({...o, ...(symbolMap?.[o.marketIndex] || {})}));
}
