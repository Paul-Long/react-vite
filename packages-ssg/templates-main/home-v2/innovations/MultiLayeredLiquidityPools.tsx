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
        {/*<div*/}
        {/*  className={clsx(*/}
        {/*    'sm:absolute sm:top-30px sm:left-30px',*/}
        {/*    'flex justify-center items-center my-30px sm:my-0 sm:px-30px sm:py-20px'*/}
        {/*  )}*/}
        {/*>*/}
        {/*  <img*/}
        {/*    src="https://static.rate-x.io/img/v1/0c429f/multi-layered-liquidity-pools.svg"*/}
        {/*    alt=""*/}
        {/*    width={320}*/}
        {/*  />*/}
        {/*</div>*/}
        <div className="relative flex flex-col items-start sm:flex-row sm:px-30px pb-60px">
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
                <span>• Simplified liquidity provision through ULP.</span>
              </div>
              <div className="font-size-15px lh-18px">
                <span>• Fully customized liquidity provision through SLP.</span>
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
                <span>
                  • SLP (Specific Liquidity Provision): SLP positions function similarly to
                  concentrated liquidity pools in Uniswap V3, but with a key difference. Instead of
                  focusing on price ranges, SLPs concentrate liquidity within specific yield ranges.
                </span>
              </div>
              <div className="font-size-15px lh-18px">
                <span>
                  • ULP (Universial Liquidity Provision): The ULP token is designed for ease of use.
                  ULP is a portfolio of SLPs, distributing deposited capital across various pools
                  based on the trading volume and open interests without the need for rebalancing.
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
                <span>
                  • Effortless Fee Earning: ULP tokens offer a convenient way for users to
                  participate in liquidity provision and earn transaction fees. The automated
                  allocation process simplifies the experience, making it accessible to a broader
                  audience.
                </span>
              </div>
              <div className="font-size-15px lh-18px">
                <span>
                  • High-Yield Potential: For sophisticated users, SLPs provide an opportunity to
                  earn significantly higher APRs through concentrated liquidity. By targeting
                  specific yield ranges, users can potentially amplify their returns, though this
                  approach carries greater risk and requires a deeper understanding of the
                  mechanics.
                </span>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}
