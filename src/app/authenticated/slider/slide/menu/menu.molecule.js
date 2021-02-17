// @flow

// EXTERNAL
import React from "react"; // eslint-disable-line
import type { Node } from "react"; // eslint-disable-line
/** @jsx jsx */
// $FlowIgnore
import { jsx, css } from "@emotion/core"; // eslint-disable-line
import { v4 as uuidv4 } from "uuid";

// DEPENDENCIES
import CardAtom from "shared/components/card/card.atom";
import MenuItemAtom from "./menu-item/menu-item.atom";

// STYLES
import { menuContainer, menu } from "./menu.styles";

function MenuMolecule({ content }: { content: string[] }): Node {
  return (
    <div css={[menuContainer]} className="mpp-show-slowly">
      <CardAtom paddingLess>
        <nav css={[menu]}>
          {content.map((item) => (
            <MenuItemAtom name={item} key={uuidv4()} />
          ))}
        </nav>
      </CardAtom>
    </div>
  );
}

export default MenuMolecule;
