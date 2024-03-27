import {OrderForm} from '@/views/order-place/OrderForm';
import {StyledOrderView} from './styles';

export function OrderView() {
  return (
    <StyledOrderView className="w100%">
      <OrderForm />
    </StyledOrderView>
  );
}
