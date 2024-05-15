import {useMenus} from '@/components/header/state';
import {useLang} from '@rx/hooks/use-lang';
import {lang} from '@rx/lang/home';
import {Button} from '@rx/widgets';

export function Menu() {
  const {LG} = useLang();
  const {menus} = useMenus();
  return (
    <div className="hidden lg:flex lg:items-center lg:gap-x-12">
      {menus.map((m) => (
        <div key={m.key} className="relative">
          <div className="group relative flex items-center gap-x-1 font-size-18px font-medium leading-6 text-gray-600 hover:text-white cursor-pointer">
            {m.title}
            {m.children && (
              <i className="iconfont font-size-10px transition-transform transform-rotate-90deg group-hover:transform-rotate-[-90deg]">
                &#xe63c;
              </i>
            )}
            {m.children && (
              <div className="hidden group-hover:flex absolute -left-8 top-20px pt-16px w-auto z-10 max-w-none overflow-hidden ">
                <div className="p-16px font-size-16px text-gray-600 flex flex-col gap-16px rounded-8px bg-#b7ffe10a shadow-lg ring-1 ring-gray-900/5">
                  {m.children?.map((cm) => (
                    <div
                      key={cm.key}
                      className="flex-auto text-nowrap font-light hover:text-white cursor-pointer"
                    >
                      {cm.title}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
      <Button type="primary">{LG(lang.LaunchApp)}</Button>
    </div>
  );
}
