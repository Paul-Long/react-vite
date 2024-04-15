import * as anchor from '@coral-xyz/anchor';
import {AnchorProvider, BN} from '@coral-xyz/anchor';
import {
  AccountLayout,
  MintLayout,
  TOKEN_PROGRAM_ID,
  createInitializeAccountInstruction,
  createInitializeMintInstruction,
  createMintToInstruction,
  getMinimumBalanceForRentExemptMint,
} from '@solana/spl-token';
import {
  Keypair,
  PublicKey,
  SystemProgram,
  Transaction,
  sendAndConfirmTransaction,
} from '@solana/web3.js';
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

export async function mockMSOLMint(provider: AnchorProvider): Promise<Keypair> {
  const fakeMSOLMint = Keypair.generate();
  const lamportsNeeded = await getMinimumBalanceForRentExemptMint(provider.connection);

  const createMSOLMintAccountIx = SystemProgram.createAccount({
    fromPubkey: provider.wallet.publicKey,
    newAccountPubkey: fakeMSOLMint.publicKey,
    lamports: lamportsNeeded,
    space: MintLayout.span,
    programId: TOKEN_PROGRAM_ID,
  });

  const initMSOLMintIx = createInitializeMintInstruction(
    fakeMSOLMint.publicKey,
    9, // Assuming 9 decimal places for the mint
    provider.wallet.publicKey, // Authority, assuming the wallet's public key
    provider.wallet.publicKey // Freeze authority, assuming the wallet's public key
  );

  const transaction = new Transaction();
  transaction.add(createMSOLMintAccountIx, initMSOLMintIx);

  // Fetch the recent blockhash from the network
  const {blockhash} = await provider.connection.getRecentBlockhash();
  transaction.recentBlockhash = blockhash;

  // Sign the transaction with the provider's wallet and the newly created fake mint's secret key
  transaction.sign(fakeMSOLMint);

  // Since we're signing with the fake mint's secret key manually, we don't need to pass it separately
  const signature = await provider.sendAndConfirm(transaction, [fakeMSOLMint]);

  console.log(`Mint created with transaction signature: ${signature}`);

  return fakeMSOLMint;
}

export async function mockUserMSOLAccount(
  fakeUSDCMint: PublicKey,
  usdcMintAmount: BN,
  provider: AnchorProvider,
  owner?: PublicKey
): Promise<Keypair> {
  const userUSDCAccount = anchor.web3.Keypair.generate();
  const fakeUSDCTx = new Transaction();

  if (owner === undefined) {
    owner = provider.wallet.publicKey;
  }

  const lamportsForRent = await getMinimumBalanceForRentExemptMint(provider.connection);

  const createUSDCTokenAccountIx = SystemProgram.createAccount({
    fromPubkey: provider.wallet.publicKey,
    newAccountPubkey: userUSDCAccount.publicKey,
    lamports: lamportsForRent,
    space: AccountLayout.span,
    programId: TOKEN_PROGRAM_ID,
  });
  fakeUSDCTx.add(createUSDCTokenAccountIx);

  const initUSDCTokenAccountIx = createInitializeAccountInstruction(
    userUSDCAccount.publicKey,
    fakeUSDCMint,
    owner as any
  );
  fakeUSDCTx.add(initUSDCTokenAccountIx);

  const mintToUserAccountIx = createMintToInstruction(
    fakeUSDCMint,
    userUSDCAccount.publicKey,
    owner as any,
    usdcMintAmount.toNumber(),
    []
  );
  fakeUSDCTx.add(mintToUserAccountIx);

  // 添加所有必要的签名者
  const signers = [userUSDCAccount];
  if (!owner?.equals(provider.wallet.publicKey)) {
    // signers.push(fakeUSDCMint);
  }

  console.log(userUSDCAccount.publicKey.toBase58());
  console.log(owner?.toBase58());

  try {
    const fakeUSDCTxResult = await sendAndConfirmTransaction(
      provider.connection,
      fakeUSDCTx,
      signers,
      {
        skipPreflight: false,
        commitment: 'finalized',
        preflightCommitment: 'finalized',
      }
    );
    console.log(`Transaction confirmed with signature: ${fakeUSDCTxResult}`);
  } catch (error) {
    console.error('Error during transaction', error);
    throw error;
  }
  return userUSDCAccount;
}

export async function mockUserMSOLAccount2(
  fakeUSDCMint: PublicKey,
  usdcMintAmount: BN,
  provider: AnchorProvider,
  programId: PublicKey,
  owner?: PublicKey
): Promise<Keypair> {
  // 生成一个新的密钥对来存放USDC代币
  const userUSDCAccount = Keypair.generate();

  // 获取为新账户支付租金所需的lamports数量
  const lamportsForRent = await getMinimumBalanceForRentExemptMint(provider.connection);

  // 创建USDC token账户的交易指令
  const createUSDCTokenAccountIx = SystemProgram.createAccount({
    fromPubkey: provider.wallet.publicKey,
    newAccountPubkey: userUSDCAccount.publicKey,
    lamports: lamportsForRent,
    space: AccountLayout.span,
    programId,
  });

  // 初始化USDC token账户的交易指令
  const initUSDCTokenAccountIx = createInitializeAccountInstruction(
    userUSDCAccount.publicKey,
    fakeUSDCMint,
    provider.wallet.publicKey, // owner即为当前钱包用户
    programId
  );

  // 向USDC token账户铸造代币的交易指令
  const mintToUserAccountIx = createMintToInstruction(
    fakeUSDCMint,
    userUSDCAccount.publicKey,
    provider.wallet.publicKey, // owner即为当前钱包用户，也是铸造权限的持有者
    usdcMintAmount.toNumber(),
    [], // 铸造代币不需要multi-signature签名者
    programId
  );

  // 创建交易并添加交易指令
  const transaction = new Transaction()
    .add(createUSDCTokenAccountIx)
    .add(initUSDCTokenAccountIx)
    .add(mintToUserAccountIx);
  const {blockhash} = await provider.connection.getRecentBlockhash();
  transaction.feePayer = provider.wallet.publicKey;
  transaction.recentBlockhash = blockhash;

  console.log('UserUSDCAccount : ', userUSDCAccount.publicKey.toBase58());
  console.log('Wallet PublicKey : ', provider.wallet.publicKey.toBase58());
  console.log('fakeUSDCMint : ', fakeUSDCMint.toBase58());
  console.log('TOKEN_PROGRAM_ID : ', TOKEN_PROGRAM_ID.toBase58());

  // 签名并发送交易
  try {
    // 钱包签名交易
    const signedTransaction = await provider.wallet.signTransaction(transaction);

    signedTransaction.partialSign(userUSDCAccount);

    // const simulateResult = await provider.connection.simulateTransaction(transaction);
    // if (simulateResult.value.err) {
    //   console.error('模拟交易错误:', simulateResult.value.err);
    // } else {
    const signature = await provider.connection.sendRawTransaction(signedTransaction.serialize());
    await provider.connection.confirmTransaction(signature);
    // 添加新生成的USDC账户作为签名者
    // signedTransaction.partialSign(userUSDCAccount);
    // 发送并确认交易
    // const signature = await provider.sendAndConfirm(signedTransaction, [userUSDCAccount]);
    // const signature = await sendAndConfirmTransaction(provider.connection, signedTransaction, [
    //   userUSDCAccount,
    // ]);

    console.log(`Transaction confirmed with signature: ${signature}`);
    // }
  } catch (error) {
    console.error('Error during transaction', error);
    throw error;
  }

  return userUSDCAccount;
}
