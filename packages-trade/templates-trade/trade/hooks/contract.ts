import {chain$, contract$, maturity$} from '@/trade/streams/streams';
import {useEffect, useState} from 'react';

export function useContract() {
  const [chain, setChain] = useState('SOL');
  const [contract, setContract] = useState<string | null>();
  const [maturity, setMaturity] = useState<string | null>();

  useEffect(() => {
    const subscription = chain$.subscribe((c) => setChain(c));
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const subscription = contract$.subscribe((c) => setContract(c));
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const subscription = maturity$.subscribe((c) => setMaturity(c));
    return () => subscription.unsubscribe();
  }, []);

  return {
    chain,
    contract,
    maturity,
    setChain: (c: string) => chain$.next(c),
    setContract: (c: string) => contract$.next(c),
    setMaturity: (m: string) => maturity$.next(m),
  };
}
