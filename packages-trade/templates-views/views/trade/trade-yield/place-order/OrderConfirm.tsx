import {IMAGES} from '@/pages/lp/const';
import {useLang} from '@rx/hooks/use-lang';
import {lang as clang} from '@rx/lang/common.lang';
import {lang} from '@rx/lang/trade.lang';
import {Button, Modal} from '@rx/widgets';
import {clsx} from 'clsx';
import {ReactNode} from 'react';

interface Props {
  loading?: boolean;
  visible?: boolean;
  order: Record<string, any>;
  calcInfo?: Record<string, any>;
  contract?: Record<string, any>;
  onConfirm?: () => void;
  onClose?: () => void;
}

export function OrderConfirm({
  loading,
  order,
  visible,
  calcInfo,
  contract,
  onConfirm,
  onClose,
}: Props) {
  const {LG} = useLang();
  return (
    <Modal
      visible={visible}
      onClose={() => !loading && onClose?.()}
      title={
        <div className="flex flex-row items-end gap-8px">
          <img
            src={IMAGES[contract?.symbolLevel2Category?.toUpperCase()]}
            alt=""
            width={20}
            height={20}
          />
          <span className="lh-20px">{contract?.symbol}</span>
          <span
            className={clsx(
              'font-size-12px lh-18px',
              [order.direction === 'LONG' && 'text-lime-500'],
              [order.direction === 'SHORT' && 'text-red-500']
            )}
          >
            {order.direction}
          </span>
        </div>
      }
    >
      <div className="flex flex-col p-24px">
        <div className="flex flex-col items-end gap-12px pb-12px border-b-1px border-solid border-#2C2D2D">
          <div
            className={clsx(
              'font-size-24px',
              [order.direction === 'LONG' && 'text-lime-500'],
              [order.direction === 'SHORT' && 'text-red-500']
            )}
          >
            {order.direction === 'LONG' ? '+' : '-'}
            {order.amount} YT
          </div>
          <div className="font-size-24px">
            {order.direction === 'LONG' ? '-' : '+'}
            {order.margin} ST
          </div>
        </div>
        <div className="flex flex-col py-12px gap-12px">
          <Item label={LG(lang.EstimatedEntryYield)}>{calcInfo?.priceImpact ?? '-'}</Item>
          <Item label={LG(lang.PriceImpact)}>
            <span className="text-yellow-500">{calcInfo?.impact}</span>
          </Item>
          {order.marginType === 'ISOLATED' && (
            <Item label={LG(lang.LiquidationPrice)}>{calcInfo?.lipPrice ?? '-'}</Item>
          )}
          <Item label={LG(lang.TradingFee)}>{calcInfo?.fee ?? '-'} SOL</Item>
        </div>

        <Button
          size="md"
          type="lime"
          loading={loading}
          disabled={loading}
          onClick={() => onConfirm?.()}
        >
          <span className="font-size-16px fw-medium">{LG(clang.Confirm)}</span>
        </Button>
      </div>
    </Modal>
  );
}
function Item({label, children}: {label: ReactNode; children: ReactNode}) {
  return (
    <div className="flex flex-row items-center justify-between font-size-12px lh-18px">
      <span className="text-gray-60">{label}</span>
      <div className="fw-medium">{children}</div>
    </div>
  );
}
