import {db} from '@rx/db';
import {timeUtil} from '@rx/helper/time';
import {useLang} from '@rx/hooks/use-lang';
import {lang} from '@rx/lang/strategy.lang';
import {Button, Toast} from '@rx/widgets';
import React, {useCallback, useEffect, useState} from 'react';
import {styled} from 'styled-components';
import {Card} from '../components/Card';

const StyledSelectedWrap = styled.div`
  padding: 20px 12px;
  background: var(--night-sky-blue);
  border: 1px solid var(--dark-gray);
  border-radius: 2px;
`;

export function CardItem({item}: any) {
  const {LG} = useLang();
  const [selected, setSelected] = useState(item?.matureDate?.[0]);

  useEffect(() => {
    setSelected(item?.matureDate?.[0]);
  }, [item]);

  const handleMint = useCallback(async () => {
    const {...data} = item;
    await db.strategySyntheticAsset.add(data);
    Toast.success('Mint Success');
  }, [item]);

  return (
    <Card>
      <div className="df fdc">
        <div className="df fdr aife jcsb fw700">
          <div className="font-size-20px T3">{LG(lang.SyntheticAsset)}</div>
        </div>
        <StyledSelectedWrap className="df fdr aic jcsb mt20px">
          <div className="T5 font-size-14px">{LG(lang.UnderlyingAsset)}</div>
          <div className="">{item.UnderlyingAsset}</div>
        </StyledSelectedWrap>

        <StyledSelectedWrap className="df fdr aic jcsb mt12px">
          <div className="T5 font-size-14px">{LG(lang.MatureDate)}</div>
          <div className="">{timeUtil.formatDate(new Date(item.MaturityDate).getTime())}</div>
        </StyledSelectedWrap>

        <Button className="mt24px" onClick={handleMint}>
          {LG(lang.Mint)} {item.RWAToken}
        </Button>
      </div>
    </Card>
  );
}
