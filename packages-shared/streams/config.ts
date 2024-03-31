import {sendToWorker} from '@/worker';
import {configApi} from '@rx/api/config';
import {WS_URL} from '@rx/const/urls';
import {BehaviorSubject} from 'rxjs';

const _assets$ = new BehaviorSubject<ConfigCategory[]>([]);
export const assets$ = _assets$.asObservable();

const _contractMap$ = new BehaviorSubject<Record<string, ConfigCategory[]>>({});
export const contractMap$ = _contractMap$.asObservable();

const _maturityMap$ = new BehaviorSubject<Record<string, ConfigSymbol[]>>({});
export const maturityMap$ = _maturityMap$.asObservable();

const _contracts$ = new BehaviorSubject([]);
export const contracts$ = _contracts$.asObservable();

export async function loadConfig() {
  const [{categories, symbols}] = await Promise.all([configApi.config().then(({data}) => data)]);
  const assets = [];
  const contractMap = {};
  const maturityMap = {};

  categories.forEach((category: ConfigCategory) => {
    const {level, parentSymbolCategory} = category;
    const key = parentSymbolCategory;
    if (level === 1) {
      assets.push(category);
    } else {
      if (!contractMap[key]) {
        contractMap[key] = [];
      }
      contractMap[key].push(category);
      contractMap[key].sort((a, b) => a.sort - b.sort);
    }
  });

  symbols.forEach((symbol: ConfigSymbol) => {
    const {symbolLevel1Category, symbolLevel2Category, term} = symbol;
    const key = `${symbolLevel1Category}-${symbolLevel2Category}`;
    if (!maturityMap[key]) {
      maturityMap[key] = [];
    }
    maturityMap[key].push(symbol);
    maturityMap[key].sort((a, b) => a.sort - b.sort);
  });

  console.log('Assets : ', assets);
  console.log('ContractMap : ', contractMap);
  console.log('MaturityMap : ', maturityMap);

  _assets$.next(assets);
  _contractMap$.next(contractMap);
  _maturityMap$.next(maturityMap);
  _contracts$.next(symbols);
  sendToWorker({type: 'foundation-data', url: WS_URL});
}
