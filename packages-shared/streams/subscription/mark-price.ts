import {TopicSubject} from '@/subscription/TopicSubject';
import {MarkPriceSubTypes} from '@rx/const/subsription';

export const markPrice$ = new TopicSubject({
  serverName: 'APSSvr',
  Types: MarkPriceSubTypes,
  initValue: {},
  matchTopic: (topic1, topic2) => {
    if (!topic1 || !topic2) {
      return false;
    }
    const reg = new RegExp(/dc\.aps\.markprice\..*/);
    return reg.test(topic2);
  },
});
