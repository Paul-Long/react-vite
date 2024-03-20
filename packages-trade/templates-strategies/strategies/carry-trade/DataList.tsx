import {db} from '@rx/db';
import {useLang} from '@rx/hooks/use-lang';
import {lang as clang} from '@rx/lang/common.lang';
import {lang} from '@rx/lang/strategy.lang';
import {Button, Table, Toast} from '@rx/widgets';
import type {Column} from '@rx/widgets/table/types';
import {useCallback} from 'react';
import {styled} from 'styled-components';
import {data} from './data';

const StyledWrap = styled.div``;

interface Props {
  modalHook: ModalHook<any>;
}

export function DataList(props: Props) {
  const {LG} = useLang();

  const genColumns = useCallback((): Column[] => {
    const columns: Column[] = [
      {title: LG(clang.No) + '.', dataIndex: 'id', render: (_, i) => (i ?? 0) + 1},
      {title: LG(lang.Underlying), dataIndex: 'Underlying'},
      {title: LG(lang.APR), dataIndex: 'APR'},
      {title: LG(clang.Long), dataIndex: 'LongContract'},
      {title: LG(clang.Yield), dataIndex: 'LongRate'},
      {title: LG(clang.Short), dataIndex: 'ShortContract'},
      {title: LG(clang.Yield), dataIndex: 'ShortRate'},
      {
        title: <span />,
        dataIndex: 'action',
        render: (record: any) => (
          <Button size="small" onClick={props.modalHook.onOpen(record)}>
            {LG(clang.Follow)}
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
    await db.strategyCarryTrade.add(data);
    Toast.success('Mint Success');
  }, []);

  return (
    <StyledWrap>
      <Table columns={genColumns()} dataSource={data} />
    </StyledWrap>
  );
}
