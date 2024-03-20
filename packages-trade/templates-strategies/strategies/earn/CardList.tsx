import {StyledCardList} from '@/strategies/components/styles';
import {CardItem} from './CardItem';
import {data} from './data';

interface Props {
  modalHook: ModalHook<any>;
}
export function CardList(props: Props) {
  return (
    <>
      <StyledCardList>
        {data.map((d, index) => (
          <CardItem key={index} item={d} onMint={props.modalHook.onOpen(d)} />
        ))}
      </StyledCardList>
    </>
  );
}
