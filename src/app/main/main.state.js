// @flow
import { Machine } from "xstate";
import { ThemePaletteState } from "./theme/theme-palette/theme-palette.state";
import { ThemeState } from "./theme/theme.state";
import React from "react";
import { persistState, getChildrenStateName } from "../../utils/helpers";
import type { Context } from "react";

export interface MainStateSchema {
  states: {
    notrendered: {},
    rendered: {
      states: {
        blue: {},
        green: {},
        light: {},
        pink: {},
        purple: {},
        spotify: {},
      },
    },
  };
}

export type MainEvent =
  | { type: string }
  | { type: "CHANGE_TO_BLUE" }
  | { type: "CHANGE_TO_GREEN" }
  | { type: "CHANGE_TO_PINK" }
  | { type: "CHANGE_TO_PURPLE" };

// $FlowFixMe
export const MainState = Machine<any, MainStateSchema, MainEvent>(
  {
    id: "main",
    initial: "notrendered",
    invoke: [
      { id: "themePalette", src: ThemePaletteState },
      { id: "themes", src: ThemeState },
    ],
    states: {
      notrendered: {
        on: {
          RENDER: "rendered",
        },
      },
      rendered: {
        initial: "green",
        states: {
          blue: {},
          green: {},
          light: {},
          pink: {},
          purple: {},
          spotify: {},
        },
        on: {
          CHANGE_TO_BLUE: {
            target: "rendered.blue",
            actions: ["persist"],
          },
          CHANGE_TO_GREEN: {
            target: "rendered.green",
            actions: ["persist"],
          },
          CHANGE_TO_PINK: {
            target: "rendered.pink",
            actions: ["persist"],
          },
          CHANGE_TO_PURPLE: {
            target: "rendered.purple",
            actions: ["persist"],
          },
        },
      },
    },
  },
  {
    actions: {
      persist: (ctx, e, actionMeta) => {
        const ParentState = "rendered";

        if (actionMeta.state.matches(ParentState)) {
          persistState(getChildrenStateName(actionMeta.state, ParentState));
        }
      },
    },
  }
);

export const MainStateContext: Context<any> = React.createContext<any>(null);
