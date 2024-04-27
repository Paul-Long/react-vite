import {Table} from '@rx/widgets';
import {useReferenceRate} from '@trade/hooks/market/use-reference-rate';
import {StyledWrap} from './styles';

export function ReferenceRate() {
  const {data, columns} = useReferenceRate();

  return (
    <StyledWrap className="pt24px box-border">
      <h2>Reference Rate</h2>
      <div className="mt24px">
        <Table columns={columns} dataSource={data} />
      </div>
    </StyledWrap>
  );
}
