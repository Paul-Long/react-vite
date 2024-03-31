import {WalletAdapterNetwork} from '@solana/wallet-adapter-base';
import {clusterApiUrl} from '@solana/web3.js';

const network = WalletAdapterNetwork.Devnet;

const endpoint = clusterApiUrl(network);

function createConnection() {}
