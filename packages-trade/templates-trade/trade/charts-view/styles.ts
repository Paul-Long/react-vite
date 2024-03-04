import {styled} from 'styled-components';

export const StyledChartsViewWrap = styled.section`
  box-sizing: border-box;
  padding: 8px 0 16px 16px;
  overflow: hidden;
`;

export const StyledInfoWrap = styled.div``;

export const StyledInfoGrid = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
`;

export const StyledCharts = styled.div`
  border: 1px solid var(--lead-gray);
`;

export const StyledChartsContainer = styled.div`
  width: 100%;
  margin-left: -1px;
  margin-right: -1px;
  margin-bottom: -1px;
  border-top: 1px solid var(--lead-gray);
  background-color: transparent;
  background-image: linear-gradient(0deg, var(--lead-gray) 1px, transparent 1px),
    linear-gradient(90deg, var(--lead-gray) 1px, transparent 1px);
  background-size: 10% 20%;
`;
