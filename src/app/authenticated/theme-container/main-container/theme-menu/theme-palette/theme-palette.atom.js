// @flow
// EXTERNAL
import React, { Fragment, useContext, useEffect } from "react"; // eslint-disable-line
import type { Node } from "react"; // eslint-disable-line
/** @jsx jsx */
// $FlowIgnore
import { jsx, css } from "@emotion/core"; // eslint-disable-line
import { v4 as uuidv4 } from "uuid";
import { useService } from "@xstate/react";

// DEPENDENCIES
import { ThemeContainerStateContext } from "../../../theme-container.state";
import { getChildrenStateName } from "utils/helpers";

// STYLES
import {
  paletteItem,
  paletteTitle,
  paletteColors,
  paletteColor,
} from "./theme-palette.styles";
import type { ThemePaletterProps } from "./theme-palette.types";

function ThemePaletteAtom({ name }: ThemePaletterProps): Node {
  const themeState = useContext(ThemeContainerStateContext);
  const [, send] = useService(themeState.children.themePalette);
  const [themeMenuState] = useService(themeState.children.themeMenu);
  const colorsPerPalette = new Array(themeMenuState.context.themeLength).fill(
    1
  );

  useEffect(() => {
    const ParentState = "rendered";

    if (themeState.matches(ParentState)) {
      const currentColorSelected = getChildrenStateName(
        themeState,
        ParentState
      );
      if (currentColorSelected !== name) send("UNSELECT");
    }
  }, [themeState, name, send]);

  return (
    <Fragment>
      <li css={[paletteItem]} onClick={() => send("SELECT", { theme: name })}>
        <div css={[paletteColors]} className={`${name}-theme`}>
          {colorsPerPalette.map(() => (
            <span key={uuidv4()} css={[paletteColor]}></span>
          ))}
        </div>
        <span css={[paletteTitle]}>{name} Palette</span>
      </li>
    </Fragment>
  );
}

export default ThemePaletteAtom;
