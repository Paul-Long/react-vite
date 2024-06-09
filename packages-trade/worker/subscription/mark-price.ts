import {MarkPriceSubTypes} from '@rx/const/subsription';
import {sendToUi} from '../ui';
import {TopicSubject} from './TopicSubject';

const markPrice$ = new TopicSubject({
  Types: MarkPriceSubTypes,
  matchTopic: (topic1, topic2) => {
    if (!topic1 || !topic2) {
      return false;
    }
    const reg = new RegExp(/dc\.aps\.markprice\..*/);
    return reg.test(topic2);
  },
});
markPrice$.subscribe((o) => {
  sendToUi(o);
});
