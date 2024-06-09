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
    title: 'Margin Yield Trading',
    desc: "Trade futures and uncertain yields with leverage. Whether you're aiming for profit or hedging against risks, we offer capital efficiency and low slippage for you.",
    mDesc: 'Trade futures and uncertain yields with leverage.',
  },
  feature2: {
    title: 'Synth Yield Asset',
    desc: 'Create market-driven yield-bearing assets with synthetic YT. Customize your risk-return profile and build the assets you need.',
    mDesc:
      'Create market-driven yield-bearing assets with synthetic YT. Customize your risk-return profile and build the assets you need.',
  },
  feature3: {
    title: 'Fix & Enhanced Vaults',
    desc: 'Build fixed return or yield-enhancement vaults by combining yield-bearing assets and yield derivatives. This approach maximizes principal protection while delivering high and stable returns.',
    mDesc:
      'Build fixed income or yield-enhancement vaults  for high, stable returns with maximum principal protection.',
  },
};
