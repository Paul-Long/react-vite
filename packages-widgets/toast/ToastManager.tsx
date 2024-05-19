// ToastManager.tsx
import React, {ReactNode, useCallback, useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import {keyframes, styled} from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const ToastContainer = styled.div`
  position: fixed;
  top: 40px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 9999;
`;

const ToastMessage = styled.div<{type: string}>`
  background-color: ${({type}) => {
    switch (type) {
      case 'info':
        return '#2196f3';
      case 'success':
        return '#4caf50';
      case 'warn':
        return '#ff9800';
      case 'error':
        return '#f44336';
      default:
        return '#323232';
    }
  }};
  color: white;
  margin-top: 12px;
  padding: 12px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  animation: ${fadeIn} 0.5s ease-out;
  min-width: 250px;
  max-width: 80%;
  text-align: center;
  &:not(:last-child) {
    margin-bottom: 12px;
  }
`;

type ToastType = 'info' | 'success' | 'warn' | 'error';
type ToastData = {id: number; content: ReactNode; type: ToastType};

let toasts: ToastData[] = [];
let updateFunction: (() => void) | null = null;

const Toast = React.memo(
  ({content, type, onDismiss}: {content: ReactNode; type: string; onDismiss: () => void}) => {
    useEffect(() => {
      const timer = setTimeout(onDismiss, 3000);
      return () => clearTimeout(timer);
    }, [onDismiss]);

    return <ToastMessage type={type}>{content}</ToastMessage>;
  }
);

export const ToastManager = () => {
  const [toastList, setToastList] = useState<ToastData[]>([]);

  updateFunction = useCallback(() => {
    setToastList([...toasts]);
  }, []);

  useEffect(() => {
    updateFunction?.();
  }, [updateFunction]);

  if (typeof window === 'undefined') {
    return null;
  }

  return ReactDOM.createPortal(
    <ToastContainer>
      {toastList.map((toast) => (
        <Toast
          key={toast.id}
          content={toast.content}
          type={toast.type}
          onDismiss={() => {
            toasts = toasts.filter((t) => t.id !== toast.id);
            updateFunction?.();
          }}
        />
      ))}
    </ToastContainer>,
    document?.body
  );
};
let count = 0;
export const createToast = (content: ReactNode, type: ToastType) => {
  const id = Date.now() + count++;
  toasts.push({id, content, type});
  updateFunction?.();
  setTimeout(() => {
    toasts = toasts.filter((toast) => toast.id !== id);
    updateFunction?.();
  }, 3000);
};

export const toast = {
  info: (content: ReactNode) => createToast(content, 'info'),
  success: (content: ReactNode) => createToast(content, 'success'),
  warn: (content: ReactNode) => createToast(content, 'warn'),
  error: (content: ReactNode) => createToast(content, 'error'),
};
