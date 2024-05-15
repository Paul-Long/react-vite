import {useObservable} from '@rx/hooks/use-observable';
import {load, referencePrice$} from '@rx/streams/market/reference-price';
import type {Column} from '@rx/widgets/table/types';
import Big from 'big.js';
import cn from 'classnames';
import {useCallback, useEffect, useMemo, useState} from 'react';

export function useReferenceRate() {
  const data = useObservable<ReferencePriceRecord[]>(referencePrice$, [], 'reference price');
  const [hideList, setHideList] = useState<string[]>([]);

  useEffect(() => {
    load().then();
  }, []);

  const columns = useMemo<Column[]>(() => {
    const columns: Column[] = [
      {
        title: <span></span>,
        dataIndex: 'token',
        render: (row) => {
          return (
            <div
              className={cn('df fdr aic gap8px', {cp: !row.parent})}
              onClick={() => handleClick(row.token)}
            >
              {!row.parent && (
                <i
                  className={cn('iconfont T3', {
                    'transform-rotate-180deg': hideList.includes(row.token),
                  })}
                >
                  &#xe624;
                </i>
              )}
              {!!row.parent && <span className="dib w16px"></span>}
              {row.token}
            </div>
          );
        },
      },
      {title: 'O/N', dataIndex: 'ON', render: (record) => renderNum(record['ON'])},
      {title: '7D', dataIndex: '7D', render: (record) => renderNum(record['7D'])},
      {title: '1M', dataIndex: '1M', render: (record) => renderNum(record['1M'])},
      {title: '1Y', dataIndex: '1Y', render: (record) => renderNum(record['1Y'])},
    ];
    columns.forEach((c) => {
      c.headerCellStyle = {
        color: '#B7BDC6',
        background: 'transparent',
        borderBottom: '1px solid #26394B',
      };
      c.bodyCellStyle = {
        fontSize: '14px',
        padding: '6px 12px',
        fontWeight: 700,
      };
      if (c.dataIndex !== 'token') {
        c.bodyCellStyle.color = '#27F2A9';
      }
    });
    return columns;
  }, [hideList]);

  const handleClick = useCallback(
    (token: string) => {
      setHideList((prevState) => {
        if (prevState.includes(token)) {
          return prevState.filter((p) => p !== token);
        }
        return [...prevState, token];
      });
    },
    [hideList]
  );

  return {data: data.filter((d) => !hideList.includes(d.parent as string)), columns};
}

function renderNum(num: string) {
  if (!num) {
    return '-';
  }
  return Big(num).times(100).toFixed(2) + '%';
}
