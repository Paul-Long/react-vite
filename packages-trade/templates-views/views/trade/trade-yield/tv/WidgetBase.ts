import type {
  ChartingLibraryWidgetConstructor,
  IChartingLibraryWidget,
  ResolutionString,
  TradingTerminalWidgetOptions,
} from './charting_library';
import type {Type} from './types';

declare const TradingView: {widget: ChartingLibraryWidgetConstructor};

export class WidgetBase {
  tv!: IChartingLibraryWidget | null;
  type?: Type;
  ready?: boolean;

  constructor(public symbol: string, public interval: ResolutionString) {
    this.tv = null;
  }

  create(options: TradingTerminalWidgetOptions) {
    this.ready = false;
    this.tv = new TradingView.widget(options);
    this.tv!.onChartReady(() => (this.ready = true));
  }

  render(container: HTMLElement, type: Type) {}

  dispose() {
    if (this.tv) {
      this.tv!.remove();
      this.tv = null;
    }
  }

  changeSymbol(symbol: string) {
    if (!this.tv || !this.ready || !symbol) {
      return;
    }
    if (this.symbol === symbol) {
      return;
    }
    this.symbol = symbol;
    const chart = this.tv?.chart();
    chart && chart.setSymbol(symbol);
  }

  changeResolution(resolution: ResolutionString) {
    if (!this.tv || !this.ready || !resolution) {
      return;
    }
    if (this.interval === resolution) {
      return;
    }
    console.log(this.interval, resolution);
    this.interval = resolution;
    const chart = this.tv?.activeChart();
    chart && chart.setResolution(resolution);
  }

  loadingScreen() {
    return {
      backgroundColor: '#09090A',
    };
  }

  overrides() {
    return {
      'paneProperties.background': '#09090A',
      'paneProperties.legendProperties.showBackground': '#09090A',
      'paneProperties.backgroundType': 'solid',
    };
  }
}
