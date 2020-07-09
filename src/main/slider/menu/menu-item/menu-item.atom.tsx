// EXTERNAL
/** @jsx jsx */
import { jsx, css } from '@emotion/core'; // eslint-disable-line

// DEPENDENCIES
import { MenuItemProps } from './menu-item.types';

// STYLES
import { menuItem } from './menu-item.styles';


function MenuItemAtom({ name }: MenuItemProps) {
  return (
    <div css={[menuItem]} className="mpp-font--text">{name}</div>
  );
}

export default MenuItemAtom;