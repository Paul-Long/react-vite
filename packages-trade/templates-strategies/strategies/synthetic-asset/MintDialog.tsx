import {db} from '@rx/db';
import {useLang} from '@rx/hooks/use-lang';
import {lang as clang} from '@rx/lang/common.lang';
import {lang} from '@rx/lang/strategy.lang';
import {Button, Modal, NumberInput, ProgressBar, Toast} from '@rx/widgets';
import Big from 'big.js';
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

  const handleConfirm = useCallback(async () => {
    const {...tmp} = data;
    tmp.Amount = amount;
    await db.strategySyntheticAsset.add(tmp);
    Toast.success('Mint Success');
    modalHook.onClose();
  }, [amount, data]);

  return (
    <Modal visible={visible} onClose={onClose} closeBtn={false}>
      <div className="df fdc w440px gap12px">
        <div className="df fdr aic jcsb fw700 ">
          <div className="T3 font-size-20px">{LG(lang.SyntheticAsset)}</div>
        </div>
        <StyledInputWrap className="df fdr aic jcsb box-border fw700 mt24px">
          <div className="T5">{LG(lang.UnderlyingAsset)}</div>
          <div className="df fdr gap8px">
            <span className="font-size-14px">{data?.UnderlyingAsset}</span>
            <i className="iconfont font-size-12px T3">&#xe624;</i>
          </div>
        </StyledInputWrap>

        <StyledInputWrap className="df fdr aic jcsb box-border fw700 ">
          <div className="T5">{LG(clang.MaturityDate)}</div>
          <div className="df fdr gap8px">
            <span className="font-size-14px">{data?.MaturityDate}</span>
          </div>
        </StyledInputWrap>

        <StyledInputWrap className="df fdr aic jcsb box-border fw700 pt0px pb0px">
          <div className="T5 text-nowrap">{LG(clang.No) + '. ' + LG(lang.SyntheticAsset)}</div>
          <div className="df fdr aic gap8px">
            <NumberInput
              className="T3"
              style={{padding: 0, fontWeight: 700}}
              value={amount}
              size="small"
              bordered={false}
              onChange={(v: any) => setAmount(v)}
            />
            <span className="font-size-14px">{data?.RWAToken}</span>
          </div>
        </StyledInputWrap>

        <div className="mt12px">
          <ProgressBar
            value={amount}
            max={100}
            min={0}
            dp={0}
            util={'%'}
            onChange={(v: any) => setAmount(v)}
          />
        </div>

        <StyledInputWrap className="df fdr aic jcsb box-border fw700 mt24px">
          <div className="T5">{LG(clang.Deposit)}</div>
          <div className="df fdr gap8px">
            <span className="font-size-14px T3">{100}</span>
            <span className="font-size-14px">{data?.UnderlyingAsset}</span>
          </div>
        </StyledInputWrap>

        <div className="df fdr aic jcsb T5">
          <span>{LG(lang.EstGas)}</span>
          <span>0.01 SOL</span>
        </div>

        <div className="df fdr aic gap14px mt32px">
          <Button className="flex-1 font-size-20px" type="warning" onClick={handleConfirm}>
            {LG(clang.Confirm)}
          </Button>
          <Button className="flex-1 font-size-20px" onClick={modalHook.onClose}>
            {LG(clang.Cancel)}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
