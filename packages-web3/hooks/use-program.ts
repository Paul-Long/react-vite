import {useProvider} from '@/hooks/use-provider';
import type {RatexContracts} from '@/idl/ratex_contracts';
import {Program} from '@coral-xyz/anchor';
import {PublicKey} from '@solana/web3.js';
import {Buffer} from 'buffer';
import {useEffect, useMemo} from 'react';
import * as idl from '../idl/ratex_contracts.json';

export const programID = new PublicKey('8TKWgQoBphGT5bRRnyTpNUzKhUTCRf1tKN8wcfdbAMfA');

export function useProgram() {
  const {provider} = useProvider();

  useEffect(() => {
    window.Buffer = Buffer;
  }, []);

  const program = useMemo(() => {
    if (!provider) {
      return null;
    }
    return new Program(<RatexContracts>idl, programID, provider);
  }, [provider]);

  return {program, programID};
}
