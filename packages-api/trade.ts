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
};
