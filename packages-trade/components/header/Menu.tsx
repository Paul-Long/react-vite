import {useMenus} from '@/header/state';
import {useFixLink} from '@rx/hooks/use-fix-link';
import {useStream} from '@rx/hooks/use-stream';
import {router} from '@rx/router';
import {url$} from '@rx/streams/url';
import {Tabs} from '@rx/widgets';
import {useCallback, useEffect} from 'react';

export function Menu() {
  const [url] = useStream(url$);
  const {fixLink} = useFixLink();
  const {menus, select, setSelect} = useMenus();

  useEffect(() => {
    const menu = menus.find((m) => m.value === url?.slug);
    if (menu) {
      setSelect(url.slug);
    }
  }, [url]);

  const handleChange = useCallback((m: string) => {
    setSelect(m);
    router.goto(fixLink(m));
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
