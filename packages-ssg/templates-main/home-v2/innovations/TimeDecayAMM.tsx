import {Modal} from '@/home-v2/innovations/Modal';
import {clsx} from 'clsx';

export function TimeDecayAMM(props: {inline?: boolean; show: string; onShow: (v: string) => void}) {
  return (
    <>
      <div className="flex flex-row items-center border-1px border-solid border-#2C2D2D p-30px gap-20px sm:p-50px sm:pt-40px sm:gap-50px">
        <img
          className="w-120px h-120px"
          src="https://static.rate-x.io/img/v1/f7b489/time-decay-amm.svg"
          alt=""
        />
        <div className="flex flex-col">
          <img
            className="w-30px h-30px"
            src="https://static.rate-x.io/img/v1/cc7ca6/amm-1.svg"
            alt=""
          />
          <div className="font-size-20px lh-20px mt-28px">Time-Decay AMM</div>
          <div className="font-size-15px lh-15px text-#09090A4C mt-6px">
            Synthesized yield token with diminishing potential IL as it approaches expiration
          </div>
          <div
            className="font-size-15px lh-15px text-#09090A mt-12px cursor-pointer"
            onClick={() => props.onShow('modal-1')}
          >
            Learn more
          </div>
        </div>
      </div>
      <Modal
        visible={props.show === 'modal-1'}
        onClose={() => props.onShow('')}
        inline={!!props.inline}
      >
        <div
          className={clsx(
            'sm:absolute sm:top-50px sm:left-50px',
            'flex justify-center items-center my-50px sm:py-0 sm:px-30px sm:py-20px'
          )}
        >
          <img src="https://static.rate-x.io/img/v1/7475eb/time-decay-amm.svg" alt="" width={254} />
        </div>
        <div className="relative flex flex-col items-start sm:flex-row px-12px sm:px-30px sm:pl-390px pb-60px">
          <div className="flex flex-col text-#09090A">
            <img
              className="w-30px h-30px sm:mt-60px"
              src="https://static.rate-x.io/img/v1/cc7ca6/amm-1.svg"
              alt=""
            />
            <div className="font-size-36px sm:lh-36px mt-20px sm:mt-28px">Time-Decay AMM</div>
            <div className="text-#09090A4C">
              Synthesized yield token with diminishing potential IL as it approaches expiration
            </div>
            <div className="flex flex-col font-size-15px lh-15px gap-12px mt-30px">
              <div>
                <div
                  className={clsx(
                    'inline-block px-12px py-4px w-auto',
                    'border-1px border-solid border-#2C2D2D rounded-2px',
                    'font-size-13px lh-16px fw-medium'
                  )}
                >
                  Key Features
                </div>
              </div>
              <div className="font-size-15px lh-18px">
                <span className="fw-bold">Time Decay: </span>
                <span>
                  Reduces potential impermanent loss (IL) as contracts approach expiration.
                </span>
              </div>
              <div className="font-size-15px lh-18px">
                <span className="fw-bold">Liquidity Optimization: </span>
                <span>
                  Provides consistent and efficient liquidity for all contracts of the same
                  underlying asset.
                </span>
              </div>
              <div className="font-size-15px lh-18px">
                <span className="fw-bold">Risk Management: </span>
                <span>Time factor reduces IL risk, ensuring a stable trading environment.</span>
              </div>
              <div>
                <div
                  className={clsx(
                    'inline-block px-12px py-4px w-auto mt-18px',
                    'border-1px border-solid border-#2C2D2D rounded-2px',
                    'font-size-13px lh-16px fw-medium'
                  )}
                >
                  How It Works
                </div>
              </div>
              <div className="font-size-15px lh-18px">
                <span className="fw-bold">Auto Adjustment: </span>
                <span>As contracts near expiration, IL decreases, ensuring stable returns.</span>
              </div>
              <div className="font-size-15px lh-18px">
                <span className="fw-bold">Liquidity Optimization: </span>
                <span>
                  Provides consistent and efficient liquidity for all contracts of the same
                  underlying asset.
                </span>
              </div>
              <div>
                <div
                  className={clsx(
                    'inline-block px-12px py-4px w-auto mt-18px',
                    'border-1px border-solid border-#2C2D2D rounded-2px',
                    'font-size-13px lh-16px fw-medium'
                  )}
                >
                  Benefits
                </div>
              </div>
              <div className="font-size-15px lh-18px">
                <span className="fw-bold">Reduced Risk: </span>
                <span>Time decay effectively minimizes IL.</span>
              </div>
              <div className="font-size-15px lh-18px">
                <span className="fw-bold">Increased Returns: </span>
                <span>Optimized liquidity management enhances potential gains.</span>
              </div>
              <div className="font-size-15px lh-18px">
                <span className="fw-bold">User-Friendly: </span>
                <span>Automated operations simplify the trading process.</span>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}
