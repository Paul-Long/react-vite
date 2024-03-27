import {initializeUser} from '@/sdk/account/initialize-user';
import {placeOrder} from '@/sdk/trade/order';
import {useConnection, useWallet} from '@solana/wallet-adapter-react';
import {useCallback} from 'react';
import {useProgram} from './use-program';

export function useOrderPlace() {
  const {publicKey} = useWallet();
  const {connection} = useConnection();
  const {program, programID} = useProgram();

  const submit = useCallback(async () => {
    console.log(connection, program, publicKey);
    const user = await initializeUser(connection, program, publicKey);
    if (!user) {
      return;
    }
    return await placeOrder(program, publicKey);
  }, [publicKey, program, connection]);

  return {
    connection,
    publicKey,
    program,
    submit,
  };
}
