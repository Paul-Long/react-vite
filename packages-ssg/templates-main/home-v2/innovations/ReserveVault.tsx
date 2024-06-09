import {Modal} from '@/home-v2/innovations/Modal';
import {clsx} from 'clsx';

export function ReserveVault(props: {inline?: boolean; show: string; onShow: (v: string) => void}) {
  return (
    <>
      <div className="flex flex-col py-20px px-12px sm:p-30px border-1px border-solid border-#202424 border-t-none">
        <img
          className="w-30px h-30px"
          src="https://static.rate-x.io/img/v1/925077/amm-2.svg"
          alt=""
        />
        <div className="font-size-20px lh-20px mt-28px">Reserve Vault</div>
        <div className="font-size-15px lh-15px text-#09090A4C mt-6px">
          Acting as the yield source, it retains the yield of deposited underlying assets and
          ensures the yield distribution to YT holders.
        </div>
        <div
          className="font-size-15px lh-15px text-#09090A mt-12px cursor-pointer"
          onClick={() => props.onShow('modal-2')}
        >
          Learn more
        </div>
      </div>
      <Modal
        visible={props.show === 'modal-2'}
        onClose={() => props.onShow('')}
        inline={!!props.inline}
      >
        {/*<div*/}
        {/*  className={clsx(*/}
        {/*    'sm:absolute sm:top-30px sm:left-30px',*/}
        {/*    'flex justify-center items-center my-30px sm:my-0 sm:px-30px sm:py-20px'*/}
        {/*  )}*/}
        {/*>*/}
        {/*  <img src="https://static.rate-x.io/img/v1/13bccf/reserve_vault.svg" alt="" width={320} />*/}
        {/*</div>*/}
        <div className="relative flex flex-col items-start sm:flex-row sm:px-30px pb-60px">
          <div className="flex flex-col text-#09090A px-12px sm:px-0">
            <img
              className="w-30px h-30px sm:mt-60px"
              src="https://static.rate-x.io/img/v1/925077/amm-2.svg"
              alt=""
            />
            <div className="font-size-36px lh-36px mt-20px sm:mt-28px">Reserve Vault</div>
            <div className="text-#09090A4C">
              Acting as the yield source, it retains the yield of deposited underlying assets and
              ensures the yield distribution to YT holders.
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
                <span>• Yield source of synthetic YT minted.</span>
              </div>
              <div className="font-size-15px lh-18px">
                <span>• Rebalance counterpart to the AMM.</span>
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
                  • When underlying assets are deposited into the Reserve Vault, a corresponding
                  amount of YT and ST are minted. The amount of ST is automatically rebased
                  according to the actual APY of the underlying assets.
                </span>
              </div>
              <div className="font-size-15px lh-18px">
                <span>
                  • When the yield of the underlying asset is received, the Reserve Vault
                  automatically streams the yield to YT holders.
                </span>
              </div>
              <div className="font-size-15px lh-18px">
                <span>
                  • The Reserve Vault works as a counterpart to the AMM to facilitate the
                  auto-rebalancing mechanism.
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
                  • Ensures the value of ST equals to the amount of underlying assets deposited.
                </span>
              </div>
              <div className="font-size-15px lh-18px">
                <span>
                  • Ensures the holder of YT receives the streamed yield from the deposited
                  underlying assets.
                </span>
              </div>
              <div className="font-size-15px lh-18px">
                <span>
                  • Supports the AMM's rebalancing mechanism, which is essential for accommodating
                  the time-decay feature of YT.
                </span>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}
