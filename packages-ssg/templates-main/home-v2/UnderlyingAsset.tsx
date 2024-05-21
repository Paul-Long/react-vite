export function UnderlyingAsset() {
  return (
    <div className="flex flex-col gap-20px w-full sm:max-w-1341px sm:min-w-1341px mx-auto mt-60px sm:mt-80px px-10px sm:px-0">
      <div className="font-size-24px">Underlying Asset</div>
      <div className="grid grid-cols-2 sm:grid-cols-5">
        {assets.map((asset) => (
          <Asset key={asset.title} {...asset}></Asset>
        ))}
      </div>
    </div>
  );
}

function Asset(props: {title: string; desc: string; images: string[]}) {
  return (
    <div className="flex flex-col p-12px sm:p-30px box-border text-#F6F7F3 border-1px border-solid border-#202424 sm:not-last:border-r-none">
      <div className="flex flex-row items-center gap-20px font-size-20px lh-20px">
        <div className="flex flex-row items-center">
          {props.images.map((im, i) => (
            <img className="w-54px h-54px opacity-30" key={im} src={im} alt={props.title} />
          ))}
        </div>
      </div>
      <div className="font-size-16px lh-16px sm:font-size-20px text-#F6F7F3 sm:lh-20px mt-20px sm:mt-30px">
        {props.title}
      </div>
      <div className="flex flex-col text-#F6F7F34C mt-8px sm:mt-20px gap-6px">
        <span>{props.desc}</span>
      </div>
    </div>
  );
}

const assets = [
  {
    title: 'Liquid Statking',
    desc: 'Flexible earnings with liquid assets.',
    images: ['https://static.rate-x.io/img/v1/298ec1/liquid-staking.svg'],
  },
  {
    title: 'LP Token',
    desc: 'Share rewards from liquidity pools.',
    images: ['https://static.rate-x.io/img/v1/17a53a/lp-token.png'],
  },
  {
    title: 'Stables',
    desc: 'Stable value with secure assets.',
    images: ['https://static.rate-x.io/img/v1/22f642/stables.svg'],
  },
  {
    title: 'Cross-Chain Asset',
    desc: 'Seamless transfer across chains.',
    images: ['https://static.rate-x.io/img/v1/fabf22/cross-chain-asset.svg'],
  },
  {
    title: 'DePin',
    desc: 'Decentralized network infrastructure.',
    images: ['https://static.rate-x.io/img/v1/952a7e/depin.svg'],
  },
];
