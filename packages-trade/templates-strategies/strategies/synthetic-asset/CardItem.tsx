import {timeUtil} from '@rx/helper/time';
import {useLang} from '@rx/hooks/use-lang';
import {lang as clang} from '@rx/lang/common.lang';
import {lang} from '@rx/lang/strategy.lang';
import {Button} from '@rx/widgets';
import {styled} from 'styled-components';
import {Card} from '../components/Card';

const StyledSelectedWrap = styled.div`
  padding: 20px 12px;
  background: var(--night-sky-blue);
  border: 1px solid var(--dark-gray);
  border-radius: 2px;
`;

export function CardItem({item, onMint}: any) {
  const {LG} = useLang();

  return (
    <Card>
      <div className="df fdc">
        <div className="df fdr aife jcsb fw700">
          <div className="font-size-20px T3">{LG(lang.SyntheticAsset)}</div>
        </div>
        <StyledSelectedWrap className="df fdr aic jcsb mt20px">
          <div className="T5 font-size-14px">{LG(lang.UnderlyingAsset)}</div>
          <div className="">{item.UnderlyingAsset}</div>
        </StyledSelectedWrap>

        <StyledSelectedWrap className="df fdr aic jcsb mt12px">
          <div className="T5 font-size-14px">{LG(clang.MaturityDate)}</div>
          <div className="">{timeUtil.formatDate(new Date(item.MaturityDate).getTime())}</div>
        </StyledSelectedWrap>

        <Button className="mt24px font-size-20px" onClick={onMint}>
          {LG(lang.Mint)} {item.RWAToken}
        </Button>
      </div>
    </Card>
  );
}
