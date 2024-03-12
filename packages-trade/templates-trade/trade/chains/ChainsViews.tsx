import React, {useState} from 'react';
import {ChainsSelect} from './ChainsSelect';
import {Wrap} from './styles';

export function ChainsView() {
  const [show, setShow] = useState<boolean>(true);
  return (
    <Wrap $show={show} className="df fdc jcsb">
      <ChainsSelect show={show} setShow={setShow} />
      <div className="df fdr w100% jcfe p8px">
        <div className="df jcc aic w28px h28px cp" onClick={() => setShow(!show)}>
          {show ? (
            <i className="iconfont font-size-20px T7">&#xe601;</i>
          ) : (
            <i className="iconfont font-size-20px T7">&#xe603;</i>
          )}
        </div>
      </div>
    </Wrap>
  );
}
