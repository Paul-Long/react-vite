import {OrderForm} from '@/trade/order-place/OrderForm';
import React from 'react';
import {StyledOrderView} from './styles';

export function OrderView() {
  return (
    <StyledOrderView className="w100%">
      <OrderForm />
    </StyledOrderView>
  );
}
