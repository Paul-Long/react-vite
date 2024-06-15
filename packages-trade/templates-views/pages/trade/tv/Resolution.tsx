import clsx from 'clsx';
import {ResolutionString} from './charting_library';

interface Props {
  value?: string;
  onChange?: (v: ResolutionString) => void;
}

export function Resolution(props: Props) {
  return (
    <div className="flex flex-row items-center w-full h-48px">
      <div className="font-size-14px lh-16px pl-12px text-gray-600">Time</div>
      {genTimes().map(([t, v]) => (
        <div
          className={clsx('px-8px py-4px rounded-4px', 'font-size-14px lh-16px cursor-pointer', [
            props.value === v ? 'text-white bg-gray-80' : 'text-gray-600',
          ])}
          key={t}
          onClick={() => props.onChange?.(v as ResolutionString)}
        >
          {t}
        </div>
      ))}
    </div>
  );
}

const genTimes = () => [
  ['1m', '1'],
  ['5m', '5'],
  ['15m', '15'],
  ['30m', '30'],
  ['1D', '1D'],
  ['1W', '1W'],
  ['1M', '1M'],
  ['1Y', '1Y'],
];
