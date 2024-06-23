import {clsx} from 'clsx';
import {styled} from 'styled-components';

const Wrap = styled.div`
  top: 0;
  left: 0;
  justify-content: center;
  width: 100%;
  height: 100%;
  //opacity: 0.1;
`;

const Dot = styled.div`
  flex-wrap: wrap;
  justify-content: space-between;
  width: 25px;
  height: 25px;
  animation: spinAnimation 1s linear infinite;
  -webkit-animation: spinAnimation 1s linear infinite;

  @keyframes spinAnimation {
    0% {
      -webkit-transform: rotate(0deg);
    }
    25% {
      -webkit-transform: rotate(90deg);
    }
    50% {
      -webkit-transform: rotate(180deg);
    }
    75% {
      -webkit-transform: rotate(270deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
    }
  }
`;

const Circle = styled.i<{$color: string}>`
  display: inline-block;
  border-radius: 50%;
  width: 10px;
  height: 10px;
  background: ${({$color}) => $color};
  &:nth-child(2) {
    opacity: 0.8;
  }
  &:nth-child(3) {
    opacity: 0.6;
  }
  &:nth-child(4) {
    opacity: 0.4;
  }
`;

interface Props {
  className?: string;
  theme?: 'light' | 'dark';
  color?: string;
}
export function Spin(props: Props) {
  const {theme = 'light', className, color = '#8DCC2F'} = props;
  return (
    <Wrap
      className={clsx(
        'absolute flex justify-between items-center',
        [theme === 'light' && 'bg-transparent'],
        [theme === 'dark' && 'bg-transparent'],
        className
      )}
    >
      <Dot className="aic flex items-center">
        <Circle $color={color} />
        <Circle $color={color} />
        <Circle $color={color} />
        <Circle $color={color} />
      </Dot>
    </Wrap>
  );
}
