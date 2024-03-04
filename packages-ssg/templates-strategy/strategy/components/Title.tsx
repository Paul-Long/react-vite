import {styled} from 'styled-components';
import {useLang} from '@rx/hooks/use-lang';
import {lang} from '@rx/lang/strategy.lang';

const StyledWrap = styled.div`
  border-left: 1px solid var(--golden);
  color: var(--golden);
  padding: 0 12px;
`;

export function Title() {
  const {LG} = useLang();

  return (
    <div className="pl24px">
      <StyledWrap className="fw700">{LG(lang.PoolsMarket)}</StyledWrap>
    </div>
  );
}
