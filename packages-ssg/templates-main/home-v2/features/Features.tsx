import {Feature1} from '@/home-v2/features/Feature1';
import {Feature2} from '@/home-v2/features/Feature2';
import {Feature3} from '@/home-v2/features/Feature3';

export function Features() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 sm:flex-row w-full sm:max-w-1341px mx-auto mt-80px">
      <Feature1 showLeft {...items.feature1} index={0} speed="100%"></Feature1>
      <Feature2
        className="border-t-none sm:border-t-1px sm:border-t-solid sm:border-l-none"
        {...items.feature2}
        index={1}
        speed="150%"
      ></Feature2>
      <Feature3
        className="border-t-none sm:border-t-1px sm:border-t-solid sm:border-l-none"
        {...items.feature3}
        index={2}
        speed="200%"
      ></Feature3>
    </div>
  );
}

const items = {
  feature1: {
    title: 'Trade Yield',
    desc: 'Engage in trading future yields to optimize your investment strategy. Whether aiming for profit or hedging against risks, our platform offers flexible trading options based on market trends and personal strategies.',
    mDesc: 'Engage in trading future yields to optimize your investment strategy.',
  },
  feature2: {
    title: 'Create Yield Asset',
    desc: 'Customize yield assets tailored to your needs and market conditions. Create personalized yield assets to diversify and strengthen your investment portfolio, making it more resilient and adaptable.',
    mDesc: 'Customize yield assets tailored to your needs and market conditions.',
  },
  feature3: {
    title: 'Build Strategy Vault',
    desc: 'Enhance your earnings with our Strategy Vaults. These intelligent vaults combine market data and advanced algorithms to help you achieve higher returns and effective risk management.',
    mDesc: 'Enhance your earnings with our Strategy Vaults.',
  },
};
