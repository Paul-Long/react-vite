import {IMAGES} from '@rx/const/images';
import React, {useCallback, useRef} from 'react';
import {useChains} from './state';
import {Content, SearchInput, SearchWrap, StyledItem} from './styles';

interface Props {
  show: boolean;
  setShow: Function;
}
export function ChainsSelect(props: Props) {
  const input = useRef<HTMLInputElement>(null);
  const {show, setShow} = props;
  const {chains, chain, setChain, setSearch} = useChains();

  const handleClick = useCallback(() => {
    if (!show) {
      setShow(true);
      setTimeout(() => {
        input.current?.focus();
      }, 10);
    }
  }, [show]);

  return (
    <div className="df fdc g18">
      <SearchWrap $show={show} className="pos-relative" onClick={handleClick}>
        <img src={IMAGES.search} alt="search" />
        {show && (
          <SearchInput
            ref={input}
            className="w100%"
            placeholder="Search"
            onChange={(ev) => setSearch(ev.target.value)}
          />
        )}
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
              {show && <span className="fw700">{c.name}</span>}
            </div>
            {show && <img className="db right" src={IMAGES.down} alt={c.name} height={10} />}
          </StyledItem>
        ))}
      </Content>
    </div>
  );
}
