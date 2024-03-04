import {env} from '@rx/env';
import {history} from './history';

/**
 * 同步路由信息
 */
export function syncRouter(updateUrl) {
  const keysInfo = {
    lastKeyIndex: 0,
    keys: [history.location.key],
  };
  updateUrl(history.location, history.action, env.isBrowser ? window.location.href : '');
  history.listen(({location}) => {
    const action = history._action;
    const success = syncKeys(keysInfo, action, location.key);
    if (success) {
      updateUrl(location, action, env.isBrowser ? window.location.href : '');
      history._action = '';
      return;
    }

    window.location.reload();
  });
}

/**
 * 同步 keys
 * @param keysInfo
 * @param action
 * @param key
 * @returns {boolean} 同步成功返回true，否则返回false
 */
function syncKeys(keysInfo, action, key) {
  const {keys} = keysInfo;

  if (action === 'PUSH') {
    keys.push(key);
    keysInfo.lastKeyIndex = keys.length - 1;
    return true;
  }

  if (action === 'REPLACE') {
    keys.splice(keysInfo.lastKeyIndex, 1, key);
    return true;
  }

  const keyIndex = keys.indexOf(key);
  const isOldKey = keyIndex > -1;
  if (isOldKey) {
    if (action === 'GO_BACK') {
      keysInfo.lastKeyIndex = keyIndex;
      return true;
    }

    if (action === 'GO_FORWARD') {
      keysInfo.lastKeyIndex = keyIndex;
      return true;
    }
  }

  return false;
}
