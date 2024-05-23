import {Modal} from '@/home-v2/innovations/Modal';
import {clsx} from 'clsx';

export function MultiLayeredLiquidityPools(props: {
  inline?: boolean;
  show: string;
  onShow: (v: string) => void;
}) {
  return (
    <>
      <div className="flex flex-col py-20px px-12px sm:p-30px border-1px border-solid border-#202424 border-t-none border-l-none">
        <img
          className="w-30px h-30px"
          src="https://static.rate-x.io/img/v1/7a69ba/amm-3.svg"
          alt=""
        />
        <div className="font-size-20px lh-20px mt-28px">Multi-Layered Liquidity Pools</div>
        <div className="font-size-15px lh-15px text-#09090A4C mt-6px">
          Simultaneously provide liquidity for all the contracts with same underlying asset
        </div>
        <div
          className="font-size-15px lh-15px text-#09090A mt-12px cursor-pointer"
          onClick={() => props.onShow('modal-3')}
        >
          Learn more
        </div>
      </div>
      <Modal
        visible={props.show === 'modal-3'}
        onClose={() => props.onShow('')}
        inline={!!props.inline}
      >
        <div
          className={clsx(
            'sm:absolute sm:top-30px sm:left-30px',
            'flex justify-center items-center my-30px sm:my-0 sm:px-30px sm:py-20px'
          )}
        >
          <img
            src="https://static.rate-x.io/img/v1/0c429f/multi-layered-liquidity-pools.svg"
            alt=""
            width={320}
          />
        </div>
        <div className="relative flex flex-col items-start sm:flex-row sm:px-30px sm:pl-390px pb-60px">
          <div className="flex flex-col text-#09090A px-12px sm:px-0">
            <img
              className="w-30px h-30px sm:mt-60px"
              src="https://static.rate-x.io/img/v1/7a69ba/amm-3.svg"
              alt=""
            />
            <div className="sm:font-size-36px sm:lh-36px sm:mt-28px">
              Multi-Layered Liquidity Pools
            </div>
            <div className="text-#09090A4C">
              Simultaneously provide liquidity for all the contracts with same underlying asset
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
                <span className="fw-bold">Layered Liquidity: </span>
                <span>
                  Multiple pools offer support for different contract types, enhancing flexibility.
                </span>
              </div>
              <div className="font-size-15px lh-18px">
                <span className="fw-bold">Dynamic Allocation: </span>
                <span>Liquidity is allocated efficiently across layers based on demand.</span>
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
                <span className="fw-bold">Flexible Distribution: </span>
                <span>
                  Liquidity is dynamically spread across various layers to meet market needs.
                </span>
              </div>
              <div className="font-size-15px lh-18px">
                <span className="fw-bold">Scalable Support: </span>
                <span>
                  Adapts to changing market conditions, ensuring robust liquidity for all contracts.
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
                <span className="fw-bold">Flexibility: </span>
                <span>Accommodates various contract needs with robust support.</span>
              </div>
              <div className="font-size-15px lh-18px">
                <span className="fw-bold">Efficiency: </span>
                <span>Maximizes liquidity usage, optimizing returns.</span>
              </div>
              <div className="font-size-15px lh-18px">
                <span className="fw-bold">Scalability: </span>
                <span>Grows with market demand, maintaining liquidity and stability.</span>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}
