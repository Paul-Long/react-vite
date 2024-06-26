import {useState} from 'react';
import {AssetsSelect} from './AssetsSelect';
import {Wrap} from './styles';

export function AssetView() {
  const [show, setShow] = useState<boolean>(true);
  return (
    <Wrap $show={show} className="df fdc jcsb">
      <AssetsSelect show={show} setShow={setShow} />
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
