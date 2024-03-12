import {StyledCardList} from '@/strategy/components/styles';
import {MintDialog} from '@/strategy/earn/MintDialog';
import {useDialog} from '@rx/hooks/use-dialog';
import React from 'react';
import {CardItem} from './CardItem';
import {data} from './data';

export function CardList() {
  const modalHook = useDialog();
  return (
    <>
      <StyledCardList>
        {data.map((d, index) => (
          <CardItem key={index} item={d} onMint={modalHook.onOpen(d)} />
        ))}
      </StyledCardList>
      <MintDialog modalHook={modalHook} />
    </>
  );
}
