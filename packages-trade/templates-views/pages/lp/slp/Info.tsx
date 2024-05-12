import {useLang} from '@rx/hooks/use-lang';
import {lang} from '@rx/lang/lp.lang';

export function Info() {
  const {LG} = useLang();
  return (
    <div className="grid grid-cols-3 p-24px gap-32px rounded-8px bg-gray-40">
      <div className="flex flex-col gap-8px">
        <div className="text-gray-600">{LG(lang.Pool)}</div>
        <div className="text-white">mSOL-ULP</div>
      </div>
      <div className="flex flex-col gap-8px">
        <div className="text-gray-600">{LG(lang.Maturity)}</div>
        <div className="text-white">2025-12-28</div>
      </div>
      <div className="flex flex-col gap-8px">
        <div className="text-gray-600">{LG(lang.ExpireIn)}</div>
        <div className="text-white">350 days</div>
      </div>
      <div className="flex flex-col gap-8px">
        <div className="text-gray-600">{LG(lang.ULPPrice)}</div>
        <div className="text-#FFD166 font-size-18px">1.03SOL</div>
        <span>$10.56</span>
      </div>
      <div className="flex flex-col gap-8px">
        <div className="text-gray-600">{'7d Volume'}</div>
        <div className="text-#FFD166 font-size-18px">1.03SOL</div>
        <span>$10.56</span>
      </div>
    </div>
  );
}
