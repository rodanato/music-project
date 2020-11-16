// @flow
// EXTERNAL
import React, { Fragment, useContext, useEffect } from "react"; // eslint-disable-line
/** @jsx jsx */
// $FlowIgnore
import { jsx, css } from "@emotion/core";
import { v4 as uuidv4 } from "uuid";
import { useService } from "@xstate/react";

// DEPENDENCIES
import { MainStateContext } from "../../main.state";
import { getChildrenStateName } from "../../../../utils/helpers";

// STYLES
import {
  paletteItem,
  paletteTitle,
  paletteColors,
  paletteColor,
} from "./theme-palette.styles";
import type { ThemePaletterProps } from "./theme-palette.types";

function ThemePaletteAtom({ name }: ThemePaletterProps) {
  const mainState = useContext(MainStateContext);
  const [, send] = useService(mainState.children.themePalette);
  const [themeState] = useService(mainState.children.themes);
  const colorsPerPalette = new Array(themeState.context.themeLength).fill(1);

  useEffect(() => {
    const ParentState = "rendered";

    if (mainState.matches(ParentState)) {
      const currentColorSelected = getChildrenStateName(mainState, ParentState);
      if (currentColorSelected !== name) send("UNSELECT");
    }
  }, [mainState, name, send]);

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
