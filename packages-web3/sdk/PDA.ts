import {getMintAccountPda, PROGRAM_ID} from '@/sdk/utils';
import {BN} from '@coral-xyz/anchor';
import {PublicKey} from '@solana/web3.js';
import {Buffer} from 'buffer';

export class PDA {
  static createStatePda() {
    return PublicKey.findProgramAddressSync([Buffer.from('drift_state')], PROGRAM_ID)[0];
  }

  static createDriftSigner() {
    return PublicKey.findProgramAddressSync([Buffer.from('drift_signer')], PROGRAM_ID)[0];
  }

  static createKeeperPda() {
    return PublicKey.findProgramAddressSync([Buffer.from('drift_keeper')], PROGRAM_ID)[0];
  }

  static createLpUserPda(authority: PublicKey, subAccountId: number = 0) {
    return PublicKey.findProgramAddressSync(
      [Buffer.from('lp'), authority.toBuffer(), new BN(subAccountId).toArrayLike(Buffer, 'le', 2)],
      PROGRAM_ID
    )[0];
  }

  static createUserPda(authority: PublicKey, subAccountId: number = 0) {
    return PublicKey.findProgramAddressSync(
      [
        Buffer.from('user'),
        authority?.toBuffer(),
        new BN(subAccountId).toArrayLike(Buffer, 'le', 2),
      ],
      PROGRAM_ID
    )[0];
  }

  static createUserStatPda(authority: PublicKey) {
    return PublicKey.findProgramAddressSync(
      [Buffer.from('user_stats'), authority?.toBuffer()],
      PROGRAM_ID
    )[0];
  }

  static createUserOrdersPda(authority: PublicKey, subAccountId: number) {
    return PublicKey.findProgramAddressSync(
      [
        Buffer.from('user_orders'),
        authority.toBuffer(),
        new BN(subAccountId).toArrayLike(Buffer, 'le', 2),
      ],
      PROGRAM_ID
    )[0];
  }

  static createQuoteAssetVaultPda(marketIndex: number) {
    return PublicKey.findProgramAddressSync(
      [Buffer.from('quote_asset_vault'), new BN(marketIndex).toArrayLike(Buffer, 'le', 2)],
      PROGRAM_ID
    )[0];
  }

  static createBaseAssetVaultPda(marketIndex: number) {
    return PublicKey.findProgramAddressSync(
      [Buffer.from('base_asset_vault'), new BN(marketIndex).toArrayLike(Buffer, 'le', 2)],
      PROGRAM_ID
    )[0];
  }

  static createPerpMarketPda(marketIndex: number): PublicKey {
    return PublicKey.findProgramAddressSync(
      [Buffer.from('perp_market'), new BN(marketIndex).toArrayLike(Buffer, 'le', 2)],
      PROGRAM_ID
    )[0];
  }

  static createMarginMarketPda(marginIndex: number) {
    return PublicKey.findProgramAddressSync(
      [Buffer.from('margin_market'), new BN(marginIndex).toArrayLike(Buffer, 'le', 2)],
      PROGRAM_ID
    )[0];
  }

  static createMarginMarketVaultPda(marginIndex: number) {
    return PublicKey.findProgramAddressSync(
      [Buffer.from('margin_market_vault'), new BN(marginIndex).toArrayLike(Buffer, 'le', 2)],
      PROGRAM_ID
    )[0];
  }

  static createOraclePda(marginIndex: number): PublicKey {
    return PublicKey.findProgramAddressSync(
      [Buffer.from('drift_oracle'), getMintAccountPda(marginIndex).toBuffer()],
      PROGRAM_ID
    )[0];
  }
}
