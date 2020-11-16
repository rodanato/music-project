// @flow
// EXTERNAL
/** @jsx jsx */
// $FlowIgnore
import { jsx, css } from "@emotion/core"; // eslint-disable-line

// DEPENDENCIES
import type { MenuItemProps } from "./menu-item.types";

// STYLES
import { menuItem } from "./menu-item.styles";

function MenuItemAtom({ name }: MenuItemProps) {
  return (
    <div css={[menuItem]} className="mpp-font--text">
      {name}
    </div>
  );
}

export default MenuItemAtom;
