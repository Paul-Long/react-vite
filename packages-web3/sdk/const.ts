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
export const TOKEN_VAULT_A_PUBLIC_KEY = new PublicKey(
  'HMc2hfw6ZYxgY97yAk5agFYz4oEJBootvUNumcyEQ15y'
);
export const TOKEN_VAULT_B_PUBLIC_KEY = new PublicKey(
  'G8TyvFzpXB9Gj4aLf9ofWn8MK9AudhaZDXDr5Gcs3zJW'
);
export const OBSERVATION_STATE_PUBLIC_KEY = new PublicKey(
  '37kYnahYikPMV2mcvvtHzEuBEVVApvT9GE1AbMTZkC6x'
);
export const TOKEN_MINT_A = new PublicKey('xc53fBNVf5bKnzE7zPLgD8QjotQXPd6Gfqz7mDxvESP');
export const TOKEN_MINT_B = new PublicKey('2fCgaC4X8Hb5yPbHrHZYGPACcmbHpYLsbBZNbNjeuRqY');
export const PERP_MARKET = new PublicKey('GXeut8zda5hVkrb3G1xJGaM1E7yBTGckXUXUDkT1R3wi');
export const QUOTE_ASSET_VAULT = new PublicKey('3f83GJhiUnWS6fSvW2UAEc7odiyh89sYyezz2GXBXfZy');
export const BASE_ASSET_VAULT = new PublicKey('bE8XL8d1LGmzWkuHKqU5KcfHMQwKrcWgnAnzLGDGYKp');
export const WHIRLPOOL = new PublicKey('2W34hfr9SuyCMDqDpfg9kCh188rA48CFEXfGEtxyEvZu');
