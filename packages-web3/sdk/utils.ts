import {PublicKey} from '@solana/web3.js';

export const WSOLOraclePda = new PublicKey('2uxV3R8LKtGnXgbJKYte8Mog56atXd16SRp4Xbpmrt8b');

export function getMarginMarketPda(marginIndex: number): any {
  return {
    0: new PublicKey('HJ2FnParWWy2NKjhfmsRQhpLsKyNwsafTyUvj89Nybrb'),
    1: new PublicKey('CK2QYhmE69JUBTEteQ8GezYNDHopJQYwheo3XH4rdotJ'),
    2: new PublicKey('8dtEmeFdWbGUjjG8PbzoGnMEjxCNXZWgK64kdTCxz5DT'),
  }[marginIndex];
}

export function getMarginMarketVaultPda(marginIndex: number): any {
  return {
    0: new PublicKey('AMaSYehJcuNyqoqTuSP9baMZ28fQzfauEmstzhzyyrDn'),
    1: new PublicKey('JDaJ3ZCSz57NM7qFForNTVojiayeNcPokevUX1xWpWFu'),
    2: new PublicKey('As4AgoJJYAX5m4Bbus7jjsZNhBhzfZ2K6YEYDd7LBz6w'),
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
  0: 'C3t6wLgfhdXHWyUXsS2uhbFk9dRrmzz8o7h7yypDm4CD',
  1: '9NC8STwSvhu9jbWBbmTGjg8AeTj7BznmGmzoDPZLTKV2',
};

export function getPerpMarketPda(marketIndex: number): any {
  return new PublicKey(PerpMarketMap[marketIndex]);
}

export function getOraclePda(marketIndex: number): any {
  return {
    0: new PublicKey('9souYUSs5ZqypET9DJ3fnhjuidFcqCNzpE7aPxTrBYop'),
    1: new PublicKey('GPQexWdA6QG4r6Wb7SHXasZuBtfYDRt668RB7Yy4daVG'),
  }[marketIndex];
}

export function getObservationPda(marketIndex: number): any {
  return {
    0: new PublicKey('C7xExBPv9kavyTgRUqfSx9qCpPzD6QPvTGKY2aZbutKA'),
    1: new PublicKey('5oB3DKDq13dURY4ANuikFGFtsBKHH4cnaGcsbkPWc5S8'),
  }[marketIndex];
}

export function getMarginIndexByMarketIndex(marketIndex: number): number {
  return {
    0: 0,
    1: 0,
  }[marketIndex] as number;
}

export function getMarginIndexByMarketIndexV2(marketIndex: number): number {
  return {
    0: 1,
    1: 2,
  }[marketIndex] as number;
}

export function getAllPerpMarkets() {
  return [0, 1].map((i) => ({
    pubkey: getPerpMarketPda(i),
    isSigner: false,
    isWritable: true,
  }));
}
export function getAllOracles() {
  return [
    {
      pubkey: WSOLOraclePda,
      isSigner: false,
      isWritable: true,
    },
    ...[0, 1].map((i) => ({
      pubkey: getOraclePda(i),
      isSigner: false,
      isWritable: true,
    })),
  ];
}

export function getAllObservations() {
  return [0, 1].map((i) => ({
    pubkey: getObservationPda(i),
    isSigner: false,
    isWritable: true,
  }));
}
