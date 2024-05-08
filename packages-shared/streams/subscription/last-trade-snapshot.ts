import {TopicSubject} from '@/subscription/TopicSubject';
import {LastTradeSnapshotSubTypes} from '@rx/const/subsription';

export const lastTradeSnapshot$ = new TopicSubject({
  serverName: 'MDSvr',
  Types: LastTradeSnapshotSubTypes,
  initValue: {},
});
