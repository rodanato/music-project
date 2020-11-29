// @flow
// EXTERNAL
import React from "react"; // eslint-disable-line
import type { Node } from "react"; // eslint-disable-line
/** @jsx jsx */
// $FlowIgnore
import { jsx, css } from "@emotion/core"; // eslint-disable-line
import { v4 as uuidv4 } from "uuid";

// DEPENDENCIES
import CardAtom from "shared/card/card.atom";
import MenuItemAtom from "./menu-item/menu-item.atom";

// STYLES
import { menuContainer, menu } from "./menu.styles";

function MenuMolecule({ content }: { content: string[] }): Node {
  return (
    <div css={[menuContainer]} className="mpp-show-slowly">
      <CardAtom paddingLess>
        <div css={[menu]}>
          {content.map((item) => (
            <MenuItemAtom name={item} key={uuidv4()} />
          ))}
        </div>
      </CardAtom>
    </div>
  );
}

export default MenuMolecule;
