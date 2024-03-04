import {useLang} from '@rx/hooks/use-lang';
import {lang as clang} from '@rx/lang/common.lang';
import {lang} from '@rx/lang/strategy.lang';
import {Button, Table} from '@rx/widgets';
import React, {useCallback} from 'react';
import {styled} from 'styled-components';
import {data} from './data';

const StyledWrap = styled.div``;

export function DataList() {
  const {LG} = useLang();

  const genColumns = useCallback(() => {
    return [
      {title: LG(clang.No) + '.', dataIndex: 'index'},
      {title: LG(lang.PrincipalToken), dataIndex: 'token'},
      {title: LG(lang.Maturity), dataIndex: 'maturity'},
      {title: LG(lang.TTM), dataIndex: 'ttm'},
      {title: LG(lang.APR), dataIndex: 'apr'},
      {title: LG(lang.Underlying), dataIndex: 'underlying'},
      {
        title: <span />,
        dataIndex: 'action',
        render: () => <Button size="small">{LG(lang.Mint)}</Button>,
      },
    ];
  }, []);

  return (
    <StyledWrap>
      <Table columns={genColumns()} dataSource={data} />
    </StyledWrap>
  );
}
