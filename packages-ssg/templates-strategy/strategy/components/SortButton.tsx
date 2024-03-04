import {styled} from 'styled-components';
import cn from 'classnames';

const StyledWrap = styled.div``;

const StyledUp = styled.i`
  transform: rotate(180deg) scale(0.9);
  margin-bottom: -4px;
`;

const StyledDown = styled.i`
  transform: scale(0.9);
`;

export function SortButton({children, sort = 'desc'}) {
  return (
    <StyledWrap className="df fdr aic gap8px">
      {children}
      <div className="df fdc aic jcc">
        <StyledUp className={cn('iconfont font-size-10px', {T3: sort === 'desc'})}>
          &#xe624;
        </StyledUp>
        <StyledDown className={cn('iconfont font-size-10px', {T3: sort === 'asc'})}>
          &#xe624;
        </StyledDown>
      </div>
    </StyledWrap>
  );
}
