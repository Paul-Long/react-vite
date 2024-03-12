import {useCallback, useState} from 'react';

export function useDialog<T extends any>(): ModalHook<T> {
  const [visible, setVisible] = useState<boolean>(false);
  const [data, setData] = useState<T>();

  const onOpen = useCallback((record: any) => {
    return function () {
      if (record) {
        setData(record);
        setVisible(true);
      }
    };
  }, []);

  const onClose = useCallback(() => setVisible(false), []);

  return {visible, onOpen, onClose, data};
}
