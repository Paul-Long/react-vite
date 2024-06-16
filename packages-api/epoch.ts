import {API_URL} from '@rx/const/urls';
import {guid} from '@rx/helper/guid';
import {post} from '@rx/helper/http';

export const epochApi = {
  startTime() {
    const params = {
      serverName: 'APSSvr',
      method: 'TTM',
      content: {
        cid: guid.build(),
      },
    };
    return post(API_URL, {params});
  },
  ratePrice() {
    const params = {
      serverName: 'TradeSvr',
      method: 'dc.trade.dprice',
      content: {
        cid: guid.build(),
      },
    };
    return post(API_URL, {params});
  },
};
