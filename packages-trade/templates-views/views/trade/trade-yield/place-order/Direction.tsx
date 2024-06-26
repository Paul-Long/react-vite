import {LongIcon} from '@rx/components/icons/LongIcon';
import {ShortIcon} from '@rx/components/icons/ShortIcon';
import {useLang} from '@rx/hooks/use-lang';
import {lang} from '@rx/lang/trade.lang';
import {Tooltip} from '@rx/widgets';
import {clsx} from 'clsx';

export function Direction(props: FormItemProps) {
  const {value, onChange} = props;
  const {LG} = useLang();
  return (
    <div className="w-full flex flex-row items-center gap-10px px-20px mt-16px">
      <Tooltip className="text-nowrap" text="Long YT, Profit from rising yield" placement="topLeft">
        <div
          className={clsx(
            'flex-1 box-border rounded-2px flex flex-row items-center flex-nowrap text-nowrap px-10px justify-center gap-8px cursor-pointer',
            [
              value === 'LONG'
                ? 'bg-gray-10 py-13px'
                : 'py-12px border-1px border-solid border-#2C2D2D',
            ]
          )}
          onClick={() => onChange?.('LONG')}
        >
          <LongIcon color={value === 'LONG' ? '#8DCC2F' : '#F6F7F399'} />
          {LG(lang.LongYieldFloater)}
        </div>
      </Tooltip>
      <Tooltip
        className="text-nowrap"
        text="Short YT, Profit from falling yield"
        placement="topRight"
      >
        <div
          className={clsx(
            'flex-1 box-border rounded-2px flex flex-row items-center flex-nowrap text-nowrap px-10px justify-center gap-8px cursor-pointer',
            [
              value === 'SHORT'
                ? 'bg-gray-10 py-13px'
                : 'py-12px border-1px border-solid border-#2C2D2D',
            ]
          )}
          onClick={() => onChange?.('SHORT')}
        >
          <ShortIcon color={value === 'SHORT' ? '#EC404A' : '#F6F7F399'} />
          {LG(lang.ShortYieldFixer)}
        </div>
      </Tooltip>
    </div>
  );
}
