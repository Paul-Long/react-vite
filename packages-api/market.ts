import {guid} from '@rx/helper/guid';
import {post} from '@rx/helper/http';
import {API_URL} from '../packages-shared/const/urls';

export const marketApi = {
  ratePrice() {
    const params = {
      serverName: 'APSSvr',
      method: 'ratePrice',
      content: {
        cid: guid.build(),
      },
    };
    return post(API_URL, {params});
  },
  referencePrice() {
    const params = {
      serverName: 'APSSvr',
      method: 'dc.aps.referenceprice',
      content: {
        cid: guid.build(),
      },
    };
    return post(API_URL, {params});
  },
};
