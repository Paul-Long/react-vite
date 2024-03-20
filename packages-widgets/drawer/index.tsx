import React, {useCallback} from 'react';
import {StyledContainer, StyledOverlay} from './styles';

interface Props {
  open?: boolean;
  children?: React.ReactNode;
  onClose?: (e?: React.MouseEvent | React.KeyboardEvent) => void;
}

export function Drawer(props: Props) {
  const {children, open = false, onClose} = props;

  // if (!open) {
  //   return null;
  // }

  const handleClose = useCallback(() => {
    onClose?.();
  }, []);
  return (
    <StyledOverlay $open={open} onClick={handleClose}>
      <StyledContainer $open={open}>{children}</StyledContainer>
    </StyledOverlay>
  );
}
