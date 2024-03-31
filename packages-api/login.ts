import {API_URL} from '@rx/const/urls';
import {guid} from '@rx/helper/guid';
import {post} from '@rx/helper/http';

export const loginApi = {
  login: ({signature, signedMessage, publicKey}: any) => {
    const params = {
      serverName: 'LoginSvr',
      method: 'SYS.ATS.LOGIN',
      content: {
        user_id: signedMessage,
        password: signature,
        user_name: publicKey,
        method: 'login',
        client_type: 'WEB',
        cid: guid.build(),
      },
    };
    return post(API_URL, {params});
  },
};
