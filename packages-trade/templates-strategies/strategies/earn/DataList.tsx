import {db} from '@rx/db';
import {useLang} from '@rx/hooks/use-lang';
import {lang as clang} from '@rx/lang/common.lang';
import {lang} from '@rx/lang/strategy.lang';
import {Button, Table, Toast} from '@rx/widgets';
import {Column} from '@rx/widgets/table/types';
import React, {useCallback} from 'react';
import {styled} from 'styled-components';
import {data} from './data';

const StyledWrap = styled.div``;

export function DataList() {
  const {LG} = useLang();

  const genColumns = useCallback(() => {
    const columns: Column[] = [
      {title: LG(clang.No) + '.', dataIndex: 'id', render: (_, i) => (i ?? 0) + 1},
      {title: LG(lang.PrincipalToken), dataIndex: 'token'},
      {title: LG(lang.Maturity), dataIndex: 'matureDate'},
      {title: LG(lang.TTM), dataIndex: 'ttm'},
      {title: LG(lang.APR), dataIndex: 'apr'},
      {title: LG(lang.Underlying), dataIndex: 'underlying'},
      {
        title: <span />,
        dataIndex: 'action',
        render: (record: any) => (
          <Button size="small" onClick={() => handleMint(record)}>
            {LG(lang.Mint)}
          </Button>
        ),
      },
    ];
    columns.forEach((c) => {
      c.headerCellStyle = {
        color: '#fff',
        background: '#0A253D',
        fontWeight: 700,
      };
      if (c.dataIndex !== 'action') {
        c.bodyCellStyle = {color: '#B7BDC6', fontWeight: 700};
      }
    });
    return columns;
  }, []);

  const handleMint = useCallback(async (item: any) => {
    const {...data} = item;
    await db.strategyEarnPosition.add(data);
    Toast.success('Mint Success');
  }, []);

  return (
    <StyledWrap>
      <Table columns={genColumns()} dataSource={data} />
    </StyledWrap>
  );
}
