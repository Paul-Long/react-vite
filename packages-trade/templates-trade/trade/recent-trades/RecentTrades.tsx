import {SelectTypes} from '@/trade/components/select-types/SelectTypes';
import {Trades} from '@/trade/recent-trades/Trades';
import {useRecent} from '@/trade/recent-trades/state';
import {
  StyledButton,
  StyledRecentContent,
  StyledRecentHeader,
  StyledRecentWrap,
} from '@/trade/recent-trades/styles';
import {useLang} from '@rx/hooks/use-lang';
import {lang} from '@rx/lang/trade.lang';
import React, {useState} from 'react';

export function RecentTrades() {
  const {LG} = useLang();
  const {open, handleClick} = useRecent();
  const [type, setType] = useState<string>('YT');

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
          <SelectTypes value={type} onChange={(t: string) => setType(t)} />
        </StyledRecentHeader>
        <Trades type={type} />
      </StyledRecentContent>
    </StyledRecentWrap>
  );
}
