import {LastTradeSnapshotSubTypes} from '@rx/const/subsription';
import {sendToUi} from '../ui';
import {TopicSubject} from './TopicSubject';

const lastTradeSnapshot$ = new TopicSubject({Types: LastTradeSnapshotSubTypes,
  matchTopic: (topic1, topic2) => {
    if (!topic1 || !topic2) {
      return false;
    }
    const reg = new RegExp(/dc\.md\.trade\..*/);
    return reg.test(topic2);
  },
});
lastTradeSnapshot$.subscribe((o) => {
  sendToUi(o);
});
