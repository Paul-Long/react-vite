import {CSSProperties} from 'react';

export interface Column {
  dataIndex: Key;
  title: string | number | JSX.Element | ((column: Column, index?: number) => JSX.Element);
  align?: 'center' | 'left' | 'right';
  fixed?: 'left' | 'right';
  render?: (record: any, index?: number, column?: Column) => JSX.Element;
  renderTitle?: (column: Column, index: number) => JSX.Element;
  headerCellStyle?: CSSProperties;
  bodyCellStyle?: CSSProperties;
}

export interface TableProps {
  columns: Column[];
  dataSource: any[];
  onRowSelect?: Function;
}
