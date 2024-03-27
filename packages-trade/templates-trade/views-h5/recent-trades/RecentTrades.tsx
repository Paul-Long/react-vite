import {Trades} from '@/views-h5/recent-trades/Trades';
import {SelectTypes} from '@/views/components/select-types/SelectTypes';
import {useLang} from '@rx/hooks/use-lang';
import {lang} from '@rx/lang/trade.lang';
import {Title} from '@trade/components/title/Title';
import {useState} from 'react';

export function RecentTrades() {
  const {LG} = useLang();
  const [mode, setMode] = useState<string>('YT');
  return (
    <div className="df fdc gap8px">
      <div className="df fdr jcsb">
        <Title>{LG(lang.RecentTrades)}</Title>
        <SelectTypes theme="dark" value={mode} onChange={(t: string) => setMode(t)} />
      </div>
      <Trades mode={mode} />
    </div>
  );
}
