import type {RatexContracts} from '@/types/ratex_contracts.ts';
import type {TokenFaucet} from '@/types/token_faucet.ts';
import {BN, Program} from '@coral-xyz/anchor';
import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  TOKEN_PROGRAM_ID,
  getAssociatedTokenAddressSync,
} from '@solana/spl-token';
import {PublicKey, SystemProgram, TransactionInstruction} from '@solana/web3.js';
import {Big} from 'big.js';
import {AccountManager} from './account-manager.ts';
import {
  getFaucetConfigPda,
  getMarginMarketPda,
  getMarginMarketVaultPda,
  getMintAccountPda,
} from './utils.ts';

const MintAuthority = new PublicKey('9aTcv5rmbnYussBW61ok3caDyNZJCv2xpQF6t9b31wuj');

export class FundManager {
  constructor() {}
  async deposit(
    program: Program<RatexContracts>,
    authority: PublicKey,
    userPda: PublicKey,
    params: {
      marginIndex: number;
      amount: number;
    }
  ) {
    const {amount, marginIndex} = params;
    const mintAccount: PublicKey = getMintAccountPda(marginIndex);
    const marginMarketPda: PublicKey = getMarginMarketPda(marginIndex);
    const marginMarketVaultPda: PublicKey = getMarginMarketVaultPda(marginIndex);
    const userTokenAccount: PublicKey = getAssociatedTokenAddressSync(mintAccount, authority);
    const remainingAccounts = this.getRemainingAccounts(marginMarketPda);
    const baseAmount = new BN(Big(amount).times(1_000_000_000).round().toNumber());

    const ac = await program.provider.connection.getAccountInfo(marginMarketPda);
    const ai = await program.account.marginMarket.fetch(marginMarketPda);

    console.log('****************');
    console.log('Margin Market Pda owner : ', ac?.owner?.toBase58(), program.programId.toBase58());
    console.log('Margin Market mint : ', ai?.mint?.toBase58(), mintAccount.toBase58());
    console.log('Market Index : ', ai?.marketIndex, marginIndex);
    console.log('User Token Account : ', userTokenAccount.toBase58());
    console.log('User Pda : ', userPda.toBase58());
    console.log('Amount : ', amount);
    console.log('****************');

    return await program.methods
      .deposit(marginIndex, baseAmount)
      .accounts({
        user: userPda,
        authority,
        marginMarketVault: marginMarketVaultPda,
        userTokenAccount,
        tokenProgram: TOKEN_PROGRAM_ID,
      })
      .remainingAccounts(remainingAccounts)
      .rpc();
  }

  async depositTransaction(
    program: Program<RatexContracts>,
    authority: PublicKey,
    userPda: PublicKey,
    params: {
      marginIndex: number;
      amount?: number;
    }
  ): Promise<TransactionInstruction | null> {
    const {amount, marginIndex} = params;
    if (!amount) {
      return null;
    }
    const mintAccount: PublicKey = getMintAccountPda(marginIndex);
    const marginMarketPda: PublicKey = getMarginMarketPda(marginIndex);
    const marginMarketVaultPda: PublicKey = getMarginMarketVaultPda(marginIndex);
    const userTokenAccount: PublicKey = getAssociatedTokenAddressSync(mintAccount, authority);
    const remainingAccounts = this.getRemainingAccounts(marginMarketPda);
    const baseAmount = new BN(Big(amount).times(1_000_000_000).round().toNumber());

    // const ac = await program.provider.connection.getAccountInfo(marginMarketPda);
    // const ai = await program.account.marginMarket.fetch(marginMarketPda);

    // console.log('****************');
    // console.log('Margin Market Pda owner : ', ac?.owner?.toBase58(), program.programId.toBase58());
    // console.log('Margin Market mint : ', ai?.mint?.toBase58(), mintAccount.toBase58());
    // console.log('Market Index : ', ai?.marketIndex, marginIndex);
    // console.log('User Token Account : ', userTokenAccount.toBase58());
    // console.log('User Pda : ', userPda.toBase58());
    // console.log('Amount : ', amount);
    // console.log('****************');

    return await program.methods
      .deposit(marginIndex, baseAmount)
      .accounts({
        user: userPda,
        authority,
        marginMarketVault: marginMarketVaultPda,
        userTokenAccount,
        tokenProgram: TOKEN_PROGRAM_ID,
      })
      .remainingAccounts(remainingAccounts)
      .instruction();
  }

  async withdraw(
    program: Program<RatexContracts>,
    authority: PublicKey,
    am: AccountManager,
    userPda: PublicKey,
    params: {
      marginIndex: number;
      amount: number;
    }
  ) {
    const {amount, marginIndex} = params;

    const mintAccount: PublicKey = getMintAccountPda(marginIndex);
    const marginMarketPda: PublicKey = getMarginMarketPda(marginIndex);
    const marginMarketVaultPda: PublicKey = getMarginMarketVaultPda(marginIndex);
    const userTokenAccount: PublicKey = getAssociatedTokenAddressSync(mintAccount, authority);
    const remainingAccounts = this.getRemainingAccounts(marginMarketPda);
    const baseAmount = new BN(Big(amount).times(1_000_000_000).round().toNumber());

    const ac = await program.provider.connection.getAccountInfo(marginMarketPda);
    const ai = await program.account.marginMarket.fetch(marginMarketPda);

    console.log('****************');
    console.log('Margin Market Pda owner : ', ac?.owner?.toBase58(), program.programId.toBase58());
    console.log('Margin Market mint : ', ai?.mint?.toBase58(), mintAccount.toBase58());
    console.log('Market Index : ', ai?.marketIndex, marginIndex);
    console.log('User Token Account : ', userTokenAccount.toBase58());
    console.log('Amount : ', amount);
    console.log('****************');

    return await program.methods
      .withdraw(marginIndex, baseAmount)
      .accounts({
        state: am.statePda,
        user: userPda,
        authority,
        marginMarketVault: marginMarketVaultPda,
        driftSigner: am.signerPda,
        userTokenAccount,
        tokenProgram: TOKEN_PROGRAM_ID,
      })
      .remainingAccounts(remainingAccounts)
      .rpc();
  }

  async mintToUser(
    program: Program<TokenFaucet>,
    authority: PublicKey,
    params: {
      marginIndex: number;
      amount: number;
    }
  ) {
    const {amount, marginIndex} = params;

    const mintAccount: PublicKey = getMintAccountPda(marginIndex);
    const faucetConfig: PublicKey = getFaucetConfigPda(marginIndex);
    const userTokenAccount: PublicKey = getAssociatedTokenAddressSync(mintAccount, authority);
    const baseAmount = new BN(Big(amount).times(1_000_000_000).round().toNumber());

    const fc = await program.provider.connection.getAccountInfo(faucetConfig);
    const fi = await program.account.faucetConfig.fetch(faucetConfig);

    console.log('****************');
    console.log('Faucet Admin : ', fi.admin.toBase58(), fi.mintAuthority.toBase58());
    console.log('Faucet program : ', fc?.owner?.toBase58(), program.programId.toBase58());
    console.log('Faucet Config : ', faucetConfig.toBase58());
    console.log('Faucet Mint : ', fi?.mint?.toBase58(), mintAccount.toBase58());
    console.log('User Token Account : ', userTokenAccount.toBase58());
    console.log('Amount : ', amount);
    console.log('****************');

    return await program.methods
      .mintToUser(baseAmount)
      .accounts({
        user: authority,
        faucetConfig,
        mintAccount,
        userTokenAccount,
        mintAuthority: fi.mintAuthority,
        tokenProgram: TOKEN_PROGRAM_ID,
        associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
        systemProgram: SystemProgram.programId,
      })
      .signers([])
      .rpc({commitment: 'confirmed'});
  }

  async getAllBalance(program: Program<TokenFaucet>, authority: PublicKey) {
    return {
      1: await this.getBalance(program, authority, 1),
      3: await this.getBalance(program, authority, 3),
    };
  }

  async getBalance(program: Program<TokenFaucet>, authority: PublicKey, marginIndex: number) {
    const mintAccount: PublicKey = getMintAccountPda(marginIndex);
    const userTokenAccount: PublicKey = getAssociatedTokenAddressSync(mintAccount, authority);
    try {
      const res = await program.provider.connection.getTokenAccountBalance(userTokenAccount);
      const amountBn = res?.value?.amount ?? 0;
      return Big(amountBn).div(1_000_000_000).round(0).toFixed(4);
    } catch (e) {
      console.error(e);
      return 0;
    }
  }

  getRemainingAccounts(marginMarketPda: PublicKey) {
    return [
      {
        pubkey: marginMarketPda,
        isSigner: false,
        isWritable: true,
      },
    ];
  }
}
