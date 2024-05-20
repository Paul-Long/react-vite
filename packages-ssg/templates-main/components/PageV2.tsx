import {styled} from 'styled-components';

const Wrap = styled.div`
  background: #09090a;
  @font-face {
    font-family: 'PPNeueMachina';
    font-style: normal;
    font-display: swap;
    src: url(https://static.rate-x.io/font/v1/poppins/PPNeueMachina-PlainRegular.woff2)
      format('woff2');
  }
  font-family: PPNeueMachina, sans-serif, 'Helvetica Neue', Helvetica, PingFangSC, -apple-system,
    'Hiragino Sans GB', 'Microsoft YaHei', '微软雅黑', Arial;
`;

export default function () {
  return <Wrap></Wrap>;
}
