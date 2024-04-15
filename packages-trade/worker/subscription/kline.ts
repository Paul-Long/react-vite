import {KlineSubTypes} from '@rx/const/subsription';
import {sendToUi} from '../ui';
import {TopicSubject} from './TopicSubject';

const kline$ = new TopicSubject({Types: KlineSubTypes});
kline$.subscribe((o) => {
  sendToUi(o);
});
