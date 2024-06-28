import {clsx} from 'clsx';
import {useCallback, useEffect, useState} from 'react';

export function Pagination({
  totalPages = 0,
  visiblePages = 6,
  onChange,
}: {
  totalPages?: number;
  visiblePages?: number;
  onChange?: (current: number) => void;
}) {
  const [current, setCurrent] = useState(1);
  const [beforePages, setBeforePages] = useState<number[]>([]);
  const [afterPages, setAfterPages] = useState<number[]>([]);

  useEffect(() => {
    onChange?.(current);
  }, [current]);

  useEffect(() => {
    if (beforePages.includes(current) || afterPages.includes(current) || totalPages <= 0) {
      return;
    }

    if (totalPages <= visiblePages) {
      let array = Array.from({length: totalPages}, (_, index) => index + 1);
      setBeforePages(array);
      setAfterPages([]);
      return;
    }

    if (current > totalPages - visiblePages / 2) {
      const before = Array.from({length: visiblePages / 2}, (_, index) => index + 1);
      const after = Array.from(
        {length: visiblePages / 2},
        (_, index) => totalPages - index
      ).reverse();
      setBeforePages(before);
      setAfterPages(after);
      return;
    }

    if (current < totalPages - visiblePages / 2) {
      const after = Array.from(
        {length: visiblePages / 2},
        (_, index) => totalPages - index
      ).reverse();
      let before = Array.from({length: visiblePages / 2}, (_, index) => current + index);
      setBeforePages(before);
      setAfterPages(after);
      return;
    }

    const after = Array.from(
      {length: visiblePages / 2},
      (_, index) => totalPages - index
    ).reverse();
    const before = Array.from({length: visiblePages / 2}, (_, index) => current + index).filter(
      (n) => !after.includes(n)
    );
    const len = before.length;
    if (before.length < visiblePages / 2) {
      for (let i = 1; i <= visiblePages / 2 - len; i++) {
        before.unshift(before[before.length - 1] - i);
      }
    }
    setBeforePages(before);
    setAfterPages(after);
  }, [current, beforePages, afterPages, totalPages, visiblePages]);

  const handleClick = useCallback((pageNum: number) => {
    setCurrent(pageNum);
  }, []);

  const handleNext = useCallback(() => {
    setCurrent((prevState) => Math.min(prevState + 1, totalPages));
  }, [totalPages]);

  const handlePrevious = useCallback(() => {
    setCurrent((prevState) => Math.max(prevState - 1, 1));
  }, []);

  if (totalPages <= 0) {
    return <></>;
  }

  return (
    <nav
      className="isolate inline-flex -space-x-px rounded-md shadow-sm cursor-pointer"
      aria-label="Pagination"
    >
      <div
        className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-500 ring-1 ring-inset ring-#2C2D2D hover:ring-lime-500 hover:bg-lime-500 hover:text-#09090A focus:z-20 focus:outline-offset-0"
        onClick={handlePrevious}
      >
        <span className="sr-only">Previous</span>
        <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path
            fillRule="evenodd"
            d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      {beforePages.map((p) => (
        <div
          key={p}
          onClick={() => handleClick(p)}
          className={clsx(
            'relative inline-flex items-center px-4 py-2 text-sm font-semibold focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-500',
            [
              current === p
                ? ' z-10 bg-lime-500 text-#09090A'
                : 'text-gray-500 ring-1 ring-inset ring-#2C2D2D hover:ring-lime-500 hover:bg-lime-500 hover:text-#09090A',
            ]
          )}
        >
          {p}
        </div>
      ))}
      {afterPages?.length > 0 &&
        beforePages.length > 0 &&
        afterPages[0] - beforePages[beforePages.length - 1] > 1 && (
          <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-500 ring-1 ring-inset ring-#2C2D2D focus:outline-offset-0">
            ...
          </span>
        )}
      {afterPages.map((p) => (
        <div
          key={p}
          onClick={() => handleClick(p)}
          className={clsx(
            'relative inline-flex items-center px-4 py-2 text-sm font-semibold focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600',
            [
              current === p
                ? ' z-10 bg-lime-500 text-#09090A'
                : 'text-gray-500 ring-1 ring-inset ring-#2C2D2D hover:ring-lime-500 hover:bg-lime-500 hover:text-#09090A',
            ]
          )}
        >
          {p}
        </div>
      ))}
      <div
        className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-500 ring-1 ring-inset ring-#2C2D2D hover:ring-lime-500 hover:bg-lime-500 focus:z-20 focus:outline-offset-0"
        onClick={handleNext}
      >
        <span className="sr-only">Next</span>
        <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path
            fillRule="evenodd"
            d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    </nav>
  );
}
