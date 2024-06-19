interface ConfigCategory {
  closeBy: string;
  createTime: string;
  level: number;
  parentSymbolCategory: string;
  sort: number;
  symbolCategory: string;
  updateTime: string;
}

interface ConfigSymbol {
  dueDate: string;
  expiration: string;
  id: number;
  sort: number;
  symbol: string;
  symbolLevel1Category: string;
  symbolLevel2Category: string;
  kValue: string;
  symbolName: string;
  term: string;
  minimumMaintainanceCr: number;
  seconds: number;
}
