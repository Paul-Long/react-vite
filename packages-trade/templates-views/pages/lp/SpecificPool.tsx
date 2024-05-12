import {IMAGES} from '@/pages/lp/const';
import {useFixLink} from '@rx/hooks/use-fix-link';
import {useLang} from '@rx/hooks/use-lang';
import {lang} from '@rx/lang/lp.lang';
import {clsx} from 'clsx';
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';

export function SpecificPool() {
  const {LG} = useLang();
  const {fixLink} = useFixLink();
  const navigate = useNavigate();
  const [select, setSelect] = useState('mSOL');
  return (
    <div className="flex flex-col mt-38px">
      <div className="font-size-16px lh-20px fw-semibold">{LG(lang.SpecificLiquidityPool)}</div>
      <div className="grid grid-cols-5">
        <div className="contents font-size-14px lh-20px text-gray-600 py-10px">
          <div className="py-10px pl-18px">{LG(lang.Pool)}</div>
          <div className="py-10px text-center">{LG(lang.APR)}</div>
          <div className="py-10px text-center">{LG(lang.RLPToken)}</div>
          <div className="py-10px text-right">{LG(lang.RLPTokenValue)}</div>
          <div className="py-10px pr-32px text-right">{LG(lang.TVL)}</div>
        </div>
        <div className="contents group cursor-default" onClick={() => navigate(fixLink('/lp/slp'))}>
          <div
            className={clsx(
              'flex flex-row gap-12px py-20px pl-18px rounded-l-8px group-hover:bg-gray-80'
            )}
          >
            <img src={IMAGES.JITOSOL} alt="" width={28} height={28} />
            <div className="flex flex-col">
              <span className="font-size-14px lh-20px">mSOL-ULP</span>
              <div className="flex flex-row items-center gap-4px">
                <span className="text-gray-400">Wallet: </span>
                <span className="text-gray-600">$500.00</span>
              </div>
            </div>
          </div>
          <div
            className={clsx(
              'text-green-500 py-20px flex justify-center items-center font-size-16px lh-20px fw-semibold group-hover:bg-gray-80'
            )}
          >
            8.43%
          </div>
          <div
            className={clsx(
              'flex justify-center items-center py-20px text-center group-hover:bg-gray-80'
            )}
          >
            RLP-mSOL
          </div>
          <div className={clsx('flex justify-right py-20px group-hover:bg-gray-80')}>
            <div className="inline-flex flex-col items-end">
              <span>1.052848 SOL</span>
              <span className="text-gray-600">$500.00</span>
            </div>
          </div>
          <div
            className={clsx(
              'flex flex-col justify-center items-end py-20px pr-32px rounded-r-8px group-hover:bg-gray-80'
            )}
          >
            <span>25.00 SOL</span>
            <span className="text-gray-600">$45.56</span>
          </div>
        </div>
      </div>
    </div>
  );
}
