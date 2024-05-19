import {
  ErrorCallback,
  GetMarksCallback,
  HistoryCallback,
  IDatafeedChartApi,
  IExternalDatafeed,
  LibrarySymbolInfo,
  Mark,
  OnReadyCallback,
  PeriodParams,
  ResolutionString,
  ResolveCallback,
  SearchSymbolsCallback,
  SubscribeBarsCallback,
  SymbolResolveExtension,
  TimescaleMark,
} from '@/charting_library';
import {loadTV} from '@rx/resource/js';
import {useEffect, useRef} from 'react';

function getLanguageFromURL() {
  const regex = new RegExp('[\\?&]lang=([^&#]*)');
  const results = regex.exec(window.location.search);
  return results === null ? null : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

declare const TradingView: {widget: any};

const supported_resolutions = [
  '1',
  '5',
  '15',
  '30',
  '60',
  '240',
  'D',
  'W',
  'M',
  '3M',
  '12M',
] as ResolutionString[];

export class DataFeed implements IDatafeedChartApi, IExternalDatafeed {
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
  getMarks?(
    symbolInfo: LibrarySymbolInfo,
    from: number,
    to: number,
    onDataCallback: GetMarksCallback<Mark>,
    resolution: ResolutionString
  ): void {
    throw new Error('Method not implemented.');
  }
  getTimescaleMarks?(
    symbolInfo: LibrarySymbolInfo,
    from: number,
    to: number,
    onDataCallback: GetMarksCallback<TimescaleMark>,
    resolution: ResolutionString
  ): void {
    throw new Error('Method not implemented.');
  }
  searchSymbols(
    userInput: string,
    exchange: string,
    symbolType: string,
    onResult: SearchSymbolsCallback
  ): void {
    throw new Error('Method not implemented.');
  }
  resolveSymbol(
    symbolName: string,
    onResolve: ResolveCallback,
    onError: ErrorCallback,
    extension?: SymbolResolveExtension | undefined
  ): void {
    throw new Error('Method not implemented.');
  }
  getBars(
    symbolInfo: LibrarySymbolInfo,
    resolution: ResolutionString,
    periodParams: PeriodParams,
    onResult: HistoryCallback,
    onError: ErrorCallback
  ): void {
    throw new Error('Method not implemented.');
  }
  subscribeBars(
    symbolInfo: LibrarySymbolInfo,
    resolution: ResolutionString,
    onTick: SubscribeBarsCallback,
    listenerGuid: string,
    onResetCacheNeededCallback: () => void
  ): void {
    throw new Error('Method not implemented.');
  }
  unsubscribeBars(listenerGuid: string): void {
    throw new Error('Method not implemented.');
  }
}

export default function () {
  const chartContainerRef = useRef(null);

  const defaultProps = {
    symbol: 'mSOL-2406',
    interval: 'D',
    datafeedUrl: 'https://demo_feed.tradingview.com',
    libraryPath: '/charting_library/',
    chartsStorageUrl: 'https://saveload.tradingview.com',
    chartsStorageApiVersion: '1.1',
    clientId: 'tradingview.com',
    userId: 'public_user_id',
    fullscreen: false,
    autosize: true,
    studiesOverrides: {},
  };
  useEffect(() => {
    let tvWidget: any;
    loadTV().then(() => {
      const widgetOptions = {
        symbol: defaultProps.symbol,
        // BEWARE: no trailing slash is expected in feed URL
        datafeed: new DataFeed(),
        theme: 'dark',
        interval: defaultProps.interval,
        container: chartContainerRef.current,
        library_path: defaultProps.libraryPath,

        locale: getLanguageFromURL() || 'en',
        disabled_features: [
          'use_localstorage_for_settings',
          'header_widget',
          'left_toolbar',
          'header_quick_search',
          'display_market_status',
          'timeframes_toolbar',
          'use_localstorage_for_settings',
          'right_toolbar',
          'symbol_search_hot_key',
        ],
        enabled_features: ['study_templates'],
        charts_storage_url: defaultProps.chartsStorageUrl,
        charts_storage_api_version: defaultProps.chartsStorageApiVersion,
        client_id: defaultProps.clientId,
        user_id: defaultProps.userId,
        fullscreen: defaultProps.fullscreen,
        autosize: defaultProps.autosize,
        studies_overrides: defaultProps.studiesOverrides,
      };

      tvWidget = new TradingView.widget(widgetOptions);

      tvWidget.onChartReady(() => {
        tvWidget.headerReady().then(() => {
          const button = tvWidget.createButton();
          button.setAttribute('title', 'Click to show a notification popup');
          button.classList.add('apply-common-tooltip');
          button.addEventListener('click', () =>
            tvWidget.showNoticeDialog({
              title: 'Notification',
              body: 'TradingView Charting Library API works correctly',
              callback: () => {
                console.log('Noticed!');
              },
            })
          );

          button.innerHTML = 'Check API';
        });
      });
    });

    return () => {
      tvWidget.remove();
    };
  });

  return <div ref={chartContainerRef} className="TVChartContainer w-full" />;
}
