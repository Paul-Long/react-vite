import React from 'react';
import {styled} from 'styled-components';

const StyledWrap = styled.div`
  background: var(--midnight-blue);
  border: 1px solid var(--dark-gray);
  border-radius: 4px;
  padding: 40px 20px;
`;

export function Card({children}: {children: React.ReactNode}) {
  return <StyledWrap>{children}</StyledWrap>;
}
