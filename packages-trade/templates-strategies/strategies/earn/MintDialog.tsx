import {useLang} from '@rx/hooks/use-lang';
import {lang} from '@rx/lang/strategy.lang';
import {Modal} from '@rx/widgets';
import React from 'react';

interface Props {
  modalHook: ModalHook<any>;
}

export function MintDialog({modalHook}: Props) {
  const {LG} = useLang();
  const {visible, onClose, data} = modalHook;
  console.log(visible, data);
  return (
    <Modal visible={visible} onClose={onClose} closeBtn={false}>
      <div className="df fdc">
        <div className="df fdr aic jcsb fw700">
          <div className="T3 font-size-20px">{data?.token}</div>
          <div className="df fdr aic">
            <div className="font-size-20px">{LG(lang.APR)}</div>
            <div className="T6 font-size-38px">{data?.apr}</div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
