import {numUtil} from './num';

const formatDate = (t) => {
  const time = new Date(t);
  const y = time.getFullYear();
  const m = time.getMonth() + 1;
  const d = time.getDate();
  return [y, m, d].map(numUtil.pad).join('-');
};

const formatTime = (t) => {
  const time = new Date(t);
  const h = time.getHours();
  const m = time.getMinutes();
  const s = time.getSeconds();
  return [h, m, s].map(numUtil.pad).join(':');
};

const formatMonthDay = (t) => {
  const time = new Date(t);
  const m = time.getMonth() + 1;
  const d = time.getDate();
  return [m, d].map(numUtil.pad).join('-');
};

const formatMonthDayTime = (t) => {
  return [formatMonthDay(t), formatTime(t)].join(' ');
};

const formatDateTime = (t, slice = ' ') => {
  return [formatDate(t), formatTime(t)].join(slice);
};

const formatUTCDate = (t) => {
  const time = new Date(t);
  const y = time.getUTCFullYear();
  const m = time.getUTCMonth() + 1;
  const d = time.getUTCDate();
  return [y, m, d].map(numUtil.pad).join('-');
};

const formatUTCTime = (t) => {
  const time = new Date(t);
  const h = time.getUTCHours();
  const m = time.getUTCMinutes();
  const s = time.getUTCSeconds();
  return [h, m, s].map(numUtil.pad).join(':');
};

const formatUTCDateTime = (t) => {
  return [formatUTCDate(t), formatUTCTime(t)].join(' ');
};

export const timeUtil = {
  formatDate,
  formatMonthDayTime,
  formatTime,
  formatDateTime,
  formatUTCDate,
  formatUTCTime,
  formatUTCDateTime,
};
