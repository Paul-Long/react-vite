import {PublicKey} from '@solana/web3.js';

export const WSOLOraclePda = new PublicKey('AMxYa2B4Edf7s4nAu9YCaJw8USS9y6cC7D3N6XvLTAty');

export function getMarginMarketPda(marginIndex: number): any {
  return {
    0: new PublicKey('Fdi1HRHCzUjq1wBh8aJvDDDkGdNqbSgyn5B9RumAYCnW'),
    1: new PublicKey('CTrtouz5ENNbeEfb1qY1nxwGfvMPvXfaPGFmNZuwvRYK'),
    2: new PublicKey('6QmKRDF3wPD4WezYLSmpRSAJLJ4zc6LLWvnY84fvSLhk'),
  }[marginIndex];
}

export function getMarginMarketVaultPda(marginIndex: number): any {
  return {
    0: new PublicKey('5LYpJ1qFmDMSYE4As4TN2kCssKeCgWaF1VrPkiq9CgqX'),
    1: new PublicKey('FA6bNQhMMXnKGJpHmMJt9jCzG5eoaLf3H5bcE1JQs1Kh'),
    2: new PublicKey('CG53HDgjP93DEff2o1dr84sZgqvrvtY2sgFsw2PjgSUp'),
  }[marginIndex];
}

export function getMintAccountPda(marginIndex: number): any {
  return {
    0: new PublicKey('q4vG2ikT3sXwzQNoQx7hzg27LgxxUMbzHsN3UZQicpn'),
    1: new PublicKey('6w58sdgsLcxa9UD43GHKVxtfXMe7su5r7UqMJcPwZpp8'),
    2: new PublicKey('6ATaSXxpiiFCGfQMv3hKYmnVYEaBLYmXstuJjqCXXXJg'),
  }[marginIndex];
}

export function getFaucetConfigPda(marginIndex: number): any {
  return {
    0: new PublicKey('71RwmyCgw7qWdWFxuvciStffppaDpwcKUXRCUyW8Qzyn'),
    1: new PublicKey('HALSfZXvKUFEAVA74CQxNG8umP18hJCMu3EHS9XgKybr'),
    2: new PublicKey('2rgQosahMCugsB21H8wfpDKvFy4wCQtFCpfTgfwagnUu'),
  }[marginIndex];
}

export function getPerpMarketPda(marketIndex: number): any {
  return {
    0: new PublicKey('4sd7uVCbosEhxxGZkM6GDoAe29jq7B4PtZ8amWpnF2HX'),
    1: new PublicKey('GtBooeBRte3GiEgf1nWQcX743rvuQdZr3vqxNHm69XCL'),
    2: new PublicKey('G1MxPQ5NdQz6W5D2RyGoLnVf7Vtmn3ovnmhggejKMSSW'),
    3: new PublicKey('DxzDk1bSYfFmCznsLkQaircsTUb3fy3rksqhsTBekBML'),
  }[marketIndex];
}

export function getOraclePda(marketIndex: number): any {
  return {
    0: new PublicKey('2MdsGHaRre5raPKDL9Zuk5RMiDhKi8xAioCQ9zNnNvxG'),
    1: new PublicKey('2MdsGHaRre5raPKDL9Zuk5RMiDhKi8xAioCQ9zNnNvxG'),
    2: new PublicKey('FyMTvDJ9bsGFfm2C9FfG4dHygXWUpY5BT4RgpeNCYU3h'),
    3: new PublicKey('FyMTvDJ9bsGFfm2C9FfG4dHygXWUpY5BT4RgpeNCYU3h'),
  }[marketIndex];
}

export function getObservationPda(marketIndex: number): any {
  return {
    0: new PublicKey('HNiXqMtxuRnqUkofjWH4RupKgyECRAJ3T48SJiCXiiqp'),
    1: new PublicKey('FCSLUXEes8MYwsWRXBhzKNErT9nn3FEHLUmnhZbByUBT'),
    2: new PublicKey('G1xdtVeiWe59VFBJ1fKqZziQxB4NBnCUzKgxzy3oxkaa'),
    3: new PublicKey('5B4ktNYfmLG3b1xri3aV4zs7tzr7JBcBKTwhXuzqQF5Y'),
  }[marketIndex];
}

export function getMarginIndexByMarketIndex(marketIndex: number): number {
  return {
    0: 0,
    1: 0,
    2: 0,
    3: 0,
  }[marketIndex] as number;
}
