import {ReferencePriceSubTypes} from '@rx/const/subsription';
import {sendToUi} from '../ui';
import {TopicSubject} from './TopicSubject';

const referencePrice$ = new TopicSubject({Types: ReferencePriceSubTypes});
referencePrice$.subscribe((o) => {
  sendToUi(o);
});
