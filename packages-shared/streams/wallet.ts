import {BehaviorSubject} from 'rxjs';

export const walletModalVisible$ = new BehaviorSubject<boolean>(false);

export interface DepositParams {
  visible: boolean;
  marketIndex?: number;
  userPda?: string;
  amount?: number;
  onFinish?: () => void;
}
export const depositModal$ = new BehaviorSubject<DepositParams>({visible: false});

export interface WithdrawParams {
  visible: boolean;
  marketIndex?: number;
  userPda?: string;
  amount?: number;
  onFinish?: () => void;
}

export const withdrawModal$ = new BehaviorSubject<WithdrawParams>({visible: false});
