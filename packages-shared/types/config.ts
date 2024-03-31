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
  symbol: number;
  symbolLevel1Category: string;
  symbolLevel2Category: string;
  symbolName: string;
  term: string;
}
