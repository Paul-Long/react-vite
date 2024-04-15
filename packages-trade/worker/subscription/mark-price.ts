import {MarkPriceSubTypes} from '@rx/const/subsription';
import {sendToUi} from '../ui';
import {TopicSubject} from './TopicSubject';

const markPrice$ = new TopicSubject({Types: MarkPriceSubTypes});
markPrice$.subscribe((o) => {
  sendToUi(o);
});
