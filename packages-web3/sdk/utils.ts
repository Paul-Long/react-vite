import {PDA} from '@/sdk/PDA';
import {PublicKey} from '@solana/web3.js';

export const PROGRAM_ID = new PublicKey('6cYMUFsS1ApVQi3HZMG9dGeyobZkg7YTg3tSnf8QYCrL');

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

export const PerpMarketMap = (): Record<number, string> => {
  return [2, 3].reduce((record, mi) => ({...record, [mi]: PDA.createPerpMarketPda(mi)}), {});
};

export function getObservationPda(marketIndex: number): any {
  return {
    2: new PublicKey('DcPN2voFCYKxypbQBgVfSs8C2EW3p2bGFf7Pvr9PaNoq'),
    3: new PublicKey('5aqrzU5V4M9GxJiobdvLdPGfbn8BAtepRvc3r1bYsY6g'),
  }[marketIndex];
}

export function getMarginIndexByMarketIndex(marketIndex: number): number {
  return 0;
}

export function getMarginIndexByMarketIndexV2(marketIndex: number): number {
  return {
    2: 1,
    3: 2,
  }[marketIndex] as number;
}

export function getAllPerpMarkets() {
  return [2, 3].map((i) => ({
    pubkey: PDA.createPerpMarketPda(i),
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
  return [2, 3].map((i) => ({
    pubkey: getObservationPda(i),
    isSigner: false,
    isWritable: true,
  }));
}
