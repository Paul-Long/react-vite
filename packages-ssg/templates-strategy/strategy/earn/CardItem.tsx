import {useLang} from '@rx/hooks/use-lang';
import {lang} from '@rx/lang/strategy.lang';
import {Button, Select} from '@rx/widgets';
import React, {useEffect, useState} from 'react';
import {styled} from 'styled-components';
import {Card} from '../components/Card';

const StyledSelectedWrap = styled.div`
  padding: 0 12px;
  background: var(--night-sky-blue);
  border: 1px solid var(--dark-gray);
`;

export function CardItem({item}: any) {
  const {LG} = useLang();
  const [selected, setSelected] = useState(item?.matureDate?.[0]);

  useEffect(() => {
    setSelected(item?.matureDate?.[0]);
  }, [item]);

  return (
    <Card>
      <div className="df fdc">
        <div className="df fdr aife jcsb fw700">
          <div className="font-size-20px T3">{item.token}</div>
          <div className="df fdr aife gap16px">
            <span className="font-size-20px">{LG(lang.APR)}</span>
            <span className="font-size-40px T6" style={{marginBottom: -8}}>
              {item.apr}
            </span>
          </div>
        </div>
        <StyledSelectedWrap className="df fdr aic jcsb mt46px">
          <div className="T5 font-size-14px">{LG(lang.MatureDate)}</div>
          <div className="flex-1">
            <Select
              align="right"
              options={item.matureDate?.map((m: string) => ({label: m, value: m}))}
              showBackground={false}
              value={selected}
              onChange={(v) => setSelected(v)}
            />
          </div>
        </StyledSelectedWrap>

        <Button className="mt16px">{LG(lang.Mint)}</Button>
      </div>
    </Card>
  );
}