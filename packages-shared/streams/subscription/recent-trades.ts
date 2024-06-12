import {TopicSubject} from '@/subscription/TopicSubject';
import {RecentTradesSubTypes} from '@rx/const/subsription';

export const recentTrades$ = new TopicSubject({
  serverName: 'MDSvr',
  Types: RecentTradesSubTypes,
  initValue: {},
});
