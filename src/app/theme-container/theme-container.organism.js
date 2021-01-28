// @flow
// EXTERNAL
import React, { useEffect, Fragment } from "react"; // eslint-disable-line
import { useService } from "@xstate/react";
/** @jsx jsx */
// $FlowIgnore
import { jsx, css } from "@emotion/core"; // eslint-disable-line
import type { Node } from "react";

// DEPENDENCIES
import {
  ThemeContainerStateContext,
  ThemeContainerStateService,
} from "./theme-container.state";
import { getChildrenStateName, getIfExistOnStorage } from "utils/helpers";
import ThemeMenuMolecule from "../authenticated/theme-menu/theme-menu.molecule";

// STYLES
import { themeContainer } from "./theme-container.styles";

type ThemeContainerOrganismProps = {
  children: Node,
};

function ThemeContainerOrganism(props: ThemeContainerOrganismProps): Node {
  const [state, send] = useService(ThemeContainerStateService);

  useEffect(() => {
    send("RENDER");

    const persistedState = getIfExistOnStorage("themeState");

    if (persistedState && typeof persistedState === "string") {
      const newThemeEvent = `CHANGE_TO_${persistedState.toUpperCase()}`;
      send(newThemeEvent);
    }
  }, [send]);

  return (
    <Fragment>
      {state.matches("rendered") ? (
        <div
          css={[themeContainer]}
          className={`${getChildrenStateName(state, "rendered")}-theme`}
        >
          {props.children}

          <ThemeContainerStateContext.Provider value={state}>
            <ThemeMenuMolecule />
          </ThemeContainerStateContext.Provider>
        </div>
      ) : null}
    </Fragment>
  );
}

export default ThemeContainerOrganism;
