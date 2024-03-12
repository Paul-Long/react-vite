interface ModalHook<T extends any> {
  visible: boolean;
  onOpen: Function;
  onClose: Function;
  data?: T;
}
