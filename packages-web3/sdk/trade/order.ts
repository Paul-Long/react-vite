import {RatexContracts} from '@/idl/ratex_contracts';
import {OrderType, PositionDirection} from '@/sdk/const';
import {getUserAccountPublicKey} from '@/sdk/utils';
import type {Program} from '@coral-xyz/anchor';
import {PublicKey} from '@solana/web3.js';

export async function placeOrder(
  program?: Program<RatexContracts> | null,
  publicKey?: PublicKey | null
) {
  return new Promise(function (resolve, reject) {
    import('@coral-xyz/anchor').then(async (anchor) => {
      const userAccountPublicKey = await getUserAccountPublicKey(
        program?.programId as PublicKey,
        publicKey as any,
        0
      );

      console.log(program, publicKey?.toBase58());

      const orderParams = {
        orderType: OrderType.MARKET,
        direction: PositionDirection.LONG,
        baseAssetAmount: new anchor.BN(1000),
        priceLimit: new anchor.BN(1000),
        marketIndex: 1,
      };

      console.log('order params : ', orderParams);
      console.log(userAccountPublicKey.toBase58(), publicKey?.toBase58());

      const tx = await program?.rpc?.placePerpOrder(
        1, // order_id
        orderParams,
        {
          accounts: {
            user: userAccountPublicKey,
            authority: publicKey as any,
          },
        }
      );

      console.log('PlaceOrder tx : ', tx);
      resolve(tx);
      return tx;
    });
  });
}
