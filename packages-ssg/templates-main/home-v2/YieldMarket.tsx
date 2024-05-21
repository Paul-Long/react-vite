export function YieldMarket() {
  return (
    <div className="flex flex-col gap-20px w-full sm:max-w-1341px sm:min-w-1341px mx-auto mt-120px sm:mt-160px px-10px sm:px-0 box-border">
      <div className="font-size-24px">Yield Market</div>
      <div className="grid grid-cols-2 sm:grid-cols-4 w-full box-border">
        {markets.map((market) => (
          <Market key={market.title} {...market}></Market>
        ))}
      </div>
    </div>
  );
}

function Market(props: {title: string; yield: string; expireIn: string; images: string[]}) {
  return (
    <div className="flex flex-col p-12px sm:p-30px box-border text-#F6F7F3 border-1px border-solid border-#202424 sm:not-last:border-r-none">
      <div className="flex flex-row items-center gap-8px sm:gap-20px ">
        <div className="flex flex-row items-center">
          {props.images.map((im, i) => (
            <img
              className="min-w-32px h-32px sm:w-40px sm:h-40px last:ml-[-10px]"
              key={im}
              src={im}
              alt={props.title}
            />
          ))}
        </div>
        <div className="font-size-16px lh-16px sm:font-size-20px sm:lh-20px">{props.title}</div>
      </div>
      <div className="font-size-36px lh-26px mt-40px">{props.yield}</div>
      <div className="flex flex-col text-#F6F7F34C mt-20px gap-6px">
        <span>Implied Yield</span>
        <span>Expire in {props.expireIn}</span>
      </div>
    </div>
  );
}

const markets = [
  {
    title: 'SOL Staking',
    yield: '--%',
    expireIn: '226 days',
    images: ['https://static.rate-x.io/img/v1/85589f/SOL.svg'],
  },
  {
    title: 'JitoSOL',
    yield: '--%',
    expireIn: '90 days',
    images: ['https://static.rate-x.io/img/v1/215135/JitoSOL.svg'],
  },
  {
    title: 'JLP',
    yield: '--%',
    expireIn: '302 days',
    images: ['https://static.rate-x.io/img/v1/220737/JLP.svg'],
  },
  {
    title: 'USDT/USDC',
    yield: '--%',
    expireIn: '49 days',
    images: [
      'https://static.rate-x.io/img/v1/9d0ed8/USDT.svg',
      'https://static.rate-x.io/img/v1/d8fc08/USDC.svg',
    ],
  },
];
