import {useLang} from '@rx/hooks/use-lang';
import {lang as clang} from '@rx/lang/common.lang';
import {lang} from '@rx/lang/trade.lang';
import {Button, Loading, Modal} from '@rx/widgets';
import {clsx} from 'clsx';

interface Props {
  loading?: boolean;
  visible: boolean;
  order: Record<string, any>;
  calcInfo?: Record<string, any>;
  contract?: Record<string, any>;
  onConfirm?: () => void;
  onClose?: () => void;
}

export function OrderConfirm(props: Props) {
  const {loading, order, visible, calcInfo, contract, onClose, onConfirm} = props;
  const {LG} = useLang();
  return (
    <Modal visible={visible} onClose={() => !loading && onClose?.()} title={LG(lang.ConfirmOrder)}>
      <div className="flex flex-col">
        <div className="flex flex-row items-end gap-4px">
          <span className="font-size-18px fw-medium mb-[-2px]">{contract?.symbolName}</span>
          <span className="font-size-12px">{order.marginType}</span>
          <span
            className={clsx(
              'font-size-12px',
              [order.direction === 'LONG' && 'text-green-500'],
              [order.direction === 'SHORT' && 'text-red-500']
            )}
          >
            {order.direction}
          </span>
          <span className="font-size-12px px-8px py-1px rounded-12px bg-gray-40">
            {order.leverage}X
          </span>
        </div>
        <div className="grid grid-cols-3 gap-24px p-16px rounded-8px bg-gray-40 mt-12px">
          <div className="flex flex-col gap-8px">
            <span className="text-gray-600 font-size-14px">{LG(lang.YTAmount)}</span>
            <span className="font-size-18px">{order.amount} YT</span>
          </div>
          <div className="flex flex-col gap-8px">
            <span className="text-gray-600 font-size-14px">{LG(lang.DepositMargin)}</span>
            <span className="font-size-18px">{order.margin} SOL</span>
          </div>
          <div className="flex flex-col gap-8px">
            <span className="text-gray-600 font-size-14px">{LG(lang.TradingFee)}</span>
            <span className="font-size-18px">{calcInfo?.fee ?? '-'} SOL</span>
          </div>
          <div className="flex flex-col gap-8px">
            <span className="text-gray-600 font-size-14px">{LG(lang.EstimatedYTAmount)}</span>
            <span className="font-size-18px">{calcInfo?.baseAssetAmount ?? '-'} YT</span>
          </div>
          <div className="flex flex-col gap-8px">
            <span className="text-gray-600 font-size-14px">{LG(lang.EstimatedEntryYield)}</span>
            <span className="font-size-18px">{calcInfo?.priceImpact ?? '-'}</span>
          </div>
        </div>
        <div className="flex flex-row justify-end gap-12px mt-24px">
          <Button size="sm" type="default" onClick={() => !loading && onClose?.()}>
            {loading && <Loading size={18} />}
            {LG(clang.Cancel)}
          </Button>
          <Button size="sm" type="primary" onClick={() => !loading && onConfirm?.()}>
            {loading && <Loading size={18} />}
            {LG(clang.Confirm)}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
