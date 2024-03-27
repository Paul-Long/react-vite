import {Back} from '@/views-h5/order-place/Back';
import {StyledH5OrderView} from '@/views-h5/order-place/styles';
import {OrderForm} from '@/views/order-place/OrderForm';

export function H5OrderView() {
  return (
    <StyledH5OrderView>
      <Back />
      <OrderForm />
    </StyledH5OrderView>
  );
}
