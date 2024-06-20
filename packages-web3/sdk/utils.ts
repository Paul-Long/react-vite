import {PDA} from '@/sdk/PDA';
import {PublicKey} from '@solana/web3.js';

export const PROGRAM_ID = new PublicKey('D2GjhSfv9k2pRZLjHw7pEGUyZiapvXa76h1XR3YD1ap9');

export const TOKEN_FAUCET = new PublicKey('HA655QyTrZTMKnqUHXCoW6fW2zNuRcasa9knHBvw6hUi');

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

export const PerpMarketMap = (): Record<number, string> =>
  [0, 1].reduce((record, mi) => ({...record, [mi]: PDA.createYieldMarketPda(mi)}), {});

export function getObservationPda(marketIndex: number): any {
  return {
    0: new PublicKey('7Uv6N4UAydohARGfa3n8bMVyUSJV3Gey9TuJY3GNT71L'),
    1: new PublicKey('4VrBrMHf9bnMT1HpH9xFD1fdPRu5obiHqAc25sm2BwCH'),
  }[marketIndex];
}

export function getMarginIndexByMarketIndex(marketIndex: number): number {
  return 0;
}

export function getMarginIndexByMarketIndexV2(marketIndex: number): number {
  return {
    0: 1,
    1: 2,
  }[marketIndex] as number;
}

export function getAllPerpMarkets() {
  return [0, 1].map((i) => ({
    pubkey: PDA.createYieldMarketPda(i),
    isSigner: false,
    isWritable: true,
  }));
}
export function getAllOracles() {
  return [
    ...[0, 1, 2].map((i) => ({
      pubkey: PDA.createOraclePda(i),
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
