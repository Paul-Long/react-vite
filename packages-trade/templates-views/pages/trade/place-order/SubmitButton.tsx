import {useLang} from '@rx/hooks/use-lang';
import {lang} from '@rx/lang/trade.lang';
import React from 'react';

interface Props {
  onSubmit?: () => void;
  disabled?: boolean;
  children?: React.ReactNode;
}
export function SubmitButton(props: Props) {
  const {LG} = useLang();
  const {disabled = false, onSubmit} = props;
  return (
    <button
      className="bg-white text-black font-size-16px lh-16px font-bold rounded-4px px-24px py-16px hover:opacity-80 active:opacity-90"
      disabled={disabled}
      onClick={onSubmit}
    >
      {LG(lang.Trade)}
    </button>
  );
}
