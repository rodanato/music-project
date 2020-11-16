// @flow
// EXTERNAL
import React from "react"; // eslint-disable-line
/** @jsx jsx */
// $FlowIgnore
import { jsx, css } from "@emotion/core";

// DEPENDENCIES
import CardAtom from "../../../../shared/card/card.atom";
import MenuItemAtom from "./menu-item/menu-item.atom";

// STYLES
import { menuContainer, menu } from "./menu.styles";

function MenuMolecule() {
  return (
    <div css={[menuContainer]} className="mpp-show-slowly">
      <CardAtom paddingLess>
        <div css={[menu]}>
          <MenuItemAtom name="Albums" />
          <MenuItemAtom name="Artists" />
          <MenuItemAtom name="Songs" />
        </div>
      </CardAtom>
    </div>
  );
}

export default MenuMolecule;
