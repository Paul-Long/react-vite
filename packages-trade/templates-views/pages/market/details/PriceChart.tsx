import {useLang} from '@rx/hooks/use-lang';
import {lang} from '@rx/lang/dashboard.lang';

export function PriceChart() {
  const {LG} = useLang();
  return (
    <div className="flex flex-col">
      <span>{LG(lang.PriceChart)}</span>
    </div>
  );
}
