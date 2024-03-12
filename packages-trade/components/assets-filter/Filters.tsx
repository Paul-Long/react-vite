import {useLang} from '@rx/hooks/use-lang';
import {lang as clang} from '@rx/lang/common.lang';
import {Checkbox} from '@rx/widgets';
import React, {useCallback, useEffect, useState} from 'react';
import {styled} from 'styled-components';

interface FiltersProps {
  onChange?: Function;
}

const StyledFiltersLayout = styled.div`
  padding: 16px 24px 24px;
  border-bottom: 1px solid var(--deep-sea-blue);
`;

const StyledWrap = styled.div<{$grid: number}>`
  display: inline-grid;
  gap: 20px;
  grid-template-columns: repeat(${({$grid}) => $grid}, auto);
`;

export function Filters(props: FiltersProps) {
  const {LG} = useLang();
  const [chain, setChain] = useState<string>('ALL');
  const [token, setToken] = useState<string[]>(['ALL']);

  useEffect(() => {
    props?.onChange?.({chain, token});
  }, [chain, token]);

  const handleChainClick = useCallback((c: string) => {
    return (checked: boolean) => setChain(checked ? c : 'ALL');
  }, []);

  const handleTokenClick = useCallback((t: string, chain: string) => {
    return (checked: boolean) => {
      setToken((prevState) => {
        let ts: string[] = [...prevState].filter((o) => o !== 'ALL' && o !== t);
        if (checked) {
          ts = t === 'ALL' ? ['ALL', ...Tokens[chain]] : [...ts, t];
          if (!Tokens[chain].some((t) => !ts.includes(t))) {
            return ['ALL', ...Tokens[chain]];
          }
        }
        return ts.length === 0 ? ['ALL', ...Tokens[chain]] : ts;
      });
    };
  }, []);

  return (
    <StyledFiltersLayout className="w100% mt16px pb24px">
      <StyledWrap $grid={chain === 'ETH' ? 7 : 6}>
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
        <Checkbox checked={token.includes('ALL')} onChange={handleTokenClick('ALL', chain)}>
          {LG(clang.ALL)}
        </Checkbox>
        {Tokens[chain].map((t: any) => (
          <Checkbox key={t} checked={token.includes(t)} onChange={handleTokenClick(t, chain)}>
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
  SOL: ['SOLStaking', 'mSOL', 'JitoSOL'],
  ETH: ['ETHStaking', 'stETH', 'rETH'],
  LRT: ['eETH', 'pufETH'],
  Stables: ['USDY', 'aUSDC'],
  RWA: ['Uscpi'],
};
