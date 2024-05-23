import {CloseIcon} from '@rx/components/icons/CloseIcon';
import {clsx} from 'clsx';
import {ReactNode} from 'react';
import ReactDOM from 'react-dom';

export function Modal(props: {
  visible: boolean;
  onClose?: () => void;
  children?: ReactNode;
  inline: boolean;
}) {
  if (!props.visible) {
    return null;
  }
  const element: ReactNode = (
    <div
      className={clsx(
        'fixed sm:absolute z-1000 sm:w-880px sm:max-w-full left-10px right-10px sm:right-none sm:left-50% sm:translate-x-[-50%] top-50% translate-y-[-50%] bg-#85C329 h-480px',
        'border-1px border-solid border-#2C2D2D',
        [props.visible ? 'flex' : 'hidden']
      )}
    >
      <div
        className="absolute top-10px right-10px z-10 rounded-2px bg-#09090A cursor-pointer"
        onClick={() => props.onClose?.()}
      >
        <CloseIcon color="#85C329" />
      </div>
      <div className="flex flex-col overflow-y-auto sv">{props.children}</div>
    </div>
  );
  if (props.inline) {
    return element;
  }
  return ReactDOM.createPortal(element, document?.body);
}
