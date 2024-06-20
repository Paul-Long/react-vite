'use client'
import {ConnectionContext} from './use-connection';
import {ReactNode, useMemo} from 'react';
import {Connection, ConnectionConfig} from '@solana/web3.js';

export function ConnectionProvider({children, endpoint, config = {commitment: 'confirmed'}}: {children: ReactNode, endpoint: string; config?: ConnectionConfig}) {
  const connection = useMemo(() => new Connection(endpoint, config), [endpoint])
  return (
    <ConnectionContext.Provider value={{connection}}>
      {children}
    </ConnectionContext.Provider>
  )
}
