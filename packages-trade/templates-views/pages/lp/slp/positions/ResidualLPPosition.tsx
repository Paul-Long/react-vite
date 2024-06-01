import {useLang} from '@rx/hooks/use-lang';
import {lang} from '@rx/lang/lp.lang';
import {Table} from '@rx/widgets';
import type {Column} from '@rx/widgets/table/types';
import {useMemo} from 'react';

export function ResidualLPPosition(props: any) {
  const {columns, dataSource} = useTable();
  return (
    <div className="flex flex-row items-start w-full gap-24px">
      <Table columns={columns} dataSource={dataSource}></Table>
    </div>
  );
}

function useTable() {
  const {LG} = useLang();
  const columns = useMemo<Column[]>(() => {
    return [
      {title: LG(lang.Pool), dataIndex: 'pool'},
      {title: LG(lang.LockedValue), dataIndex: 'LockedValue'},
      {title: LG(lang.RetainRatio), dataIndex: 'RetainRatio'},
      {title: 'YT', dataIndex: 'yt'},
      {title: LG(lang.WithdrawableValue), dataIndex: 'withdrawValue'},
      {title: 'ST', dataIndex: 'st'},
      {title: <span></span>, dataIndex: 'action'},
    ];
  }, []);

  const dataSource = useMemo(() => {
    return [];
  }, []);

  return {columns, dataSource};
}
