// Toast.tsx
import {ReactNode} from 'react';
import {createToast} from './ToastManager';

export const Toast = {
  info: (content: ReactNode) => createToast(content, 'info'),
  success: (content: ReactNode) => createToast(content, 'success'),
  warn: (content: ReactNode) => createToast(content, 'warn'),
  error: (content: ReactNode) => createToast(content, 'error'),
};
