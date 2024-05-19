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
  return (
    <Button
      className="relative"
      disabled={row?.enableClose || loading}
      type="default"
      onClick={() => handleClose(row)}
    >
      {loading && (
        <div className="absolute top-2 mx-auto">
          <Loading size={16} theme="dark" />
        </div>
      )}
      {LG(clang.Close)}
    </Button>
  );
}
