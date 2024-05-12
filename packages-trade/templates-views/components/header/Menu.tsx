import {useMenus} from '@/components/header/state';
import {useStream} from '@rx/hooks/use-stream';
import {url$} from '@rx/streams/url';
import {Tabs} from '@rx/widgets';
import {useCallback, useEffect} from 'react';

export function Menu() {
  const [url] = useStream(url$);
  const {menus, select, setSelect} = useMenus();

  useEffect(() => {
    const menu = menus.find((m) => {
      if (url.slug === '/') {
        return url.slug === m.value;
      }
      return url?.slug?.startsWith(m.value) && m.value !== '/';
    });
    if (menu) {
      setSelect(menu.value);
    }
  }, [url]);

  const handleChange = useCallback((m: string) => {
    setSelect(m);
  }, []);

  return (
    <div className="flex-1 hidden sm:flex">
      <Tabs
        className="h-60px"
        defaultValue="market"
        options={menus}
        value={select}
        onChange={handleChange}
      />
    </div>
  );
}
