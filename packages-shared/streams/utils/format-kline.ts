import {timeUtil} from '@rx/helper/time';

export function formatKlineRow(data: string) {
  try {
    const [timeFormat, closeTime, open, high, low, close, volume, turnover] = data.split(',');
    const time = Number(closeTime);
    if (isNaN(time)) {
      return null;
    }
    return {
      timeFormat,
      closeTime: timeUtil.formatUTCDateTime(time),
      open,
      high,
      low,
      close,
      volume,
      turnover,
    };
  } catch (e) {
    return null;
  }
}
