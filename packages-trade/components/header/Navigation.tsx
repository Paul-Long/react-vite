// Navigation.tsx
import {useFixLink} from '@rx/hooks/use-fix-link';
import {router} from '@rx/router';
import {Dropdown} from '@rx/widgets';
import cn from 'classnames';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {styled} from 'styled-components';
import {useMenus} from './state';

const NavContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  height: 60px;
  padding: 0 12px;
  @media (max-width: 640px) {
    display: none;
  }
`;

const Menu = styled.div<{$isVisible: boolean; $selected: boolean}>`
  padding: 10px 32px;
  cursor: pointer;
  white-space: nowrap;
  display: ${({$isVisible}) => ($isVisible ? 'inline-block' : 'none')};
  color: var(--black);

  &.selected {
    background-color: var(--deep-blue);
    color: var(--golden);
    border-radius: 4px;
  }
`;

const DropdownButton = styled.div`
  cursor: pointer;
`;

interface NavigationProps {
  onClick?: (value: any) => void;
}

export const Navigation: React.FC<NavigationProps> = ({onClick}) => {
  const {menus, selected} = useMenus();
  const {fixLink} = useFixLink();
  const [visibleMenus, setVisibleMenus] = useState(menus);
  const navContainerRef = useRef<HTMLDivElement | null>(null);

  const updateMenuVisibility = useCallback(() => {
    if (navContainerRef.current) {
      const containerWidth = navContainerRef.current.offsetWidth;
      if (containerWidth <= 0) {
        return;
      }
      let showWidth = 0;
      const newVisibleMenus = menus.map((menu) => {
        const menuWidth = menu.text.length * 16; // Estimate width (replace with a better measure if possible)
        if (showWidth + menuWidth <= containerWidth) {
          showWidth += menuWidth;
          return {...menu, isHidden: false};
        }
        return {...menu, isHidden: true};
      });
      setVisibleMenus(newVisibleMenus);
    }
  }, [menus]);

  useEffect(() => {
    updateMenuVisibility();
    const resizeObserver = new ResizeObserver(updateMenuVisibility);
    if (navContainerRef.current) {
      resizeObserver.observe(navContainerRef.current as Element);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, [updateMenuVisibility]);

  const handleMenuClick = useCallback(
    (menu: any) => {
      localStorage.setItem('current_page', menu.value);
      onClick?.(menu);
      router.goto(fixLink(menu.pathname));
    },
    [onClick]
  );

  const hiddenMenuList = useMemo(
    () => visibleMenus.filter((menu) => !!menu.isHidden),
    [visibleMenus]
  );

  return (
    <NavContainer ref={navContainerRef}>
      {visibleMenus.map((menu, index) => (
        <Menu
          className={cn('f20 fw700', {selected: menu.value === selected})}
          key={index}
          onClick={() => handleMenuClick(menu)}
          $selected={menu.value === selected}
          $isVisible={!menu.isHidden}
        >
          {menu.text}
        </Menu>
      ))}
      {hiddenMenuList.length > 0 && (
        <Dropdown content={<div></div>}>
          <DropdownButton>More</DropdownButton>
        </Dropdown>
      )}
    </NavContainer>
  );
};
