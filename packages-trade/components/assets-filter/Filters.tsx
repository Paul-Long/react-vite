import type {FiltersProps} from '@/assets-filter/state';
import {Assets, useFilters} from '@/assets-filter/state';
import {useLang} from '@rx/hooks/use-lang';
import {lang as clang} from '@rx/lang/common.lang';
import {Checkbox} from '@rx/widgets';
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

const StyledLine = styled.div`
  width: 1px;
  height: 14px;
  margin-left: 24px;
  border-right: 1px solid var(--deep-sea-blue);
`;

export function Filters(props: FiltersProps) {
  const {LG} = useLang();
  const {assets, contracts, baseContracts, handleContractsChecked, handleAssetsChecked} =
    useFilters(props);

  return (
    <StyledFiltersLayout className="w100% mt16px pb24px">
      <StyledWrap $grid={8}>
        <Checkbox checked={assets.includes('ALL')} onChange={handleAssetsChecked('ALL')}>
          <div className="df fdr aic">
            {LG(clang.ALL)}
            <StyledLine />
          </div>
        </Checkbox>
        {Assets.map((c) => (
          <Checkbox
            key={c}
            checked={assets.includes(c) || assets.includes('ALL')}
            onChange={handleAssetsChecked(c)}
          >
            {c}
          </Checkbox>
        ))}
        <div />
        <div />
        <div />
        <Checkbox checked={contracts.includes('ALL')} onChange={handleContractsChecked('ALL')}>
          <div className="df fdr aic">
            {LG(clang.ALL)}
            <StyledLine />
          </div>
        </Checkbox>
        {baseContracts.map((t: string, index: number) => {
          const nodes = [
            <Checkbox
              key={t}
              checked={contracts.includes(t) || contracts.includes('ALL')}
              onChange={handleContractsChecked(t)}
            >
              {t}
            </Checkbox>,
          ];
          if (index === 5) {
            nodes.push(<div key={index + 1} />);
            nodes.push(<div key={index + 2} />);
          }
          return nodes;
        })}
      </StyledWrap>
    </StyledFiltersLayout>
  );
}
