import {useProvider} from '@/hooks/use-provider';
import type {Idl} from '@coral-xyz/anchor';
import {Program} from '@coral-xyz/anchor';
import {PublicKey} from '@solana/web3.js';
import {useMemo} from 'react';
import * as idl from '../idl/idl.json';

export const programID = new PublicKey('');

const [configPda] = PublicKey.findProgramAddressSync([Buffer.from('config')], programID);

export function useProgram() {
  const {provider} = useProvider();

  const program = useMemo(() => {
    if (!provider) {
      return null;
    }
    return new Program(<Idl>idl, programID, provider);
  }, [provider]);

  return {program, programID, configPda};
}
