import {assets$, contractMap$} from '@/config';
import {referencePrice$ as reference$} from '@/subscription/reference-price';
import {marketApi} from '@rx/api/market';
import {Subject, combineLatest} from 'rxjs';
import {map} from 'rxjs/operators';

const price$ = new Subject();

export const referencePrice$ = combineLatest([price$, assets$, contractMap$]).pipe(
  map(([price, assets, contractMap]) => mergeData(price, assets, contractMap))
);

reference$.subscribe(price$);

export async function load() {
  const {data} = await marketApi.referencePrice();
  if (data) {
    price$.next(data);
  }
}

function mergeData(
  price: Record<string, any>,
  assets: ConfigCategory[],
  contractMap: Record<string, ConfigCategory[]>
): ReferencePriceRecord[] {
  return assets.reduce((arr, asset) => {
    const list = [];
    const contracts = contractMap[asset.symbolCategory] ?? [];
    list.push({
      token: asset.symbolCategory,
      parent: null,
      ...(price?.[asset.symbolCategory] ?? {}),
    });
    contracts.forEach((c) => {
      list.push({
        token: c.symbolCategory,
        parent: asset.symbolCategory,
        ...(price?.[c.symbolCategory] ?? {}),
      });
    });

    return [...arr, ...list];
  }, []);
}
