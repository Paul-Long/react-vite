import {TopicSubject} from '@/subscription/TopicSubject';
import {RecentTradesSubTypes} from '@rx/const/subsription';

export const recentTrades$ = new TopicSubject({
  serverName: 'gateway',
  Types: RecentTradesSubTypes,
  initValue: {},
});
