import React, {CSSProperties} from 'react';

export interface Column {
  dataIndex: Key;
  title: string | number | React.ReactNode | ((column: Column, index?: number) => React.ReactNode);
  align?: 'center' | 'left' | 'right';
  fixed?: 'left' | 'right';
  render?: (record: any, index?: number, column?: Column) => React.ReactNode;
  renderTitle?: (column: Column, index: number) => React.ReactNode;
  headerCellStyle?: CSSProperties;
  bodyCellStyle?: CSSProperties;
}

export interface TableProps {
  columns: Column[];
  dataSource: any[];
  onRowSelect?: Function;
  selectedIndex?: string | number;
  rowKey?: string | ((record: any) => string);
}
