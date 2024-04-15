import {TopicSubject} from '@/subscription/TopicSubject';
import {ReferencePriceSubTypes} from '@rx/const/subsription';

export const referencePrice$ = new TopicSubject({
  serverName: 'APSSvr',
  Types: ReferencePriceSubTypes,
});

referencePrice$.subscribe((o) => {
  console.log(ReferencePriceSubTypes.Subscribe, o);
});
