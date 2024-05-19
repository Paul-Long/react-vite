import {useScroll} from '@rx/hooks/use-scroll';
import {clsx} from 'clsx';
import {useCallback, useEffect, useState} from 'react';
import {StyledRow, StyledTableWrap, StyledTd, StyledTh} from './styles';
import type {Column, TableProps} from './types';

export function Table(props: TableProps) {
  const {ref, hasX, isLeft, isRight} = useScroll<HTMLDivElement>();
  const {columns = [], dataSource = [], onRowSelect = () => {}, selectedIndex, rowKey} = props;
  const len: number = columns.filter((c) => c.fixed !== 'right').length;
  const [rows, setRows] = useState(len === columns.length ? len - 1 : len);

  useEffect(() => {
    setRows(len === columns.length ? len - 1 : len);
  }, [columns, len]);

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

  const genRowKey = useCallback((record: any) => {
    if (typeof rowKey === 'function') {
      return rowKey(record);
    }
    return !rowKey ? '' : record[rowKey];
  }, []);

  return (
    <div ref={ref} className={clsx('relative max-w-100% overflow-x-auto sv', props.className)}>
      <StyledTableWrap
        $rows={rows}
        $grid={columns.reduce((s: string[], c) => [...s, c.width ?? '1fr'], []).join(' ')}
      >
        <StyledRow>
          {columns.map((column, index) => (
            <StyledTh
              className="font-size-14px lh-20px text-gray-600"
              $fixed={column.fixed}
              $align={column.align ?? 'left'}
              $shadowLeft={!!column.shadowLeft && hasX && !isRight}
              $shadowRight={!!column.shadowRight && hasX && !isLeft}
              style={column?.headerCellStyle ?? {}}
              key={column.dataIndex}
            >
              {renderTitle(column, index)}
            </StyledTh>
          ))}
        </StyledRow>
        {dataSource?.map((data, index) => (
          <StyledRow key={index} onClick={() => onRowSelect(data)}>
            {columns.map((column, columnIndex) => (
              <StyledTd
                className="td relative"
                $selected={selectedIndex === genRowKey(data)}
                $fixed={column.fixed}
                $align={column.align ?? 'left'}
                $shadowLeft={!!column.shadowLeft && hasX && !isRight}
                $shadowRight={!!column.shadowRight && hasX && !isLeft}
                style={column?.bodyCellStyle ?? {}}
                key={`${index}-${column.dataIndex}`}
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
