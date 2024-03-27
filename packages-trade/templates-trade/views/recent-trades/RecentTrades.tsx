import {SelectTypes} from '@/views/components/select-types/SelectTypes';
import {Trades} from '@/views/recent-trades/Trades';
import {useRecent} from '@/views/recent-trades/state';
import {
  StyledButton,
  StyledRecentContent,
  StyledRecentHeader,
  StyledRecentWrap,
} from '@/views/recent-trades/styles';
import {useLang} from '@rx/hooks/use-lang';
import {lang} from '@rx/lang/trade.lang';
import {useState} from 'react';

export function RecentTrades() {
  const {LG} = useLang();
  const {open, handleClick} = useRecent();
  const [mode, setMode] = useState<string>('YT');

  return (
    <StyledRecentWrap $opened={open} className="df fdr pl16px">
      <div className="df jcc aic">
        <StyledButton className="df jcc aic w18px cp" $opened={open} onClick={handleClick}>
          <i className="iconfont font-size-14px">&#xe6fc;</i>
        </StyledButton>
      </div>
      <StyledRecentContent className="df fdc flex-1" hidden={!open}>
        <StyledRecentHeader className="df fdr jcsb aic w100%">
          <div className="T1 fw700">{LG(lang.RecentTrades)}</div>
          <SelectTypes value={mode} onChange={(t: string) => setMode(t)} />
        </StyledRecentHeader>
        <Trades mode={mode} />
      </StyledRecentContent>
    </StyledRecentWrap>
  );
}
