const WILDCARD = '*';
const ALL_WILDCARD = '**';

export const matchTopic = (mTopic: string, subTopic: string): boolean => {
  if (mTopic === subTopic) {
    return true;
  }

  const arrList = mTopic.split('.');
  const subList = subTopic.split('.');
  const s_len = subList.length;
  const m_len = arrList.length;

  let status = false;
  for (let i = 0; i < s_len; i++) {
    if (subList[i] === arrList[i]) {
      status = true;
    } else if (subList[i] === WILDCARD && arrList[i] !== WILDCARD) {
      status = s_len === m_len;
      if (!status) break;
    } else if (subList[i] === ALL_WILDCARD && arrList[i] !== ALL_WILDCARD) {
      status = true;
      // If '**' is not at the end of the subTopic, the following topic levels must match.
      if (i !== s_len - 1) {
        const remainingSubList = subList.slice(i + 1);
        const remainingArrList = arrList.slice(i + 1);
        if (remainingSubList.length !== remainingArrList.length) {
          return false;
        }
        for (let j = 0; j < remainingSubList.length; j++) {
          if (remainingSubList[j] !== remainingArrList[j] && remainingSubList[j] !== WILDCARD) {
            return false;
          }
        }
        break; // Match found, exit loop.
      }
    } else {
      status = false;
      break;
    }
  }

  return status;
};
