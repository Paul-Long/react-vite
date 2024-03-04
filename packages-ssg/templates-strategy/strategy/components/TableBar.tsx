import {styled} from 'styled-components';
import {ShowDataType} from './ShowDataType';
import {useLang} from '@rx/hooks/use-lang';
import {lang} from '@rx/lang/strategy.lang';
import {SortButton} from './SortButton';

const StyledWrap = styled.div`
  padding: 12px 24px;
`;

export function TableBar() {
  const {LG} = useLang();

  return (
    <StyledWrap className="df fdr aic jcsb">
      <div className="df fdr aic gap28px fw700">
        <SortButton>{LG(lang.APR)}</SortButton>
        <SortButton>{LG(lang.MatureDate)}</SortButton>
      </div>
      <ShowDataType />
    </StyledWrap>
  );
}
