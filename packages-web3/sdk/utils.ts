import * as anchor from '@coral-xyz/anchor';
import {PublicKey} from '@solana/web3.js';
import {Buffer} from 'buffer';

export async function getUserAccountPublicKeyAndNonce(
  programId: PublicKey,
  authority: PublicKey,
  subAccountId = 0
): Promise<[PublicKey, number]> {
  return PublicKey.findProgramAddress(
    [
      Buffer.from(anchor.utils.bytes.utf8.encode('user')),
      authority.toBuffer(),
      new anchor.BN(subAccountId).toArrayLike(Buffer, 'le', 2),
    ],
    programId
  );
}

export async function getUserAccountPublicKey(
  programId: PublicKey,
  authority: PublicKey,
  subAccountId = 0
): Promise<PublicKey> {
  return (await getUserAccountPublicKeyAndNonce(programId, authority, subAccountId))[0];
}

export async function getMarginVaultPublicKey(
  programId: PublicKey,
  authority: PublicKey,
  subAccountId: number
) {
  return (
    await PublicKey.findProgramAddress(
      [
        Buffer.from(anchor.utils.bytes.utf8.encode('spot_market_vault')),
        authority.toBuffer(),
        new anchor.BN(subAccountId).toArrayLike(Buffer, 'le', 2),
      ],
      programId
    )
  )[0];
}
