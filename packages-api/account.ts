import {API_URL} from '@rx/const/urls';
import {guid} from '@rx/helper/guid';
import {post} from '@rx/helper/http';

export const accountApi = {
  queryTodayRealizedPnl() {
    const params = {
      serverName: 'AdminSvr',
      method: 'queryTodayRealizedPnl',
      content: {
        cid: guid.build(),
      },
    };
    return post(API_URL, {params});
  },
  queryRealizedPnl() {
    const params = {
      serverName: 'AdminSvr',
      method: 'queryRealizedPnl',
      content: {
        cid: guid.build(),
      },
    };
    return post(API_URL, {params});
  },
  queryUsersTotalBalance() {
    const params = {
      serverName: 'AdminSvr',
      method: 'queryUsersTotalBalance',
      content: {
        cid: guid.build(),
      },
    };
    return post(API_URL, {params});
  },
};
