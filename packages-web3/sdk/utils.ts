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
  [9, 12, 13].reduce((record, mi) => ({...record, [mi]: PDA.createPerpMarketPda(mi)}), {});

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
  return 0;
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

export function getAllPerpMarkets() {
  return [9, 12, 13].map((i) => ({
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
  return [9, 12, 13].map((i) => ({
    pubkey: getObservationPda(i),
    isSigner: false,
    isWritable: true,
  }));
}
