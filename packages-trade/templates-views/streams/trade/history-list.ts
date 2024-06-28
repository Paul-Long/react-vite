import {tradeApi} from '@rx/api/trade';
import {BehaviorSubject, startWith, switchMap} from 'rxjs';

export const queryHistory$ = new BehaviorSubject({pageNum: 0, pageSize: 10, address: ''});
export const loading$ = new BehaviorSubject(false);

export const histories$ = queryHistory$.pipe(
  switchMap((params) => query(params)),
  startWith({total: 0, data: []})
);

async function query(params: {pageNum: number; pageSize: number; address: string}) {
  if (!params.address) {
    return {total: 0, data: [], ...params};
  }
  loading$.next(true);
  const res: Record<string, any> = await tradeApi.loadOrderHistory(params);
  setTimeout(() => {
    loading$.next(false);
  }, 50);
  return {total: res?.reply?.totalSize ?? 0, data: res?.data || [], ...params};
}
