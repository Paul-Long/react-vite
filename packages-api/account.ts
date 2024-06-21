import {API_URL} from '@rx/const/urls';
import {guid} from '@rx/helper/guid';
import {post} from '@rx/helper/http';
import dayjs from 'dayjs';

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
    const now = dayjs().format('YYYY-MM-DD');
    const end = dayjs().subtract(30, 'day').format('YYYY-MM-DD');
    const params = {
      serverName: 'AdminSvr',
      method: 'queryUsersTotalBalance',
      content: {
        cid: guid.build(),
        start_date: end,
        end_date: now,
      },
    };
    return post(API_URL, {params});
  },
};
