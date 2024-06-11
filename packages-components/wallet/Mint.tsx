import {useLang} from '@rx/hooks/use-lang';
import {useStream} from '@rx/hooks/use-stream';
import {lang} from '@rx/lang/common.lang';
import {useConnect} from '@rx/web3/hooks/use-connect';
import {updateBalance$} from '@rx/web3/streams/balance';
import {rateXClient$} from '@rx/web3/streams/rate-x-client';
import {Button, Loading, Toast} from '@rx/widgets';
import {useCallback, useState} from 'react';

export function Mint() {
  const {LG} = useLang();
  const {connected} = useConnect();
  const [client] = useStream(rateXClient$);
  const [loading, setLoading] = useState(false);

  const handleMint = useCallback(async () => {
    if (!client || !connected || loading) {
      return;
    }
    setLoading(true);
    try {
      const tx = await client.mintAll(500);
      updateBalance$.next(0);
      if (!!tx) {
        Toast.success('Mint Success.');
      }
    } catch (_) {}
    setLoading(false);
  }, [client, connected, loading]);
  return (
    <Button className="relative" size="sm" type="primary" onClick={handleMint}>
      {loading && (
        <div className="absolute top-2 mx-auto">
          <Loading size={12} theme="dark" />
        </div>
      )}
      {LG(lang.Mint)}
    </Button>
  );
}
