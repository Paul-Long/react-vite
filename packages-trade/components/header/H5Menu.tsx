import {useMenus} from '@/header/state';
import {useFixLink} from '@rx/hooks/use-fix-link';
import {router} from '@rx/router';
import {Drawer} from '@rx/widgets';
import {useCallback, useState} from 'react';
import {css, styled} from 'styled-components';

const StyledWrap = styled.div`
  @media (min-width: 640px) {
    display: none;
  }
`;

const StyledMenuWrap = styled.div``;

const StyledMenuItem = styled.div<{$selected: boolean}>`
  padding: 18px 48px;
  ${({$selected}) => {
    if ($selected) {
      return css`
        color: var(--black);
        background: var(--golden);
      `;
    }
    return css`
      color: var(--light-gray);
    `;
  }}
`;

export function H5Menu() {
  const [open, setOpen] = useState(false);
  const {fixLink} = useFixLink();
  const {menus, selected} = useMenus();

  const handleMenuClick = useCallback((menu: any) => {
    localStorage.setItem('current_page', menu.value);
    router.goto(fixLink(menu.pathname));
  }, []);
  return (
    <>
      <StyledWrap onClick={() => setOpen(true)}>
        <i className="iconfont font-size-24px T1">&#xe607;</i>
      </StyledWrap>
      <Drawer open={open} onClose={() => setOpen(false)}>
        <StyledMenuWrap className="w100% df fdc gap12px pt100px">
          {menus.map((m) => (
            <StyledMenuItem
              key={m.value}
              $selected={selected === m.value}
              className="w100% font-size-18px fw700"
              onClick={() => handleMenuClick(m)}
            >
              {m.text}
            </StyledMenuItem>
          ))}
        </StyledMenuWrap>
      </Drawer>
    </>
  );
}
