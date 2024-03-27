import {useAssetsState} from '@/hooks/use-assets-state';
import {useContract} from '@/hooks/use-contract';
import {SearchInput, SearchWrap} from '@/styles/assets-views';
import {IMAGES} from '@rx/const/images';
import {useCallback, useRef} from 'react';
import {Content, StyledItem} from './styles';

interface Props {
  show: boolean;
  setShow: Function;
}
export function AssetsSelect(props: Props) {
  const input = useRef<HTMLInputElement>(null);
  const {show, setShow} = props;
  const {asset, setAsset} = useContract();
  const {assets, setSearch} = useAssetsState();

  const handleClick = useCallback(() => {
    if (!show) {
      setShow(true);
      setTimeout(() => {
        input.current?.focus();
      }, 10);
    }
  }, [show]);

  return (
    <div className="df fdc g24">
      <SearchWrap $show={show} className="pos-relative mt24px" onClick={handleClick}>
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
        {assets.map((c: any) => (
          <StyledItem
            key={c.code}
            className="item df fdr jcsb aic f16 fw3 cp"
            $selected={c.code === asset}
            onClick={() => setAsset(c.code)}
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
