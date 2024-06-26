import clsx from 'clsx';
import {ResolutionString} from './charting_library';

interface Props {
  value?: string;
  onChange?: (v: ResolutionString) => void;
}

export function Resolution(props: Props) {
  return (
    <div className="flex flex-row items-center w-full py-20px px-20px">
      <div className="font-size-14px lh-18px text-gray-60 mr-12px">Time</div>
      {genTimes().map(([t, v]) => (
        <div
          className={clsx('px-12px py-3px rounded-2px', 'font-size-14px lh-18px cursor-pointer', [
            props.value === v ? 'text-lime-500 bg-lime-10 fw-medium' : 'text-gray-500 fw-normal',
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
