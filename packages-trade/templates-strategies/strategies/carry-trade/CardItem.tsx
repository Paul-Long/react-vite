import {db} from '@rx/db';
import {useLang} from '@rx/hooks/use-lang';
import {lang as clang} from '@rx/lang/common.lang';
import {lang} from '@rx/lang/strategy.lang';
import {Button, Toast} from '@rx/widgets';
import React, {useCallback, useEffect, useState} from 'react';
import {styled} from 'styled-components';
import {Card} from '../components/Card';

const StyledSelectedWrap = styled.div`
  padding: 12px 12px;
  background: var(--night-sky-blue);
  border: 1px solid var(--dark-gray);
  border-radius: 6px;
`;

export function CardItem({item}: any) {
  const {LG} = useLang();
  const [selected, setSelected] = useState(item?.matureDate?.[0]);

  useEffect(() => {
    setSelected(item?.matureDate?.[0]);
  }, [item]);

  const handleMint = useCallback(async () => {
    const {...data} = item;
    await db.strategyCarryTrade.add(data);
    Toast.success('Mint Success');
  }, [item]);

  return (
    <Card>
      <div className="df fdc">
        <div className="df fdr aife jcsb fw700">
          <div className="font-size-20px T3">{item.Underlying}</div>
          <div className="df fdr aife gap16px">
            <span className="font-size-20px">{LG(lang.APR)}</span>
            <span className="font-size-40px T6" style={{marginBottom: -8}}>
              {item.APR}
            </span>
          </div>
        </div>
        <div className="df fdr aic gap24px mt48px fw700">
          <StyledSelectedWrap className="df fdc aic jcsb flex-1 gap12px">
            <div className="df fdr aic jcsb w100%">
              <div className="T5">
                {LG(clang.Long)} <i className="iconfont font-size-12px T3">&#xe647;</i>
              </div>
              <div className="T5">{item.LongContract}</div>
            </div>
            <div className="df fdr aic jcsb w100%">
              <div className="T3">{item.LongRate}</div>
              <div className="T7">{item.LongTTM}</div>
            </div>
          </StyledSelectedWrap>
          <StyledSelectedWrap className="df fdc aic jcsb flex-1 gap12px">
            <div className="df fdr aic jcsb w100%">
              <div className="T5">{LG(clang.Short)}</div>
              <div className="T5">{item.ShortContract}</div>
            </div>
            <div className="df fdr aic jcsb w100%">
              <div className="T3">{item.ShortRate}</div>
              <div className="T7">{item.ShortTTM}</div>
            </div>
          </StyledSelectedWrap>
        </div>

        <Button className="mt24px" onClick={handleMint}>
          {LG(lang.Follow)}
        </Button>
      </div>
    </Card>
  );
}
