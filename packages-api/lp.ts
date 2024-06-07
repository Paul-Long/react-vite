import {API_URL} from '../packages-shared/const/urls';
import {guid} from '../packages-shared/helper/guid';
import {post} from '../packages-shared/helper/http';

export const lpApi = {
  queryApy() {
    const params = {
      serverName: 'AdminSvr',
      method: 'querySolanaTermRewardRate',
      content: {
        cid: guid.build(),
      },
    };
    return post(API_URL, {params});
  },
};
