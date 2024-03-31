import {API_URL} from '@rx/const/urls';
import {guid} from '@rx/helper/guid';
import {post} from '@rx/helper/http';

export const userApi = {
  userInfo() {
    const params = {
      serverName: 'LoginSvr',
      method: 'SYS.ATS.LOGIN',
      content: {
        method: 'userInfo',
        cid: guid.build(),
      },
    };
    return post(API_URL, {params});
  },
};
