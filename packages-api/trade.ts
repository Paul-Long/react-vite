import {API_URL} from '@rx/const/urls';
import {guid} from '@rx/helper/guid';
import {post} from '@rx/helper/http';

export const tradeApi = {
  lastTradeSnapshot() {
    const params = {
      serverName: 'MDSvr',
      method: 'queryTrade',
      content: {
        cid: guid.build(),
      },
    };
    return post(API_URL, {params});
  },
  loadOrderHistory({address}: {address: string}) {
    const params = {
      serverName: 'AdminSvr',
      method: 'queryExecOrder',
      content: {
        cid: guid.build(),
        pageNum: 0,
        pageSize: 200,
        user_id: address,
      },
    };
    return post(API_URL, {params});
  },
  processSignature(signature: string) {
    const params = {
      serverName: 'TradeSvr',
      method: 'processSignature',
      content: {
        cid: guid.build(),
        signature,
      },
    };
    return post(API_URL, {params});
  },
  loadRecentTrades(symbol: string) {
    const params = {
      serverName: 'MDSvr',
      method: 'queryMarketTrade',
      content: {
        cid: guid.build(),
        securityID: symbol,
      },
    };
    return post(API_URL, {params});
  },
};
