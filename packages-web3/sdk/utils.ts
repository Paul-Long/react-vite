import {PDA} from '@/sdk/PDA';
import {PublicKey} from '@solana/web3.js';

export const PROGRAM_ID = new PublicKey('3esydoK3Vu5p2GibBE8ZNpCBv5tP7FvQPp273n6fAmj3');

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
  [0, 1, 2, 3].reduce((record, mi) => ({...record, [mi]: PDA.createPerpMarketPda(mi)}), {});

export function getObservationPda(marketIndex: number): any {
  return {
    0: new PublicKey('8zFeBuVaqf7KQ15Nju7ebTenKapYNpeSXyFus9wKTk3K'),
    1: new PublicKey('BsfCHjCGyCtT3Vvoihp23DW3uxUTmtPb9hF9EtttcBYy'),
    2: new PublicKey('5qrEyQcvbyDF2KUJt9v3F1UwRq3hPWsUDT83w47K8HVT'),
    3: new PublicKey('EwqYD3txG8ufAsCLWrqXQUnXTHsoe9D9iW44RCGhr2QU'),
  }[marketIndex];
}

export function getMarginIndexByMarketIndex(marketIndex: number): number {
  return 0;
}

export function getMarginIndexByMarketIndexV2(marketIndex: number): number {
  return {
    0: 1,
    1: 1,
    2: 2,
    3: 2,
  }[marketIndex] as number;
}

export function getAllPerpMarkets() {
  return [0, 1, 2, 3].map((i) => ({
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
  return [0, 1, 2, 3].map((i) => ({
    pubkey: getObservationPda(i),
    isSigner: false,
    isWritable: true,
  }));
}
