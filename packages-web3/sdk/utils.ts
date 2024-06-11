import {PDA} from '@/sdk/PDA';
import {PublicKey} from '@solana/web3.js';

export const PROGRAM_ID = new PublicKey('8EbMSp52FXmrAV64s85xzyCXGUDVxmmMaA5VK1uHT8To');

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
  [14, 15, 16, 17].reduce((record, mi) => ({...record, [mi]: PDA.createPerpMarketPda(mi)}), {});

export function getObservationPda(marketIndex: number): any {
  return {
    14: new PublicKey('3r8okkmpRLfgx7FuEF2uHkVF9HDRXfKTJPDDKdH2qHEW'),
    15: new PublicKey('5Whdajiz66eSMhduxipUKqU12y24EzUWxxWirTZuBbyW'),
    16: new PublicKey('Fz7gX9RjZjG2ztrGR8swUv2NmVGcQ62AwCWs1D92uaRP'),
    17: new PublicKey('28fA5dw216QzeESst5WLLxnWCeGRUtrKnpkf1BKajhfq'),
  }[marketIndex];
}

export function getMarginIndexByMarketIndex(marketIndex: number): number {
  return 0;
}

export function getMarginIndexByMarketIndexV2(marketIndex: number): number {
  return {
    14: 1,
    15: 1,
    16: 2,
    17: 2,
  }[marketIndex] as number;
}

export function getAllPerpMarkets() {
  return [14, 15, 16, 17].map((i) => ({
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
  return [14, 15, 16, 17].map((i) => ({
    pubkey: getObservationPda(i),
    isSigner: false,
    isWritable: true,
  }));
}
