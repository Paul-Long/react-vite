import {closePosition$} from '@/streams/trade/close-position';
import {useLang} from '@rx/hooks/use-lang';
import {lang as clang} from '@rx/lang/common.lang';
import {Button} from '@rx/widgets';
import {useCallback} from 'react';

export function ClosePosition({row, client}: any) {
  const {LG} = useLang();

  const handleConfirm = useCallback(
    (row: Record<string, any>) => {
      closePosition$.next({visible: true, data: row});
    },
    [client]
  );
  return (
    <Button
      size="sm"
      className="relative"
      disabled={row?.enableClose}
      type="default"
      style={{padding: '2px 6px', height: 24, fontSize: 12, lineHeight: '14px'}}
      onClick={() => handleConfirm(row)}
    >
      {LG(clang.Close)}
    </Button>
  );
}
