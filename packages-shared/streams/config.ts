import {sendToWorker} from '@/worker';
import {configApi} from '@rx/api/config';
import {epochApi} from '@rx/api/epoch';
import {WS_URL} from '@rx/const/urls';
import {numUtil} from '@rx/helper/num';
import {Big} from 'big.js';
import {BehaviorSubject} from 'rxjs';

const _assets$ = new BehaviorSubject<ConfigCategory[]>([]);
export const assets$ = _assets$.asObservable();

const _contractMap$ = new BehaviorSubject<Record<string, ConfigCategory[]>>({});
export const contractMap$ = _contractMap$.asObservable();

const _maturityMap$ = new BehaviorSubject<Record<string, ConfigSymbol[]>>({});
export const maturityMap$ = _maturityMap$.asObservable();
const _symbolMapById$ = new BehaviorSubject<Record<string, ConfigSymbol>>({});
export const symbolMapById$ = _symbolMapById$.asObservable();

const _contracts$ = new BehaviorSubject<ConfigSymbol[]>([]);
export const contracts$ = _contracts$.asObservable();

export async function loadConfig() {
  const [{categories, symbols}, {ttm}] = await Promise.all([
    configApi.config().then(({data}) => data),
    epochApi.startTime().then(({data}) => data),
  ]);
  const assets = [];
  const contractMap = {};
  const maturityMap = {};
  const symbolMapById = {};

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

  const contracts = symbols.map((symbol: ConfigSymbol) => {
    const {symbolLevel1Category, symbolLevel2Category, term} = symbol;
    const key = `${symbolLevel1Category}-${symbolLevel2Category}`;
    if (!maturityMap[key]) {
      maturityMap[key] = [];
    }
    const data = {...symbol, ...calcTTM(ttm, symbol)};
    maturityMap[key].push(data);
    symbolMapById[symbol.id] = data;
    maturityMap[key].sort((a, b) => a.sort - b.sort);
    return data;
  });

  console.log('Assets : ', assets);
  console.log('ContractMap : ', contractMap);
  console.log('MaturityMap : ', maturityMap);
  console.log('Symbols : ', contracts);

  _assets$.next(assets);
  _contractMap$.next(contractMap);
  _maturityMap$.next(maturityMap);
  _symbolMapById$.next(symbolMapById);
  _contracts$.next(contracts);
  sendToWorker({type: 'foundation-data', url: WS_URL});
}

function calcTTM(time: number, contract: ConfigSymbol) {
  const {dueDate} = contract;
  const due = new Date(dueDate);
  const maturity = Date.UTC(
    due.getFullYear(),
    due.getMonth(),
    due.getDate(),
    due.getHours(),
    due.getMinutes(),
    due.getSeconds()
  );

  const days = Big(maturity)
    .minus(time)
    .div(60 * 60 * 24 * 1000);
  if (days.gt(Big(365))) {
    return {
      ttm: numUtil.trimEnd0(days.div(365).toFixed(2, 0)),
      unit: 'years',
      days: days.toNumber(),
      seconds: Big(maturity).minus(time).div(1000).round(0, 0).toNumber(),
    };
  }
  return {
    ttm: numUtil.trimEnd0(days.toFixed(0, 0)),
    unit: 'days',
    days: days.round(2, 0).toNumber(),
    seconds: Big(maturity).minus(time).div(1000).round(0, 0).toNumber(),
  };
}
