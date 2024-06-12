import {RecentTradesSubTypes} from '@rx/const/subsription';
import {sendToUi} from '../ui';
import {TopicSubject} from './TopicSubject';

const recentTrades$ = new TopicSubject({Types: RecentTradesSubTypes});
recentTrades$.subscribe((o) => {
  sendToUi(o);
});
