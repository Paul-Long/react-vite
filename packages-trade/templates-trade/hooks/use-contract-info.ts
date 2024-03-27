import {contract$, maturity$} from '@/streams/streams';
import {data} from '@/views/mock/header/header-json';
import {useStream} from '@rx/hooks/use-stream';
import {useEffect, useState} from 'react';

export function useContractInfo() {
  const [contract] = useStream(contract$);
  const [maturity] = useStream(maturity$);
  const [info, setInfo] = useState<Record<string, any>>({});

  useEffect(() => {
    if (contract && maturity) {
      setInfo(data[`${contract}-${maturity}`] ?? {});
    }
  }, [contract, maturity]);

  return {info};
}
