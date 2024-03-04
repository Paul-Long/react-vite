import React from 'react';
import {styled} from 'styled-components';

const StyledLogo = styled.img`
  height: 30px;
  width: auto;
`;

interface LogoProps {
  src: string;
}

export const Logo: React.FC<LogoProps> = ({src}) => {
  return <StyledLogo src={src} alt="Logo" />;
};
