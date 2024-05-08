import {PositionSubTypes} from '@rx/const/subsription';
import {sendToUi} from '../ui';
import {TopicSubject} from './TopicSubject';

const position$ = new TopicSubject({
  Types: PositionSubTypes,
  matchTopic: (topic1, topic2) => {
    if (!topic1 || !topic2) {
      return false;
    }
    let pattern = topic1;
    pattern = pattern.replace(/\./g, '\\.');
    pattern = pattern.replace(/\*/g, '.*');
    const regex = new RegExp(pattern);
    return regex.test(topic2);
  },
});
position$.subscribe((o) => {
  sendToUi(o);
});
