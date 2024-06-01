import {TopicSubject} from '@/subscription/TopicSubject';
import {LastTradeSnapshotSubTypes} from '@rx/const/subsription';

export const lastTradeSnapshot$ = new TopicSubject({
  serverName: 'MDSvr',
  Types: LastTradeSnapshotSubTypes,
  initValue: {},
  matchTopic: (topic1, topic2) => {
    if (!topic1 || !topic2) {
      return false;
    }
    const reg = new RegExp(/dc\.md\.trade\..*/);
    return reg.test(topic2);
  },
});
