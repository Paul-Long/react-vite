import {TopicSubject} from '@/subscription/TopicSubject';
import {LastTradeSnapshotSubTypes} from '@rx/const/subsription';

export const lastTradeSnapshot$ = new TopicSubject({
  serverName: 'MDSvr',
  Types: LastTradeSnapshotSubTypes,
  initValue: {},
});

lastTradeSnapshot$.subscribe((o) => {
  console.log(LastTradeSnapshotSubTypes.Subscribe, o);
});
