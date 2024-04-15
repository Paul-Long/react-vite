import {TopicSubject} from '@/subscription/TopicSubject';
import {MarkPriceSubTypes} from '@rx/const/subsription';

export const markPrice$ = new TopicSubject({
  serverName: 'APSSvr',
  Types: MarkPriceSubTypes,
  initValue: {},
});

markPrice$.subscribe((o) => {
  console.log(MarkPriceSubTypes.Subscribe, o);
});
