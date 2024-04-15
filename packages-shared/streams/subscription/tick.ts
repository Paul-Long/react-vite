import {TopicSubject} from '@/subscription/TopicSubject';
import {TickSubTypes} from '@rx/const/subsription';

export const tick$ = new TopicSubject({serverName: 'APSSvr', Types: TickSubTypes});
tick$.subscribe((o) => {
  console.log(TickSubTypes.Subscribe, o);
});
