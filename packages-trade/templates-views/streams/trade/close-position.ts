import {BehaviorSubject} from 'rxjs';

export const closePosition$ = new BehaviorSubject<{
  visible: boolean;
  data?: Record<string, any> | null;
  onClose?: () => void;
}>({
  visible: false,
  data: null,
  onClose: () => {},
});
