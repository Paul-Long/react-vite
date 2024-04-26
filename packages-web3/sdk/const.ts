import {PublicKey} from '@solana/web3.js';

export class OrderType {
  static readonly LIMIT = {limit: {}};
  static readonly MARKET = {market: {}};
}

export class PositionDirection {
  static readonly LONG = {long: {}};
  static readonly SHORT = {short: {}};
}

export const TICK_ARRAY_SIZE = 88 * 10;

// const bytesArray = [
//   179, 5, 199, 33, 44, 146, 255, 248, 89, 125, 222, 223, 130, 129, 15, 26, 222, 172, 130, 225, 174,
//   145, 247, 42, 55, 21, 160, 16, 181, 151, 85, 51, 102, 23, 128, 97, 19, 99, 219, 213, 24, 19, 119,
//   136, 36, 179, 198, 182, 56, 240, 169, 2, 142, 113, 201, 33, 249, 22, 217, 34, 31, 23, 142, 204,
// ];
//
// const seed = bytesArray.slice(0, 32);
// export const Admin_Keypair = Keypair.fromSeed(Uint8Array.from(seed));
// const privateKeyBase58 = bs58.encode(Buffer.from(bytesArray));
// console.log('Base58 Private Key:', privateKeyBase58);
// const publicKeyBytes = bytesArray.slice(-32);
// const publicKeyUint8Array = new Uint8Array(publicKeyBytes);
// try {
//   const publicKey = new PublicKey(publicKeyUint8Array);
//   console.log(publicKey.toString());
// } catch (error) {
//   console.error('Failed to create a PublicKey:', error);
// }
// export const ADMIN_AUTHORITY = Admin_Keypair.publicKey;

export const RATE_X_PROGRAM_ID = '2YioBVH5WQtbBAnHPwG5gKmPzcK5CaVJENrzfjYjuyDd';
export const TOKE_FAUCET_PROGRAM_ID = 'HA655QyTrZTMKnqUHXCoW6fW2zNuRcasa9knHBvw6hUi';

export const FAUCET_CONFIG_PDA = new PublicKey('HALSfZXvKUFEAVA74CQxNG8umP18hJCMu3EHS9XgKybr');

export const MINT_ACCOUNT = new PublicKey('6w58sdgsLcxa9UD43GHKVxtfXMe7su5r7UqMJcPwZpp8');
export const STATE_PDA = new PublicKey('HtrrknZoGQU7HMJBjrmiZTEdujYjd2WfXcvXbDFDTjF9');
export const SIGNER_PDA = new PublicKey('BvzDsiFyVE1pans9i5p6VwYFnsxD4nTiB6FK6uiiNJSy');
export const ORACLE_PDA = new PublicKey('BSwxkjXuohVEX2z7sMcNf6Vb4DBwo4tYvkEebfuFxN4X');
export const MARGIN_MARKET_PDA = new PublicKey('FaozH4RxuRz44BG5cnJFeWNBtUJXqZE3QvaNx91La2et');
export const MARGIN_MARKET_VAULT_PDA = new PublicKey(
  'ATtDQr4Kr9CrhVURNEP2N7uskNbJEXjkovepzpJYJagm'
);
export const INSURANCE_FUND_VAULT_PDA = new PublicKey(
  'CsKdDS5AKvkZq2EX3cBsgErqAfiCjSPoGrUxCKdvsnE7'
);
export const USER_STAT_PDA = new PublicKey('6DSjggVrLiFU7HtDWrsvsudcXRqUA6hkF9kA2WZv6uNB');
export const USER_PDA = new PublicKey('2nr9AeSC4TfddUksvqj4tE5DNSh6NAC7E6Q2EXN5fcdd');
export const CONFIG_ACCOUNT = new PublicKey('ByQQKzQkX9MTCAHjTc9gdM4LK7M1ZvPbfP5jh1bVQZ8');
export const TOKEN_VAULT_A_PUBLIC_KEY = new PublicKey(
  'HMc2hfw6ZYxgY97yAk5agFYz4oEJBootvUNumcyEQ15y'
);
export const TOKEN_VAULT_B_PUBLIC_KEY = new PublicKey(
  'G8TyvFzpXB9Gj4aLf9ofWn8MK9AudhaZDXDr5Gcs3zJW'
);
export const OBSERVATION_STATE_PUBLIC_KEY = new PublicKey(
  '37kYnahYikPMV2mcvvtHzEuBEVVApvT9GE1AbMTZkC6x'
);
export const TOKEN_MINT_A = new PublicKey('2fCgaC4X8Hb5yPbHrHZYGPACcmbHpYLsbBZNbNjeuRqY');
export const TOKEN_MINT_B = new PublicKey('xc53fBNVf5bKnzE7zPLgD8QjotQXPd6Gfqz7mDxvESP');
export const PERP_MARKET = new PublicKey('GXeut8zda5hVkrb3G1xJGaM1E7yBTGckXUXUDkT1R3wi');
export const QUOTE_ASSET_VAULT = new PublicKey('3f83GJhiUnWS6fSvW2UAEc7odiyh89sYyezz2GXBXfZy');
export const BASE_ASSET_VAULT = new PublicKey('bE8XL8d1LGmzWkuHKqU5KcfHMQwKrcWgnAnzLGDGYKp');
export const PAYER = new PublicKey('7sXNTgbgrqVinuWCu44NYXvC4vwMW1LuiMxZhnPtp12B');
export const WHIRLPOOL = new PublicKey('2W34hfr9SuyCMDqDpfg9kCh188rA48CFEXfGEtxyEvZu');
export const TICK_ARRAY_UPPER = new PublicKey('Btopy4PJHFLLtZCDxjvG1zb76zhnnuk9oKDvyiCcak8a');
export const TICK_ARRAY_LOWER = new PublicKey('28mQNKztHMfrPiK3tCW3wM14TF3QAkhYVBxM7DbzByq6');

export enum ProgramAccountType {
  User = 'user',
  UserStats = 'user_stats',
  SpotMarketVault = 'spot_market_vault',
  MarginMarket = 'margin_market',
  MarginMarketVault = 'margin_market_vault',
  InsuranceFundVault = 'insurance_fund_vault',
  DriftSigner = 'drift_signer',
  DriftState = 'drift_state',
  DriftOracle = 'drift_oracle',
  DriftKeeper = 'drift_keeper',
}
