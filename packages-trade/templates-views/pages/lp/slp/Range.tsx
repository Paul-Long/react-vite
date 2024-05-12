import {clsx} from 'clsx';
import {useState} from 'react';

export function Range() {
  const [select, setSelect] = useState('0.06-0.08');
  return (
    <div className="grid grid-cols-2 gap-8px">
      {[
        ['0.06-0.08', '6.00% - 8.00%'],
        ['0.05-0.09', '5.00% - 9.00%'],
        ['0.04-0.1', '4.00% - 10.00%'],
        ['0.02-0.12', '2.00% - 12.00%'],
      ].map(([key, text]) => (
        <div
          key={key}
          className={clsx(
            'font-size-16px lh-22px text-center py-12px rounded-8px bg-gray-40 cursor-pointer',
            [select === key ? '0.06-0.08 fw-semibold text-white' : 'text-gray-600']
          )}
          onClick={() => setSelect(key)}
        >
          {text}
        </div>
      ))}
    </div>
  );
}
