import '@rx/helper/polyfill/EventTarget';
import '@rx/helper/polyfill/array';
import '@rx/helper/polyfill/map';
import {WSApi} from '@rx/ws';
import {WSEnum} from '@rx/ws/utils/ws-const';
import {filter} from 'rxjs/operators';
import {uiMsg$} from './ui';

const {loginType, dataType} = WSEnum;

uiMsg$.pipe(filter((o) => o.type === 'foundation-data')).subscribe(({url}) => {
  const ws = WSApi(url);

  ws.newAPI({
    loginType: loginType.login,
    dataType: dataType.t_gzip,
  });

  ws.login({isEncrypt: 'N', userName: '07', pwd: '000000'}, function (e) {
    console.log(e.dataObject?.body);
  });

  ws.subscribe(
    {
      name: 'APSSvr',
      topic: 'dc.aps.ticker.msol',
    },
    function (event, thisWebSocket) {
      console.log(event.dataObject?.body);
    }
  );

  ws.subscribe(
    {
      name: 'APSSvr',
      topic: 'dc.aps.marketprice.msol',
    },
    function (event, thisWebSocket) {
      console.log(event.dataObject?.body);
    }
  );

  ws.subscribe(
    {
      name: 'gateway',
      topic: 'dc.md.kline.1M.msolI',
    },
    function (event, thisWebSocket) {
      console.log(event.dataObject?.body);
    }
  );
});
