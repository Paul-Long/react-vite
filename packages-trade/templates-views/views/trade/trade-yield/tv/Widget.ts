import {Big} from 'big.js';
import {DataFeed} from './DataFeed';
import {WidgetBase} from './WidgetBase';
import type {LibrarySymbolInfo, TradingTerminalWidgetOptions} from './charting_library';
import type {Type} from './types';

export class Widget extends WidgetBase {
  render(container: HTMLElement, type: Type) {
    const {interval} = this;
    const options: TradingTerminalWidgetOptions = {
      symbol: this.symbol,
      theme: 'dark',
      container: container,
      interval,
      datafeed: new DataFeed(type),
      autosize: true,
      locale: 'en',
      fullscreen: false,
      library_path: 'https://static.rate-x.io/3rd/tv/27.005/charting_library/',
      custom_css_url: './custom-20240624.css',
      disabled_features: [
        'volume_force_overlay',
        'use_localstorage_for_settings',
        // 'header_widget',
        'header_resolutions',
        'header_symbol_search',
        'header_compare',
        'header_undo_redo',
        'header_indicators',
        'left_toolbar',
        'header_quick_search',
        'display_market_status',
        'timeframes_toolbar',
        'right_toolbar',
        'symbol_search_hot_key',
        'edit_buttons_in_legend',
        'legend_context_menu',
        'format_button_in_legend',
        'delete_button_in_legend',
      ],
      enabled_features: [],
      overrides: this.overrides(),
      loading_screen: this.loadingScreen(),
      custom_formatters: {
        priceFormatterFactory: (symbolInfo: LibrarySymbolInfo | null) => {
          console.log('symbol info : ', symbolInfo);
          if (symbolInfo === null) {
            return null;
          }
          if (type === 'Yield') {
            return {
              format: (price: number) => {
                return Big(price).times(100).toFixed(2) + '%';
              },
            };
          }
          return null;
        },
      },
    };
    if (this.type !== type) {
      this.dispose();
    }
    this.create(options);
    this.type = type;
  }
}
