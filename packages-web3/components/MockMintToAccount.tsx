import {BN} from '@coral-xyz/anchor';
import {
  AccountLayout,
  TOKEN_PROGRAM_ID,
  createInitializeAccountInstruction,
  createMintToInstruction,
  getMinimumBalanceForRentExemptAccount,
} from '@solana/spl-token';
import {useConnection, useWallet} from '@solana/wallet-adapter-react';
import {Keypair, PublicKey, SystemProgram, Transaction} from '@solana/web3.js';
import {useCallback} from 'react';

const fakeUSDCMint = new PublicKey('9aWhnNWXVypCGoVN75DUBaq1N95bbFvgTsEuuyC6s16t');

export const MockMintToAccount = () => {
  const {connection} = useConnection();
  const wallet = useWallet();

  const mockUserUSDCAccount = useCallback(
    async (fakeUSDCMint: PublicKey) => {
      if (!wallet.publicKey || !wallet.sendTransaction) {
        console.log('Wallet is not connected');
        return;
      }

      const userUSDCAccount = Keypair.generate(); // 仅用于生成公钥，私钥不会被使用
      const transaction = new Transaction();
      const {blockhash} = await connection.getRecentBlockhash();
      transaction.feePayer = wallet.publicKey;
      transaction.recentBlockhash = blockhash;

      const lamports = await getMinimumBalanceForRentExemptAccount(connection);

      transaction.add(
        SystemProgram.createAccount({
          fromPubkey: wallet.publicKey,
          newAccountPubkey: userUSDCAccount.publicKey,
          lamports,
          space: AccountLayout.span,
          programId: TOKEN_PROGRAM_ID,
        }),
        createInitializeAccountInstruction(
          userUSDCAccount.publicKey,
          fakeUSDCMint,
          wallet.publicKey, // 假设用户是代币账户的所有者
          TOKEN_PROGRAM_ID
        ),
        createMintToInstruction(
          fakeUSDCMint,
          userUSDCAccount.publicKey,
          wallet.publicKey, // 假设钱包可以铸造代币
          new BN(10_000_000_000).toNumber(),
          [] // 铸币交易通常需要多个签名者，这里假设只有一个
        )
      );

      try {
        // 签署并发送交易
        const signature = await wallet.sendTransaction(transaction, connection);
        console.log('Transaction confirmed with signature:', signature);
        await connection.confirmTransaction(signature, 'confirmed');
        console.log('Transaction confirmed with signature:', signature);
      } catch (error) {
        console.error('Transaction failed', error);
      }
    },
    [wallet, connection]
  );

  return (
    <button onClick={() => mockUserUSDCAccount(fakeUSDCMint)} disabled={!wallet.connected}>
      Mock USDC Account
    </button>
  );
};
