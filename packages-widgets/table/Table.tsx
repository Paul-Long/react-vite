import React, {useCallback, useEffect, useState} from 'react';
import {StyledRow, StyledTableWrap, StyledTd, StyledTh} from './styles';
import type {Column, TableProps} from './types';

export function Table(props: TableProps) {
  const {columns = [], dataSource = [], onRowSelect = () => {}} = props;
  const [rows, setRows] = useState(0);

  useEffect(() => {
    const len = columns.filter((c) => c.fixed !== 'right').length;
    setRows(len === columns.length ? len - 1 : len);
  }, [columns]);

  const renderTitle = useCallback((column: Column, index: number) => {
    if (column.renderTitle) {
      return column.renderTitle(column, index);
    }
    return column.title;
  }, []);

  const renderCell = useCallback((record: Record<string, any>, index: number, column: Column) => {
    if (column.render) {
      return column.render(record, index, column);
    }
    return record[column.dataIndex as string] ?? '';
  }, []);

  return (
    <div className="pos-relative max-100% overflow-x-auto">
      <StyledTableWrap $rows={rows}>
        <StyledRow>
          {columns.map((column, index) => (
            <StyledTh
              className="B2 T1 fw700"
              $fixed={column.fixed}
              $align={column.align ?? 'left'}
              style={column?.headerCellStyle ?? {}}
              key={column.dataIndex}
            >
              {renderTitle(column, index)}
            </StyledTh>
          ))}
        </StyledRow>
        {dataSource?.map((data, index) => (
          <StyledRow key={index} onClick={() => onRowSelect(data)}>
            {columns.map((column, index) => (
              <StyledTd
                $fixed={column.fixed}
                $align={column.align ?? 'left'}
                style={column?.bodyCellStyle ?? {}}
                key={column.dataIndex}
              >
                {renderCell(data, index, column)}
              </StyledTd>
            ))}
          </StyledRow>
        ))}
      </StyledTableWrap>
    </div>
  );
}
