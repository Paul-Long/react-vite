import {BehaviorSubject} from 'rxjs';

export const walletModalVisible$ = new BehaviorSubject<boolean>(false);

export interface DepositParams {
  visible: boolean;
  marketIndex?: number;
  userPda?: string;
  amount?: number;
}
export const depositModal$ = new BehaviorSubject<DepositParams>({visible: false});
