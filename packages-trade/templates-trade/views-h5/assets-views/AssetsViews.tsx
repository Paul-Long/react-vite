import {useAssetsState} from '@/hooks/use-assets-state';
import {useContract} from '@/hooks/use-contract';
import {SearchInput, SearchWrap} from '@/styles/assets-views';
import {Info} from '@/views-h5/info/Info';
import {IMAGES} from '@rx/const/images';
import {Select} from '@rx/widgets';
import {StyledAssetItem, StyledAssetWrap} from './styles';

export function AssetsViews() {
  const {asset, setAsset, contract, setContract, maturity, setMaturity, contracts, maturities} =
    useContract();
  const {assets, setSearch} = useAssetsState();
  return (
    <div className="df fdc aic gap12px">
      <SearchWrap $show={true} className="pos-relative mt12px">
        <img src={IMAGES.search} alt="search" />
        <SearchInput
          className="w100%"
          placeholder="Search"
          onChange={(ev) => setSearch(ev.target.value)}
        />
      </SearchWrap>
      <StyledAssetWrap>
        {assets.map((a) => (
          <StyledAssetItem
            key={a.code}
            $selected={asset === a.code}
            className="fw700 df jcc aic"
            onClick={() => setAsset(a.code)}
          >
            {a.name}
          </StyledAssetItem>
        ))}
      </StyledAssetWrap>
      <div className="df fdr aic w100% gap14px">
        <Select
          className="flex-1 fwbold"
          options={contracts}
          value={contract as string}
          onChange={(v) => setContract(v)}
        />
        <Select
          className="flex-1 fwbold"
          options={maturities}
          value={maturity as string}
          onChange={(v) => setMaturity(v)}
        />
      </div>
      <Info />
    </div>
  );
}
