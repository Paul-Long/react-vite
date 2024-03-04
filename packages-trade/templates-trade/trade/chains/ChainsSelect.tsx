import {IMAGES} from '@rx/const/images';
import React from 'react';
import {useChains} from './state';
import {Content, SearchInput, SearchWrap, StyledItem} from './styles';

export function ChainsSelect() {
  const {chains, chain, setChain, setSearch} = useChains();

  return (
    <div className="df fdc g18">
      <SearchWrap className="pos-relative">
        <img src={IMAGES.search} alt="search" />
        <SearchInput className="w100%" onChange={(ev) => setSearch(ev.target.value)} />
      </SearchWrap>
      <Content className="df fdc">
        {chains.map((c: any) => (
          <StyledItem
            key={c.code}
            className="item df fdr jcsb aic f16 fw3 cp"
            $selected={c.code === chain}
            onClick={() => setChain(c.code)}
          >
            <div className="df fdr aic g8">
              <img className="db logo" src={c.icon} alt={c.name} width={20} height={20} />
              <span className="fw700">{c.name}</span>
            </div>
            <img className="db right" src={IMAGES.down} alt={c.name} height={10} />
          </StyledItem>
        ))}
      </Content>
    </div>
  );
}
