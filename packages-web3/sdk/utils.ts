import * as anchor from '@coral-xyz/anchor';
import {PublicKey} from '@solana/web3.js';

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
