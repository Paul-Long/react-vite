import {db} from '@rx/db';
import {useLang} from '@rx/hooks/use-lang';
import {lang as clang} from '@rx/lang/common.lang';
import {lang} from '@rx/lang/strategy.lang';
import {Button, Checkbox, Modal, NumberInput, Toast} from '@rx/widgets';
import {Big} from 'big.js';
import {useCallback, useState} from 'react';
import {styled} from 'styled-components';

interface Props {
  modalHook: ModalHook<any>;
}

const StyledInputWrap = styled.div`
  background: var(--night-sky-blue);
  border-radius: 2px;
  padding: 20px 12px;
`;

export function MintDialog({modalHook}: Props) {
  const {LG} = useLang();
  const {visible, onClose, data} = modalHook;
  const [amount, setAmount] = useState(Big(data?.Amount ?? 10).toNumber());
  const [follow, setFollow] = useState(true);
  const [hide, setHide] = useState(false);

  const handleConfirm = useCallback(async () => {
    const {...tmp} = data;
    tmp.Amount = amount;
    await db.strategyCarryTrade.add(tmp);
    Toast.success('Mint Success');
    modalHook.onClose();
  }, [amount, data]);

  return (
    <Modal visible={visible} onClose={onClose} closeBtn={false} maskCloseAble={true}>
      <div className="df fdc w440px gap20px">
        <div className="df fdr aic jcsb fw700 ">
          <div className="T3 font-size-20px">{data?.Underlying}</div>
          <div className="df fdr aife gap16px">
            <div className="font-size-20px">{LG(lang.APR)}</div>
            <div className="T6 font-size-38px" style={{marginBottom: -2}}>
              {data?.APR}
            </div>
          </div>
        </div>
        <div className="df fdr aic jcsb gap20px">
          <StyledInputWrap className="df fdc aic box-border fw700 mt24px flex-1 gap8px">
            <div className="df fdr aic jcsb w100% T5">
              <span>{LG(clang.Long)}</span>
              <span>
                {data?.LongContract}
                <i className="iconfont font-size-12px T3">&#xe624;</i>
              </span>
            </div>
            <div className="df fdr aife jcsb w100%">
              <span className="T3 font-size-22px">{data?.LongRate}</span>
              <span className="T5">{data?.LongTTM}</span>
            </div>
          </StyledInputWrap>
          <StyledInputWrap className="df fdc aic box-border fw700 mt24px flex-1 gap8px">
            <div className="df fdr aic jcsb w100% T5">
              <span>{LG(clang.Short)}</span>
              <span>
                {data?.ShortContract}
                <i className="iconfont font-size-12px T3">&#xe624;</i>
              </span>
            </div>
            <div className="df fdr aife jcsb w100%">
              <span className="T3 font-size-22px">{data?.ShortRate}</span>
              <span className="T5">{data?.ShortTTM}</span>
            </div>
          </StyledInputWrap>
        </div>

        <StyledInputWrap className="df fdr aic jcsb box-border fw700 pt0px pb0px">
          <div className="T5">{LG(clang.NotionalAmount)}</div>
          <div className="df fdr aic gap8px">
            <NumberInput
              className="T3"
              style={{padding: 0, fontWeight: 700}}
              value={amount}
              size="small"
              bordered={false}
              onChange={(v: any) => setAmount(v)}
            />
            <span className="font-size-14px">{data?.Underlying}</span>
          </div>
        </StyledInputWrap>

        <div className="df fdr aic jcsb T5">
          <span>{LG(lang.MarginRate)}</span>
          <span>0.01 SOL</span>
        </div>
        <div className="df fdr aic jcsb T5">
          <span>{LG(lang.MarginRequired)}</span>
          <span>1 SOL</span>
        </div>
        <div className="df fdr aic jcsb T5">
          <span>{LG(lang.EstimatedGasFee)}</span>
          <span>1 SOL</span>
        </div>

        <div className="df fdr aic gap14px mt16px">
          <Button className="flex-1 font-size-20px" onClick={handleConfirm}>
            {LG(clang.Deposit)}
          </Button>
        </div>

        <div className="df fdr aic jcsb mt16px">
          <Checkbox checked={follow} onChange={(c) => setFollow(c)}>
            {LG(lang.Followable)}
          </Checkbox>
          <Checkbox checked={hide} onChange={(c) => setHide(c)}>
            {LG(lang.HideYourStrategy)}
          </Checkbox>
        </div>
        <div className="df fdr aic jcsb T5">
          <span>{LG(lang.FollowFeeOfTheNotional)}</span>
          <span>1%</span>
        </div>
      </div>
    </Modal>
  );
}
