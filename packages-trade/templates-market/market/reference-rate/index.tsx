import {Title} from '@/market/components/Title';
import {StyledRefRateWrap} from '@/market/components/styles';
import {useLang} from '@rx/hooks/use-lang';
import {lang} from '@rx/lang/dashboard.lang';
import {Table} from '@rx/widgets';
import type {Column} from '@rx/widgets/table/types';
import cn from 'classnames';
import {useCallback, useState} from 'react';
import {data} from './data';

export function ReferenceRate() {
  const {LG} = useLang();
  const [showChildren, setShowChildren] = useState(true);

  const genColumns = useCallback(() => {
    const columns: Column[] = [
      {
        title: <span></span>,
        dataIndex: 'token',
        render: (row) => {
          return (
            <div
              className={cn('df fdr aic gap8px', {cp: row.isParent})}
              onClick={() => setShowChildren(!showChildren)}
            >
              {row.isParent && (
                <i className={cn('iconfont T3', {'transform-rotate-180deg': showChildren})}>
                  &#xe624;
                </i>
              )}
              {!row.isParent && <span className="dib w16px"></span>}
              {row.token}
            </div>
          );
        },
      },
      {title: 'O/N', dataIndex: 'on'},
      {title: '7D', dataIndex: 'day'},
      {title: '1M', dataIndex: 'month'},
      {title: '1Y', dataIndex: 'year'},
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
  }, [showChildren]);
  return (
    <StyledRefRateWrap className="pt24px box-border">
      <Title className="pl24px">{LG(lang.ReferenceRate)}</Title>
      <div className="mt24px">
        <Table
          columns={genColumns()}
          dataSource={showChildren ? data : data.filter((d) => d.isParent)}
        />
      </div>
    </StyledRefRateWrap>
  );
}
