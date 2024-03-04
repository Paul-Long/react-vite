import {styled} from 'styled-components';

export const Wrap = styled.div`
  height: 100%;
`;

export const Content = styled.div`
  gap: 8px;
`;

export const StyledItem = styled.div<{$selected: boolean}>`
  line-height: 42px;
  padding: 0 12px;
  background-color: ${({$selected}) => ($selected ? 'var(--golden)' : 'initial')};
  color: ${({$selected}) => ($selected ? 'var(--black)' : 'var(--white)')};
  .right {
    transform: rotate(-90deg);
    display: ${({$selected}) => ($selected ? 'block' : 'none')};
  }
`;

export const StyledBottom = styled.div`
  padding: 10px 12px;
  border-top: 1px solid var(--dark-gray);
`;

export const SearchWrap = styled.div`
  width: 100%;
  box-sizing: border-box;
  margin-top: 20px;
  img {
    position: absolute;
    display: inline-block;
    top: 6px;
    left: 6px;
    width: 16px;
    height: 16px;
    z-index: 1;
  }
`;

export const SearchInput = styled.input`
  height: 30px;
  padding-left: 30px;
  border: 1px solid var(--lead-gray);
  background: linear-gradient(0deg, var(--smoke-gray) 0%, var(--off-white) 100%);
  border-radius: 2px;
  outline: none;
  box-sizing: border-box;
`;
