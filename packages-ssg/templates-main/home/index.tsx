import {Footer} from '@/components/footer';
import {AssetsCategory} from '@/home/AssetsCategory';
import {Banner} from '@/home/Banner';
import {Mechanism} from '@/home/Mechanism';
import {YieldMarket} from '@/home/YieldMarket';
import {YieldSwap} from '@/home/YieldSwap';

export default function () {
  return (
    <>
      <Banner />
      <YieldSwap />
      <YieldMarket />
      <AssetsCategory />
      <Mechanism />
      <div className="mx-auto mt-160px mb-80px px-24px sm:px-0">
        <div className="flex flex-col sm:flex-row items-center w-full sm:w-672px gap-40px sm:gap-80px">
          <img
            className="flex-1"
            src="//static.rate-x.io/img/v1/86ce57/Granted-by.svg"
            alt="solana-foundation"
          />
          <img
            className="flex-1 w-324px"
            src="//static.rate-x.io/img/v1/39a481/solana-fundation.png"
            alt="solana-foundation"
          />
        </div>
      </div>
      {/*<Investors />*/}
      <Footer />
    </>
  );
}
