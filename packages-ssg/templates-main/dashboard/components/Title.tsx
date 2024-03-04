import {styled} from 'styled-components';

const StyledWrap = styled.div`
  border-left: 1px solid var(--golden);
  color: var(--golden);
  padding: 0 12px;
`;

interface Props {
  className?: string;
  children?: string;
}

export function Title(props: Props) {
  return (
    <div className={props.className ?? ''}>
      <StyledWrap className="fw700">{props.children}</StyledWrap>
    </div>
  );
}
