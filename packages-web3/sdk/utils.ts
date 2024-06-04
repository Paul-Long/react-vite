import {PublicKey} from '@solana/web3.js';

export const WSOLOraclePda = new PublicKey('2uxV3R8LKtGnXgbJKYte8Mog56atXd16SRp4Xbpmrt8b');

export const PROGRAM_ID = new PublicKey('AZzXAH1LaeHcJ3R8nZjvLiEPz77nnkRyFHSJ7yA9Qhrd');

export const TOKEN_FAUCET = new PublicKey('HA655QyTrZTMKnqUHXCoW6fW2zNuRcasa9knHBvw6hUi');

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
  2: 'AA1dttSTNM4pz2zZmNLy5H5QnpA5eQdgRU7hArAG6K9d',
  3: '6afQWRpDYeoiooNmJmyJ5m8cRydwDERiJYCVKbboTWcT',
  4: '3d5HXfwWosovTNQ6DvYGmHa8ELWgnr6SVD7tvWq8MW7t',
  5: 'ERTaJEtXKDJjwDhp2KytpxzRFTSd3PGbJjFevK7PhF2W',
  6: 'BnamF9QGDkXnE8TTqni3XQfDdnMWTcYVGPKjVbw5e1WR',
  7: 'u38WpxcNi2KkW85nyNKrsEyR2S7jzJSQZTn7TvFR7P8',
};

export function getPerpMarketPda(marketIndex: number): any {
  return new PublicKey(PerpMarketMap[marketIndex]);
}

export function getOraclePda(marketIndex: number): any {
  return {
    0: new PublicKey('9souYUSs5ZqypET9DJ3fnhjuidFcqCNzpE7aPxTrBYop'),
    2: new PublicKey('9souYUSs5ZqypET9DJ3fnhjuidFcqCNzpE7aPxTrBYop'),
    3: new PublicKey('9souYUSs5ZqypET9DJ3fnhjuidFcqCNzpE7aPxTrBYop'),
    4: new PublicKey('9souYUSs5ZqypET9DJ3fnhjuidFcqCNzpE7aPxTrBYop'),
    1: new PublicKey('GPQexWdA6QG4r6Wb7SHXasZuBtfYDRt668RB7Yy4daVG'),
    5: new PublicKey('GPQexWdA6QG4r6Wb7SHXasZuBtfYDRt668RB7Yy4daVG'),
    6: new PublicKey('GPQexWdA6QG4r6Wb7SHXasZuBtfYDRt668RB7Yy4daVG'),
    7: new PublicKey('GPQexWdA6QG4r6Wb7SHXasZuBtfYDRt668RB7Yy4daVG'),
  }[marketIndex];
}

export function getObservationPda(marketIndex: number): any {
  return {
    0: new PublicKey('C7xExBPv9kavyTgRUqfSx9qCpPzD6QPvTGKY2aZbutKA'),
    1: new PublicKey('5oB3DKDq13dURY4ANuikFGFtsBKHH4cnaGcsbkPWc5S8'),
    2: new PublicKey('4pL5XfhT3cLUQ197vyxMp91S6gBpsoUtMrtRufuLfqbR'),
    3: new PublicKey('7MXScfuob1rzYBcUrffaqm33wJunaxaA62LQKVfod6JC'),
    4: new PublicKey('4FNdyG3aFpc4VYeXcMNrqA6wJD3Pi7k6EZmrtAqBvDb1'),
    5: new PublicKey('DZ3Bm5J4SojTEkbDFtpk7Ps6rF2LosYeLZiJ46nSigJk'),
    6: new PublicKey('3zCMn7HVcdsKKs5xLysRr7AcwwseJa7e1fQfi6A6PAf6'),
    7: new PublicKey('3mHxfcs7dXW3zHUWs96CkPpgeMQZyNpheyZnZ9W5fYY3'),
  }[marketIndex];
}

export function getMarginIndexByMarketIndex(marketIndex: number): number {
  return {
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
  }[marketIndex] as number;
}

export function getMarginIndexByMarketIndexV2(marketIndex: number): number {
  return {
    0: 1,
    2: 1,
    3: 1,
    4: 1,
    1: 2,
    5: 2,
    6: 2,
    7: 2,
  }[marketIndex] as number;
}

export function getAllPerpMarkets() {
  return [0, 1, 2, 3, 4, 5, 6, 7].map((i) => ({
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
  return [0, 1, 2, 3, 4, 5, 6, 7].map((i) => ({
    pubkey: getObservationPda(i),
    isSigner: false,
    isWritable: true,
  }));
}
