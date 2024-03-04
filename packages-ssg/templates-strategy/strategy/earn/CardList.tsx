import {styled} from 'styled-components';
import {CardItem} from './CardItem';
import {data} from './data';

const StyledWrap = styled.div`
  padding: 24px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
  gap: 24px;
  @media (max-width: 1366px) {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  }
`;

export function CardList() {
  return (
    <StyledWrap>
      {data.map((d, index) => (
        <CardItem key={index} item={d} />
      ))}
    </StyledWrap>
  );
}
