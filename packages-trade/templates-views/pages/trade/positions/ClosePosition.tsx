import {closePosition$} from '@/streams/trade/close-position';
import {useLang} from '@rx/hooks/use-lang';
import {lang as clang} from '@rx/lang/common.lang';
import {Button, Loading} from '@rx/widgets';
import {useCallback, useState} from 'react';

export function ClosePosition({row, client}: any) {
  const {LG} = useLang();
  const [loading, setLoading] = useState(false);
  const handleClose = useCallback(
    async (row: any) => {
      const {baseAssetAmount, marketIndex, userPda, userOrdersPda, marginType, direction} = row;
      console.log('Close Position : ', marketIndex, userPda, Math.abs(baseAssetAmount));
      setLoading(true);
      const params = {
        marginType,
        marketIndex,
        amount: Math.abs(baseAssetAmount),
        orderType: 'MARKET',
        direction: direction === 'LONG' ? 'SHORT' : 'LONG',
        userPda,
        userOrdersPda,
      };
      try {
        await client?.closePosition(params);
      } catch (e) {
        console.error(e);
      }
      setLoading(false);
    },
    [client]
  );

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
      disabled={row?.enableClose || loading}
      type="default"
      style={{padding: '1px 12px', fontSize: 12, lineHeight: '20px'}}
      onClick={() => handleClose(row)}
    >
      {loading && (
        <div className="absolute top-2 mx-auto">
          <Loading size={12} theme="dark" />
        </div>
      )}
      {LG(clang.Close)}
    </Button>
  );
}
