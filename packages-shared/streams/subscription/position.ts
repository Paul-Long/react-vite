import {TopicSubject} from '@/subscription/TopicSubject';
import {PositionSubTypes} from '@rx/const/subsription';

export const positionUpdate$ = new TopicSubject({
  serverName: 'TradeSvr',
  Types: PositionSubTypes,
  initValue: [],
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

positionUpdate$.subscribe((d) => {
  console.log(PositionSubTypes.Subscribe, d);
});
