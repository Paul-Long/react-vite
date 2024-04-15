import {post} from '@rx/helper/http';
import {API_URL} from '../packages-shared/const/urls';

export const klineApi = {
  queryKLine() {
    const params = {
      serverName: 'MDSvr',
      method: 'queryKLine',
      content: {
        securityID: 'mSOL-2406',
        num: 2000,
        text: '1M',
      },
    };
    return post(API_URL, {params});
  },
};
