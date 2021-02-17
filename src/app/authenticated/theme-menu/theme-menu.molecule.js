// @flow
// EXTERNAL
import React from "react"; // eslint-disable-line
import type { Node } from "react"; // eslint-disable-line
/** @jsx jsx */
// $FlowIgnore
import { jsx, css } from "@emotion/core"; // eslint-disable-line
import classNames from "classnames";
import { v4 as uuidv4 } from "uuid";
import { useMachine } from "@xstate/react";

// DEPENDENCIES
import { ThemeMenuState } from "./theme-menu.state";
import CardAtom from "shared/components/card/card.atom";
import ThemePaletteAtom from "./theme-palette/theme-palette.atom";

// STYLES
import { themeMenu, themeMenuOptions, palettesList } from "./theme-menu.styles";

function ThemeMolecule(): Node {
  const [state, send] = useMachine(ThemeMenuState);

  const ThemeOptionsClasses = classNames({
    "mpp-open-menu-animation": true,
    "is-open": state.matches("opened"),
  });

  return (
    <div css={[themeMenu]}>
      <i className="material-icons" onClick={() => send("TOGGLE")}>
        brush
      </i>

      <div css={[themeMenuOptions]} className={ThemeOptionsClasses}>
        <CardAtom>
          <ul css={[palettesList]}>
            {state.context.themes.map((theme: string) => (
              <ThemePaletteAtom key={uuidv4()} name={theme}></ThemePaletteAtom>
            ))}
          </ul>
        </CardAtom>
      </div>
    </div>
  );
}

export default ThemeMolecule;
