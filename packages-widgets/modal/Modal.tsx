import React, {FC, memo, useCallback, useEffect, useRef} from 'react';
import ReactDOM from 'react-dom';
import {keyframes, styled} from 'styled-components';

interface ModalProps {
  title?: string;
  visible?: boolean;
  onClose: () => void;
  closeBtn?: boolean;
  size?: 'small' | 'medium' | 'large';
  children?: React.ReactNode;
  container?: string;
}

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const fadeOut = keyframes`
  from { opacity: 1; }
  to { opacity: 0; }
`;

const ModalOverlay = styled.div`
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContainer = styled.div<{$show: boolean; $size: 'small' | 'medium' | 'large'}>`
  background: black;
  color: white;
  width: ${({$size}) => ($size === 'small' ? '300px' : $size === 'large' ? '600px' : '450px')};
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
  z-index: 1001;
  animation: ${({$show}) => ($show ? fadeIn : fadeOut)} 0.3s ease;
  visibility: ${({$show}) => ($show ? 'visible' : 'hidden')};
`;

const ModalHeader = styled.div<{$show: string}>`
  display: flex;
  justify-content: ${({$show}) => ($show === 'true' ? 'space-between' : 'flex-end')};
  align-items: center;
  margin-bottom: 16px;
`;

const CloseButton = styled.button.attrs(() => ({
  type: 'button',
}))`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 1.5rem;
`;

export const Modal: FC<ModalProps> = memo(
  ({title, visible = false, onClose, closeBtn = true, size = 'medium', children}) => {
    const modalRef = useRef<HTMLDivElement | null>(null);
    const triggerElementRef = useRef<Element | null>(null);

    const handleKeyDown = useCallback(
      (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          onClose();
        }
      },
      [onClose]
    );

    useEffect(() => {
      if (visible) {
        triggerElementRef.current = document.activeElement;
        document.addEventListener('keydown', handleKeyDown);
        modalRef.current?.focus();
      }

      return () => {
        document.removeEventListener('keydown', handleKeyDown);
        if (!visible) {
          (triggerElementRef.current as HTMLElement)?.focus();
        }
      };
    }, [visible, handleKeyDown]);

    if (!visible || typeof window === 'undefined') {
      return null;
    }

    return ReactDOM.createPortal(
      <ModalOverlay>
        <ModalContainer $size={size} $show={visible} ref={modalRef} tabIndex={-1}>
          <ModalHeader $show={(!!title).toString()}>
            {title && <h2>{title}</h2>}
            {closeBtn && <CloseButton onClick={onClose}>×</CloseButton>}
          </ModalHeader>
          {children}
        </ModalContainer>
      </ModalOverlay>,
      document?.body
    );
  }
);
