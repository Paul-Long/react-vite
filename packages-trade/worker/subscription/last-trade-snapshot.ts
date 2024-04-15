import {LastTradeSnapshotSubTypes} from '@rx/const/subsription';
import {sendToUi} from '../ui';
import {TopicSubject} from './TopicSubject';

const lastTradeSnapshot$ = new TopicSubject({Types: LastTradeSnapshotSubTypes});
lastTradeSnapshot$.subscribe((o) => {
  sendToUi(o);
});
