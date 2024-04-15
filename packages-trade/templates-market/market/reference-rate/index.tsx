import {Title} from '@/market/components/Title';
import {StyledRefRateWrap} from '@/market/components/styles';
import {useLang} from '@rx/hooks/use-lang';
import {lang} from '@rx/lang/dashboard.lang';
import {Table} from '@rx/widgets';
import {useReferenceRate} from '@trade/hooks/market/use-reference-rate';

export function ReferenceRate() {
  const {LG} = useLang();
  const {data, columns} = useReferenceRate();

  return (
    <StyledRefRateWrap className="pt24px box-border">
      <Title className="pl24px">{LG(lang.ReferenceRate)}</Title>
      <div className="mt24px">
        <Table columns={columns} dataSource={data} />
      </div>
    </StyledRefRateWrap>
  );
}
