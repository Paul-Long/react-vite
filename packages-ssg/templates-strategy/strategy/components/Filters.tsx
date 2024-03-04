import {useLang} from '@rx/hooks/use-lang';
import {lang as clang} from '@rx/lang/common.lang';
import {Checkbox} from '@rx/widgets';
import React, {useCallback, useState} from 'react';
import {styled} from 'styled-components';

const StyledFiltersLayout = styled.div`
  padding: 16px 24px 24px;
  border-bottom: 1px solid var(--deep-sea-blue);
`;

const StyledWrap = styled.div<{$grid: number}>`
  display: inline-grid;
  gap: 20px;
  grid-template-columns: repeat(${({$grid}) => $grid}, auto);
`;

export function Filters() {
  const {LG} = useLang();
  const [chain, setChain] = useState('ALL');
  const [token, setToken] = useState('ALL');

  const handleChainClick = useCallback((c: string) => {
    return (checked: boolean) => setChain(checked ? c : 'ALL');
  }, []);

  const handleTokenClick = useCallback((t: string) => {
    return (checked: boolean) => setToken(checked ? t : 'ALL');
  }, []);

  return (
    <StyledFiltersLayout className="w100% mt16px pb24px">
      <StyledWrap $grid={6}>
        <Checkbox checked={chain === 'ALL'} onChange={handleChainClick('ALL')}>
          {LG(clang.ALL)}
        </Checkbox>
        {Chains.map((c) => (
          <Checkbox key={c} checked={chain === c} onChange={handleChainClick(c)}>
            {c}
          </Checkbox>
        ))}
        {chain === 'ETH' && <div />}
        <div />
        <Checkbox checked={token === 'ALL'} onChange={handleTokenClick('ALL')}>
          {LG(clang.ALL)}
        </Checkbox>
        {Tokens[chain].map((t) => (
          <Checkbox key={t} checked={token === t} onChange={handleTokenClick(t)}>
            {t}
          </Checkbox>
        ))}
      </StyledWrap>
    </StyledFiltersLayout>
  );
}

const Chains: string[] = ['SOL', 'ETH', 'LRT', 'Stables', 'RWA'];

const Tokens: Record<string, string[]> = {
  ALL: [],
  SOL: ['SOLStaking', 'mSOL', 'jitoSOL'],
  ETH: ['ETHStaking', 'stETH', 'rETH'],
  LRT: ['eETH', 'pufETH'],
  Stables: ['USDY', 'aUSDC'],
  RWA: ['Uscpi'],
};
