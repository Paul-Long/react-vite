import {StyledCardList} from '@/strategy/components/styles';
import React from 'react';
import {CardItem} from './CardItem';
import {data} from './data';

export function CardList() {
  return (
    <StyledCardList>
      {data.map((d, index) => (
        <CardItem key={index} item={d} />
      ))}
    </StyledCardList>
  );
}
