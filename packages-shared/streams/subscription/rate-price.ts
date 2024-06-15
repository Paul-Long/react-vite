import {TopicSubject} from '@/subscription/TopicSubject';
import {RatePriceSubTypes} from '@rx/const/subsription';

export const ratePrice$ = new TopicSubject({
  serverName: 'TradeSvr',
  Types: RatePriceSubTypes,
  initValue: [],
});
