import {clsx} from 'clsx';

export default function () {
  return (
    <div className="flex flex-col w-1200px mx-auto">
      <div
        className={clsx(
          'flex flex-col items-center justify-center w-full mx-auto mt-87px font-size-24px text-gray-600 gap-20px'
        )}
      >
        <img src="https://static.rate-x.io/img/v1/c111c8/no-data.png" alt="" width="120" />
        Coming Soon
      </div>
    </div>
  );
}
