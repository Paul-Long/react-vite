import {positionUpdate$} from '@rx/streams/subscription/position.ts';
import {RateClient} from '@rx/web3/sdk';
import {rateXClient$} from '@rx/web3/streams/rate-x-client.ts';
import {Big} from 'big.js';
import {
  BehaviorSubject,
  combineLatest,
  shareReplay,
  startWith,
  switchMap,
  throttleTime,
  timer,
} from 'rxjs';

const source = timer(0, 60 * 1000);

export const query$ = new BehaviorSubject(0);
positionUpdate$.subscribe(() => query$.next(0));

export const positions$ = combineLatest([rateXClient$, query$, source]).pipe(
  throttleTime(100),
  switchMap(([client]: any) => getPositions(client)),
  startWith([]),
  shareReplay()
);

async function getPositions(client: RateClient) {
  if (!client || !client?.isReady) {
    return [];
  }
  return await client.getAllPositions();
}

// combineLatest([positions$, twap$]).subscribe(([positions, twap]) => {
//   console.log('positions :  ', positions);
//   console.log('twap : ', twap);
// });

function calcPositionValue(positions: any[], twapMap: any) {
  let assetYT = Big(0);
  let assetST = Big(0);
  let liabilityYT = Big(0);
  let liabilityST = Big(0);
  for (let i = 0; i < positions.length; i++) {
    const p = positions[i];
    const marketIndex = p.marketIndex;
    const price = Big(Math.abs(p.quoteAssetAmount)).div(Math.abs(p.baseAssetAmount));
    if (p.baseAssetAmount > 0) {
      assetYT = assetYT.add(p.baseAssetAmount);
    } else {
      liabilityYT = liabilityYT.add(Math.abs(p.baseAssetAmount));
    }

    if (p.quoteAssetAmount > 0) {
      assetST = assetST.add(p.quoteAssetAmount);
    } else {
      liabilityST = liabilityST.add(Math.abs(p.quoteAssetAmount));
    }
  }
}
