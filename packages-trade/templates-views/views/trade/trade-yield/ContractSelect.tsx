import {asset$, contract$} from '@/streams/trade/page-state';
import {IMAGES} from '@/views/const';
import {useObservable} from '@rx/hooks/use-observable';
import {useStream} from '@rx/hooks/use-stream';
import {contractMap$} from '@rx/streams/config';
import {Select} from '@rx/widgets/select';
import {useEffect, useMemo} from 'react';

export function ContractSelect() {
  const [asset] = useStream(asset$);
  const [contract, setContract] = useStream(contract$);
  const contractMap = useObservable(contractMap$, {});

  const contracts = useMemo(() => {
    return contractMap?.[asset] ?? [];
  }, [asset, contractMap]);

  useEffect(() => {
    const con = contracts?.find((con) => con.symbolCategory === contract);
    if (!con && contracts?.[0]) {
      setContract(contracts[0].symbolCategory);
    }
  }, [contracts, contract]);

  return (
    <Select
      value={contract}
      className="min-w-134px"
      placement="bottomLeft"
      background={true}
      onChange={(v) => setContract(v)}
      options={contracts.map((con) => ({
        label: (
          <div className="flex flex-row items-center gap-8px text-nowrap">
            <img
              src={IMAGES[con.symbolCategory?.toUpperCase()]}
              width={24}
              height={24}
              alt={con.symbolCategory}
            />
            <div className="text-nowrap">{con.symbolCategory}</div>
          </div>
        ),
        value: con.symbolCategory,
      }))}
    />
  );
}
