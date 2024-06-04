import {PublicKey} from '@solana/web3.js';

export const WSOLOraclePda = new PublicKey('E8ZQeKpiMfuLRVMXKmH9nqSPfcQ9diGqPQtLoBYZotKY');

export const PROGRAM_ID = new PublicKey('8EbMSp52FXmrAV64s85xzyCXGUDVxmmMaA5VK1uHT8To');

export const TOKEN_FAUCET = new PublicKey('HA655QyTrZTMKnqUHXCoW6fW2zNuRcasa9knHBvw6hUi');

export function getMarginMarketPda(marginIndex: number): any {
  return {
    0: new PublicKey('3Dj4jJUtPriBtrFrY9doFm8Qso4vLxsLCH46dJks5fbb'),
    1: new PublicKey('97FqGdjNLytne3rTjUKvcUmvEE7npH8SirVKX5sVpeqR'),
    2: new PublicKey('DTtusuKpERj5uPvxr6eubwSRZegEsZu8KbcCjdYNxArN'),
  }[marginIndex];
}

export function getMarginMarketVaultPda(marginIndex: number): any {
  return {
    0: new PublicKey('7gJKDFwYGQMHccNxbhjV1MSFmMe8j3fB1mp44XenTVpe'),
    1: new PublicKey('DpCkxRUya5DBadskBH1jYpxNB4R2e8c3JVwj29nmFvAm'),
    2: new PublicKey('BuLmSYyQPmXSueySXSFe66H2j2LkeSrM1m3tLVKLAyZR'),
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

export const PerpMarketMap: Record<number, string> = {
  0: 'BpppZgAhrpyzPCp9cCJ4FH8Vd2nfQ5uaFJnsx3V66p83',
  1: 'Ac9aEmgLSYnZxJAzq8nDenqLEWDQRHKyqgSi73Yc5bRG',
  2: 'DJiALhWP4cXyaD1he9aEF4WuT5423aoxjrQ3AEhw9P16',
  6: '8JWA8NcaeMaqhi9ywJv1snZyrjs43aqxbjF9Ha1tc6uT',
  7: 'H94Dqeep3LZeiVKBH57w2okNPoMNy2KLAABsRTmS6syv',
  8: '9kAC1kNcViVvLSAfiFafa6tLAtRVAwXWQRxDm2ESfygF',
  9: 'CEwH7S8F3ecCsBpBUgEDUyufQcR5Dkat8nyqAJSBU46P',
  11: 'BqPdhts1L5YAGQjUjRxJdsU9GaFxJnh5k7GjRoPMJ3fD',
  12: '6Si7ttgXTVtfvwDwwut4LgtdK8uYtbJ5BbiigZj4mhMR',
  13: '4TNYtZRmV72hB5nAotwANbokabiF4Cv71ZKiMMDBjCh2',
};

export function getPerpMarketPda(marketIndex: number): any {
  return new PublicKey(PerpMarketMap[marketIndex]);
}

export function getOraclePda(marketIndex: number): any {
  return {
    0: new PublicKey('5tuJWgp3RR2ZUJ3J25xJ5Yi44JpNR6HHBLnaAdXszemC'),
    1: new PublicKey('5tuJWgp3RR2ZUJ3J25xJ5Yi44JpNR6HHBLnaAdXszemC'),
    2: new PublicKey('5tuJWgp3RR2ZUJ3J25xJ5Yi44JpNR6HHBLnaAdXszemC'),
    6: new PublicKey('pTPPLhKnEvLsvqUHJv2Ze3bmFukZGcnQzWWUQQnJpqm'),
    7: new PublicKey('pTPPLhKnEvLsvqUHJv2Ze3bmFukZGcnQzWWUQQnJpqm'),
    8: new PublicKey('5tuJWgp3RR2ZUJ3J25xJ5Yi44JpNR6HHBLnaAdXszemC'),
    9: new PublicKey('5tuJWgp3RR2ZUJ3J25xJ5Yi44JpNR6HHBLnaAdXszemC'),
    11: new PublicKey('pTPPLhKnEvLsvqUHJv2Ze3bmFukZGcnQzWWUQQnJpqm'),
    12: new PublicKey('5tuJWgp3RR2ZUJ3J25xJ5Yi44JpNR6HHBLnaAdXszemC'),
    13: new PublicKey('pTPPLhKnEvLsvqUHJv2Ze3bmFukZGcnQzWWUQQnJpqm'),
  }[marketIndex];
}

export function getObservationPda(marketIndex: number): any {
  return {
    0: new PublicKey('6rm7RuKduugFT3sEJ1fqRmegk7gmh9qX4r4dBJnrQ4tv'),
    1: new PublicKey('2yhrgUZym3ruaq9ELfYuoXrc4xjoRgavjbv9pVAhaheW'),
    2: new PublicKey('2iwq4d6rFSakn8gJjHSpp8SCGp16k3Q2sB6yMWhrZQ5b'),
    6: new PublicKey('XB2BYGQSqJXeyCGSRKV6WFwqepr83jXXs4RyUkq6zkd'),
    7: new PublicKey('CU1sGwjcc3V7JnGEDSWn5teEnrPEzstfRdHt6NPZUohW'),
    8: new PublicKey('6bqorzLMBg7twmJEbu1AtSjR6eYTbKv5d7EqFTkxz4yH'),
    9: new PublicKey('2qJQRBB7fMzrUQ4KQfGnjjrPosfYyW9zVffinbrU7JeZ'),
    11: new PublicKey('FWVD9VApKbtjPvBBNkX56rSwoVtYjzMkr5Sn7uFu3ssy'),
    12: new PublicKey('DDSmFMLWh5XNoXm3Phy6gA3YoicZL6tB3hco6AyDe9aE'),
    13: new PublicKey('BkndJdhERYoTVvpexuzAVsME9tBawBW53jtKCJpmm3Es'),
  }[marketIndex];
}

export function getMarginIndexByMarketIndex(marketIndex: number): number {
  return {
    0: 0,
    1: 0,
    2: 0,
    6: 0,
    7: 0,
    8: 0,
    9: 0,
    11: 0,
    12: 0,
    13: 0,
  }[marketIndex] as number;
}

export function getMarginIndexByMarketIndexV2(marketIndex: number): number {
  return {
    0: 1,
    1: 1,
    2: 1,
    6: 2,
    7: 2,
    8: 1,
    9: 1,
    11: 2,
    12: 1,
    13: 2,
  }[marketIndex] as number;
}
