import {post} from '@rx/helper/http';
import {API_URL} from '../packages-shared/const/urls';

export const klineApi = {
  queryKLine(query: any) {
    const params = {
      serverName: 'MDSvr',
      method: 'queryKLine',
      content: {
        securityID: query.securityID,
        num: 2000,
        text: query.text,
      },
    };
    return post(API_URL, {params});
  },
};
