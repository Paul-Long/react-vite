import {IMAGES} from '@rx/const/images';
import {styled} from 'styled-components';

const StyledLogo = styled.div`
  width: 150px;
  height: 100%;
  min-width: 150px;
  max-width: 150px;
  border-right: 1px solid rgba(0, 0, 0, 0.3);
  & > img {
    height: 30px;
  }
  @media (max-width: 640px) {
    width: auto;
    min-width: auto;
    max-width: none;
    border-right: none;
    img {
      height: 24px;
    }
  }
`;

export function Logo() {
  return (
    <StyledLogo className="df aic jcc">
      <img className="db" src={IMAGES.logo} alt="RateX" />
    </StyledLogo>
  );
}
