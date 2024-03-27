import {orderPlaceVisible$} from '@/streams/streams-h5';
import {StyledBackWrap} from '@/views-h5/order-place/styles';
import {useLang} from '@rx/hooks/use-lang';
import {lang} from '@rx/lang/common.lang';

export function Back() {
  const {LG} = useLang();
  return (
    <StyledBackWrap className="fdr aic gap10px cp" onClick={() => orderPlaceVisible$.next(false)}>
      <i className="iconfont">&#xe63c;</i>
      <span>{LG(lang.Back)}</span>
    </StyledBackWrap>
  );
}
