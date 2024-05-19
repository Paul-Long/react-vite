import {PublicKey} from '@solana/web3.js';

export const WSOLOraclePda = new PublicKey('AMxYa2B4Edf7s4nAu9YCaJw8USS9y6cC7D3N6XvLTAty');

export function getMarginMarketPda(marginIndex: number): any {
  return {
    0: new PublicKey('9Bq8D9Wp8XstwC2Lvo5raETupSuZmteVPAZhqxpkmnaS'),
    1: new PublicKey('6gzUU6TC9uTKzM1emmhLCeH9MQ89dMnKwYidTbR7YPsB'),
    2: new PublicKey('D9X4oRD9ffnyqVANQMgxBGxo252EnmZG5CJcxfxC56NT'),
  }[marginIndex];
}

export function getMarginMarketVaultPda(marginIndex: number): any {
  return {
    0: new PublicKey('xGc7wCVcdv3acgCnHtn1YZEeE2QVBX9JZQCLRVraRaR'),
    1: new PublicKey('EbsbaPZSsfW1zKfTEBKq2KthcXyPTxVsHYG1wuuWnZga'),
    2: new PublicKey('6mTuHmaQgK8ZC1aGjfE5AwSwkFFmwypyK8FbioquQw88'),
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
    0: new PublicKey('6HNqh7A46z9Pvc38ZfXkWdtHqpC8MqcJvGq8o6K7yN9m'),
    1: new PublicKey('CVzS4GRECRLdeQhAJHSaAUbCLTnVqowCHrqGCoQTdXTu'),
    2: new PublicKey('Eqp4SdrwBANBVkzMo7RoqY3n5838qMeAUh8dw294dT3K'),
    3: new PublicKey('2VnARGCKYwQeezCh89k6deRGEVH4mjZKLQxFMEqUeP7v'),
    4: new PublicKey('2MAwdYUaPGYhFRMEVixvduwyFgbmVF9qC9pNCXrx2n91'),
  }[marketIndex];
}

export function getOraclePda(marketIndex: number): any {
  return {
    0: new PublicKey('Eb6SUq2DVuoA9pQ91sxUz5H7chN4T39tA2ZLN75oGvz2'),
    1: new PublicKey('Eb6SUq2DVuoA9pQ91sxUz5H7chN4T39tA2ZLN75oGvz2'),
    2: new PublicKey('5hqUKPbps7kunGutak6xsavuK3QBz1rKtqyKr6EoZQ8E'),
    3: new PublicKey('5hqUKPbps7kunGutak6xsavuK3QBz1rKtqyKr6EoZQ8E'),
    4: new PublicKey('Eb6SUq2DVuoA9pQ91sxUz5H7chN4T39tA2ZLN75oGvz2'),
  }[marketIndex];
}

export function getObservationPda(marketIndex: number): any {
  return {
    0: new PublicKey('5bDHv6motZ836oQaLpcEN8t2iGnmDVETw5hSC2U8gVQz'),
    1: new PublicKey('6nrgDnhDHBKzEBqXCPyQLnmdHbsF9m1ckXpUtiqqb5ig'),
    2: new PublicKey('GG9W5pyRsNeWxnAHNXXwKR9xwvKAFV3qtZE25fsuf9Hr'),
    3: new PublicKey('FrpjPjKaJtV2t4e9NaX4bKSC3RGmrKKA12uXJ1XVpRUp'),
    4: new PublicKey('Ew6fRAwDz8WBGZMJLbGMEgfnYcYn5dk6pp74ZASg3oGz'),
  }[marketIndex];
}

export function getMarginIndexByMarketIndex(marketIndex: number): number {
  return {
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
  }[marketIndex] as number;
}
