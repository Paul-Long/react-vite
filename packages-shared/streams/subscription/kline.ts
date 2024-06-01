import {TopicSubject} from '@/subscription/TopicSubject';
import {formatKlineRow} from '@/utils/format-kline';
import {KlineSubTypes} from '@rx/const/subsription';

export const kline$ = new TopicSubject({
  serverName: 'MDSvr',
  Types: KlineSubTypes,
  initValue: [],
  // formatter: formatData,
});

// kline$.subscribe((o) => {
//   console.log(KlineSubTypes.Subscribe, o);
// });

function formatData(content?: string[]) {
  return content
    ?.map((s) => formatKlineRow(s))
    .filter(Boolean)
    .sort((a, b) => (a.closeTime > b.closeTime ? 1 : -1));
}
