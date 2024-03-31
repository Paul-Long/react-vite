import type {RatexContracts} from '@/idl/ratex_contracts';
import {DRIFT_PROGRAM_ID, OrderType, PositionDirection, ProgramAccountType} from '@/sdk/const';
import {getMarginVaultPublicKey, getUserAccountPublicKey} from '@/sdk/utils';
import type {DriftClientConfig} from '@/types/drift-client';
import * as anchor from '@coral-xyz/anchor';
import {AnchorProvider, BN, Program, Wallet, web3} from '@coral-xyz/anchor';
import {ConfirmOptions, Connection, PublicKey} from '@solana/web3.js';
import {Buffer} from 'buffer';
import * as idl from '../idl/ratex_contracts.json';

export class DriftClient {
  connection: Connection;
  provider: AnchorProvider;
  wallet: Wallet;
  authority?: PublicKey;
  opts?: ConfirmOptions;
  public program: Program<RatexContracts>;

  constructor(config: DriftClientConfig) {
    this.connection = config.connection;
    this.wallet = config.wallet;
    this.opts = config.opts || AnchorProvider.defaultOptions();
    this.authority = config.authority ?? this.wallet?.publicKey;
    this.provider = new AnchorProvider(config.connection, config.wallet, this.opts);
    this.program = new Program(
      <RatexContracts>idl,
      config.programID ?? new PublicKey(DRIFT_PROGRAM_ID),
      this.provider
    );
    console.log('Create DriftClient : ', this);
  }

  updateWallet(newWallet: Wallet) {
    const newProvider = new AnchorProvider(this.connection, newWallet, this.opts as ConfirmOptions);
    const newProgram = new Program(<RatexContracts>idl, this.program.programId, newProvider);

    this.wallet = newWallet;
    this.provider = newProvider;
    this.program = newProgram;
    this.authority = this.wallet?.publicKey;
    console.log('Update DriftClient Wallet : ', this);
  }

  async createProgramUser(type: ProgramAccountType, subAccountId: number = 0) {
    if (!this.authority) {
      return false;
    }
    const balance = await this.getUserBalance();
    if (balance <= 0) {
      return false;
    }
    const userAccountPublicKey = await this.genUserAccountPublicKey(type, subAccountId);
    if (!userAccountPublicKey) {
      return false;
    }
    const accountInfo = await this.getAccountInfo(userAccountPublicKey);
    if (accountInfo) {
      return accountInfo;
    }

    console.log('initialize user params: ', {
      user: userAccountPublicKey.toBase58(),
      authority: this.authority.toBase58(),
      payer: this.authority.toBase58(),
      systemProgram: web3.SystemProgram.programId.toBase58(),
      rent: web3.SYSVAR_RENT_PUBKEY.toBase58(),
    });

    const subAccountID = 0;
    const accounts = {
      user: userAccountPublicKey,
      authority: this.authority,
      payer: this.authority,
      systemProgram: web3.SystemProgram.programId,
      rent: web3.SYSVAR_RENT_PUBKEY,
    };

    const tx = await this.program?.rpc?.initializeUser(subAccountID, {accounts});
    console.log('Initialize User Tx : ', tx);
    return tx;
  }

  async placePerpOrder() {
    if (!this.authority) {
      return false;
    }
    const accountInfo = await this.createProgramUser(ProgramAccountType.User);
    if (!accountInfo) {
      return false;
    }

    const userAccountPublicKey = await this.getProgramUserAccountPublicKey();
    if (!userAccountPublicKey) {
      return false;
    }
    const orderParams = {
      orderType: OrderType.MARKET,
      direction: PositionDirection.LONG,
      baseAssetAmount: new BN(1000),
      priceLimit: new BN(1000),
      marketIndex: 1,
    };
    console.log('placePerpOrder Params : ', orderParams);

    const tx = await this.program?.rpc?.placePerpOrder(1, orderParams, {
      accounts: {
        user: userAccountPublicKey,
        authority: this.authority,
      },
    });

    console.log('PlacePerpOrder Tx : ', tx);
    return tx;
  }

  async fillPerpOrder(params: {tradePrice: number}) {
    if (!this.authority) {
      return false;
    }
    const accountInfo = await this.createProgramUser(ProgramAccountType.User);
    if (!accountInfo) {
      return false;
    }

    const userAccountPublicKey = await this.getProgramUserAccountPublicKey();
    if (!userAccountPublicKey) {
      return false;
    }
    const amount = new BN(100);
    const tradePrice = new BN(params.tradePrice);
    const fee = new BN(0.0005);

    const tx = await this.program?.rpc?.fillPerpOrder(
      1,
      amount,
      amount,
      amount,
      amount,
      tradePrice,
      fee,
      {
        accounts: {
          user: userAccountPublicKey,
          authority: this.authority,
        },
      }
    );

    console.log('FillPerpOrder Tx : ', tx);
    return tx;
  }

  async deposit() {
    if (!this.authority) {
      return false;
    }
    const accountInfo = await this.createProgramUser(ProgramAccountType.SpotMarketVault);
    if (!accountInfo) {
      return false;
    }

    const userAccountPublicKey = await this.getProgramUserAccountPublicKey();
    if (!userAccountPublicKey) {
      return false;
    }

    const marginIndex = 0;
    const amount = new anchor.BN(10000);
    const reduceOnly = false;
    const depositRecordId = new anchor.BN(1);
    const marginVault: any = await getMarginVaultPublicKey(
      this.program.programId,
      this.authority,
      0
    );

    console.log('Deposit Params : ', {
      user: userAccountPublicKey.toBase58(),
      authority: this.authority.toBase58(),
      programId: this.program.programId.toBase58(),
    });

    const tx = await this.program?.rpc.deposit(marginIndex, amount, reduceOnly, depositRecordId, {
      accounts: {
        user: userAccountPublicKey,
        authority: this.authority,
        marginVault,
        userTokenAccount: this.authority,
        tokenProgram: this.program?.programId,
      },
      signers: [],
    });

    console.log('Deposit : ', tx);

    return tx;
  }

  async withdraw() {
    if (!this.authority) {
      return false;
    }
    const accountInfo = await this.createProgramUser(ProgramAccountType.SpotMarketVault);
    if (!accountInfo) {
      return false;
    }

    const userAccountPublicKey = await this.getProgramUserAccountPublicKey();
    if (!userAccountPublicKey) {
      return false;
    }

    const marginIndex = 0;
    const amount = new anchor.BN(10000);
    const reduceOnly = false;
    const depositRecordId = new anchor.BN(1);
    const marginVault: any = await getMarginVaultPublicKey(
      this.program.programId,
      this.authority,
      0
    );

    const tx = await this.program?.rpc.withdraw(marginIndex, amount, reduceOnly, depositRecordId, {
      accounts: {
        user: userAccountPublicKey,
        authority: this.authority,
        marginVault,
        userTokenAccount: this.authority,
        tokenProgram: this.program?.programId,
      },
      signers: [],
    });

    console.log('Withdraw : ', tx);

    return tx;
  }

  async getAccountInfo(account: PublicKey) {
    try {
      return await this.connection.getAccountInfo(account);
    } catch (e) {
      return null;
    }
  }

  async getProgramUserAccountPublicKey() {
    try {
      return getUserAccountPublicKey(this.program.programId, this.authority as PublicKey);
    } catch (e) {
      return null;
    }
  }

  async getUserBalance() {
    try {
      if (!this.authority) {
        return 0;
      }
      return await this.connection.getBalance(this.authority);
    } catch (e) {
      return 0;
    }
  }

  async genUserAccountPublicKey(type: ProgramAccountType, subAccountId: number) {
    if (!this.authority) {
      return null;
    }
    const seeds = [Buffer.from(anchor.utils.bytes.utf8.encode(type))];
    if (type === ProgramAccountType.User) {
      seeds.push(this.authority.toBuffer());
    }
    seeds.push(new anchor.BN(subAccountId).toArrayLike(Buffer, 'le', 2));
    return (await PublicKey.findProgramAddress(seeds, this.program.programId))[0];
  }
}
