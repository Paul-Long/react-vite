import {Assets, FiltersProps, MinMap, useFilters} from '@/assets-filter/state';
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
  const {asset, contracts, baseContracts, handleContractsChecked, handleAssetsChecked} =
    useFilters(props);

  return (
    <StyledFiltersLayout className="w100% mt16px pb24px df fdc gap20px">
      <div className="df fdr aic">
        <StyledWrap $grid={Assets.length + 1}>
          <div className="min-w73px" />
          {Assets.map((c) => (
            <Checkbox key={c} checked={asset === c} onChange={handleAssetsChecked(c)}>
              {c}
            </Checkbox>
          ))}
        </StyledWrap>
      </div>
      <div className="df fdr aic">
        <StyledWrap $grid={Assets.length + 1}>
          <Checkbox checked={contracts.includes('ALL')} onChange={handleContractsChecked('ALL')}>
            <div className="df fdr aic min-w50px">
              {LG(clang.ALL)}
              <StyledLine />
            </div>
          </Checkbox>
          {baseContracts.map((t: string, index: number) => {
            return [
              <Checkbox
                style={{minWidth: MinMap[t] ?? 'auto'}}
                key={t}
                checked={contracts.includes(t)}
                onChange={handleContractsChecked(t)}
              >
                {t}
              </Checkbox>,
            ];
          })}
        </StyledWrap>
      </div>
    </StyledFiltersLayout>
  );
}
