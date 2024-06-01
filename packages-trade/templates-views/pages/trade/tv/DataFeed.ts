import {klineApi} from '@rx/api/kline';
import {kline$} from '@rx/streams/subscription/kline';
import {Subscription} from 'rxjs';
import type {
  ErrorCallback,
  HistoryCallback,
  IDatafeedChartApi,
  IExternalDatafeed,
  LibrarySymbolInfo,
  OnReadyCallback,
  PeriodParams,
  ResolutionString,
  ResolveCallback,
  SearchSymbolsCallback,
  SubscribeBarsCallback,
  SymbolResolveExtension,
} from './charting_library';
import type {Type} from './types';

const supported_resolutions = [
  '1',
  '5',
  '15',
  '30',
  'D',
  'W',
  'M',
  '3M',
  '12M',
] as ResolutionString[];

const resolutionMap: Record<string, string> = {
  '1': '1M',
  '5': '5M',
  '15': '15M',
  '30': '30M',
  '1D': '1D',
  '1W': '1W',
  '1M': '1N',
  '1Y': '1Y',
};

export class DataFeed implements IDatafeedChartApi, IExternalDatafeed {
  to?: number;
  subscription?: Subscription;

  constructor(public type: Type) {}

  onReady(callback: OnReadyCallback): void {
    setTimeout(
      () =>
        callback({
          exchanges: [],
          supported_resolutions,
          supports_marks: false,
          supports_timescale_marks: false,
        }),
      0
    );
  }

  searchSymbols(
    userInput: string,
    exchange: string,
    symbolType: string,
    onResult: SearchSymbolsCallback
  ): void {
    onResult([]);
  }

  resolveSymbol(
    symbolName: string,
    onResolve: ResolveCallback,
    onError: ErrorCallback,
    extension?: SymbolResolveExtension | undefined
  ): void {
    console.log('resolveSymbol : ', symbolName, extension);
    setTimeout(() => onResolve(createSymbolInfo(symbolName)), 0);
  }

  getBars(
    symbolInfo: LibrarySymbolInfo,
    resolution: ResolutionString,
    {from, to, firstDataRequest}: PeriodParams,
    onResult: HistoryCallback,
    onError: ErrorCallback
  ): void {
    console.log('getBars : ', resolution, from, to, firstDataRequest);
    const _this = this;
    if (firstDataRequest) {
      new Promise(async function () {
        const {data} = await klineApi.queryKLine({
          securityID: symbolInfo.name + (_this.type === 'Yield' ? '_yield' : ''),
          text: resolutionMap[resolution],
        });
        const klineData = data
          .map((item: string) => {
            const [timeFormat, time, open, high, low, close, volume, turnover] = item.split(',');
            return {
              time: Number(time),
              open: Number(open),
              high: Number(high),
              low: Number(low),
              close: Number(close),
              volume: Number(volume),
            };
          })
          .sort((a: any, b: any) => (a.time - b.time > 0 ? 1 : -1));
        _this.to = klineData[klineData.length - 1].time;
        onResult(klineData, {noData: false});
      });
    } else {
      onResult([], {noData: true});
    }
  }

  subscribeBars(
    symbolInfo: LibrarySymbolInfo,
    resolution: ResolutionString,
    onTick: SubscribeBarsCallback,
    listenerGuid: string,
    onResetCacheNeededCallback: () => void
  ): void {
    const _this = this;
    console.log(`Subscribing to ${symbolInfo.name}`);
    onResetCacheNeededCallback();
    this.subscription?.unsubscribe();
    kline$.clear();
    kline$.next(
      `dc.md.kline.${resolutionMap[resolution]}.${[symbolInfo.name].join('-')}${
        _this.type === 'Yield' ? '_yield' : ''
      }`
    );
    this.subscription = kline$.subscribe((data: any) => {
      data?.forEach((item: string) => {
        const [timeFormat, time, open, high, low, close, volume, turnover] = item.split(',');
        if (!_this.to || Number(time) > _this.to) {
          onTick({
            time: Number(time),
            open: Number(open),
            high: Number(high),
            low: Number(low),
            close: Number(close),
            volume: Number(volume),
          });
        }
      });
    });
  }
  unsubscribeBars(listenerGuid: string): void {
    console.log(`Unsubscribing from ${listenerGuid}`);
  }
}

function createSymbolInfo(symbol: string): LibrarySymbolInfo {
  return {
    ticker: symbol,
    name: symbol,
    description: symbol,
    session: '24x7',
    timezone: 'Etc/UTC',
    minmov: 1,
    pricescale: 10000000,
    exchange: 'RateX',
    has_intraday: true,
    has_daily: true,
    has_weekly_and_monthly: true,
    expired: false, // perp.status === 'Suspend',
    type: 'Yield', // Yield | Price
    listed_exchange: 'RubyDex',
    format: 'price', //'price' | 'volume';
    volume_precision: 6,
    supported_resolutions,
  };
}
