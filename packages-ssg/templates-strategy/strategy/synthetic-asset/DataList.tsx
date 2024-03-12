import {db} from '@rx/db';
import {timeUtil} from '@rx/helper/time';
import {useLang} from '@rx/hooks/use-lang';
import {lang as clang} from '@rx/lang/common.lang';
import {lang} from '@rx/lang/strategy.lang';
import {Button, Table, Toast} from '@rx/widgets';
import type {Column} from '@rx/widgets/table/types';
import React, {useCallback} from 'react';
import {styled} from 'styled-components';
import {data} from './data';

const StyledWrap = styled.div``;

export function DataList() {
  const {LG} = useLang();

  const genColumns = useCallback(() => {
    const columns: Column[] = [
      {title: LG(clang.No) + '.', dataIndex: 'id', render: (_, i) => (i ?? 0) + 1},
      {title: LG(lang.UnderlyingAsset), dataIndex: 'UnderlyingAsset'},
      {
        title: LG(lang.Maturity),
        dataIndex: 'maturity',
        render: (record: any) => timeUtil.formatDate(new Date(record.MaturityDate).getTime()),
      },
      {title: LG(lang.RWAToken), dataIndex: 'RWAToken'},
      {title: LG(lang.TTM), dataIndex: 'TTM'},
      {title: LG(lang.APR), dataIndex: 'APR'},
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
    await db.strategySyntheticAsset.add(data);
    Toast.success('Mint Success');
  }, []);

  return (
    <StyledWrap>
      <Table columns={genColumns()} dataSource={data} />
    </StyledWrap>
  );
}
