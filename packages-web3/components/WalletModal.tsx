import {Modal} from '@rx/widgets';
import React, {useState} from 'react';

export function WalletModal() {
  const [visible, setVisible] = useState(false);
  return (
    <Modal onClose={() => setVisible(false)} visible={visible}>
      <div>Phantom</div>
      <div>OKX</div>
    </Modal>
  );
}
