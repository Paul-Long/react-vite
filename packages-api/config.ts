import {API_URL} from '@rx/const/urls';
import {guid} from '@rx/helper/guid';
import {post} from '@rx/helper/http';

export const configApi = {
  config() {
    const params = {
      serverName: 'AdminSvr',
      method: 'querySymbol',
      content: {
        cid: guid.build(),
      },
    };
    return post(API_URL, {params});
  },
};
