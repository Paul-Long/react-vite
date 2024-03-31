import React, {CSSProperties, FC, memo, useCallback, useEffect, useRef} from 'react';
import ReactDOM from 'react-dom';
import {keyframes, styled} from 'styled-components';

interface ModalProps {
  title?: string;
  visible?: boolean;
  onClose?: Function;
  closeBtn?: boolean;
  size?: 'small' | 'medium' | 'large';
  children?: React.ReactNode;
  container?: string;
  contentStyle?: CSSProperties;
  maskCloseAble?: boolean;
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
  min-width: ${({$size}) => ($size === 'small' ? '300px' : $size === 'large' ? '600px' : '450px')};
  border-radius: 8px;
  border: 1px solid var(--light-gray);
  padding: 24px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
  z-index: 1001;
  outline: none;
  animation: ${({$show}) => ($show ? fadeIn : fadeOut)} 0.3s ease;
  visibility: ${({$show}) => ($show ? 'visible' : 'hidden')};
`;

const ModalHeader = styled.div<{$show: string}>`
  display: flex;
  justify-content: ${({$show}) => ($show === 'true' ? 'space-between' : 'flex-end')};
  align-items: center;
  margin-bottom: 16px;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
`;

export const Modal: FC<ModalProps> = memo(
  ({
    title,
    visible = false,
    onClose = () => {},
    closeBtn = true,
    size = 'medium',
    children,
    contentStyle = {},
    maskCloseAble = false,
  }) => {
    const modalRef = useRef<HTMLDivElement | null>(null);
    const triggerElementRef = useRef<Element | null>(null);

    const handleKeyDown = useCallback(
      (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          onClose?.();
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

    const handleClickMask = useCallback(() => {
      if (!maskCloseAble) {
        return;
      }
      onClose();
    }, []);
    if (!visible || typeof window === 'undefined') {
      return null;
    }

    return ReactDOM.createPortal(
      <ModalOverlay onClick={handleClickMask}>
        <ModalContainer
          $size={size}
          $show={visible}
          ref={modalRef}
          tabIndex={-1}
          style={contentStyle}
        >
          <ModalHeader $show={(!!title).toString()}>
            {title && <h2 className="fw700">{title}</h2>}
            {closeBtn && (
              <CloseButton onClick={onClose as any}>
                <i className="iconfont font-size-18px">&#xe637;</i>
              </CloseButton>
            )}
          </ModalHeader>
          {children}
        </ModalContainer>
      </ModalOverlay>,
      document?.body
    );
  }
);
