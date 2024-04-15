import {TickSubTypes} from '@rx/const/subsription';
import {sendToUi} from '../ui';
import {TopicSubject} from './TopicSubject';

const tick$ = new TopicSubject({Types: TickSubTypes});
tick$.subscribe((o) => {
  sendToUi(o);
});
