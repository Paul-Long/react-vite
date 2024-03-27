import {API_URL} from '@rx/const/urls';
import {post} from '@rx/helper/http';

export const configApi = {
  config() {
    const params = {
      serverName: 'AdminSvr',
      method: 'querySymbol',
      content: {
        cid: 'test-1',
      },
    };
    return post(API_URL, {params});
  },
};
