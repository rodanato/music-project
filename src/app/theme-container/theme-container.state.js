// @flow
import { Machine, interpret } from "xstate";
import { ThemePaletteState } from "../authenticated/theme-menu/theme-palette/theme-palette.state";
import { ThemeMenuState } from "../authenticated/theme-menu/theme-menu.state";
import React from "react";
import { persistState, getChildrenStateName } from "utils/helpers";
import type { Context } from "react";
import DatabaseService from "services/database.service";

export interface ThemeContainerStateSchema {
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

export type ThemeContainerEvent =
  | { type: string }
  | { type: "CHANGE_TO_DARK" }
  | { type: "CHANGE_TO_BLUE" }
  | { type: "CHANGE_TO_GREEN" }
  | { type: "CHANGE_TO_PINK" }
  | { type: "CHANGE_TO_PURPLE" };

// $FlowFixMe
export const ThemeContainerState: StateMachine<
  any,
  ThemeContainerStateSchema,
  ThemeContainerEvent,
  {
    value: any,
    context: any,
  }
> = Machine<any, ThemeContainerStateSchema, ThemeContainerEvent>(
  {
    id: "themeContainer",
    initial: "notrendered",
    invoke: [
      { id: "themePalette", src: ThemePaletteState },
      { id: "themeMenu", src: ThemeMenuState },
    ],
    states: {
      notrendered: {
        on: {
          RENDER: "rendered",
        },
      },
      rendered: {
        initial: "dark",
        states: {
          dark: {},
          blue: {},
          green: {},
          light: {},
          pink: {},
          purple: {},
          spotify: {},
        },
        on: {
          CHANGE_TO_DARK: {
            target: "rendered.dark",
            actions: ["persist"],
          },
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
        const newTheme = getChildrenStateName(actionMeta.state, ParentState);

        if (actionMeta.state.matches(ParentState)) {
          persistState("themeState", newTheme);

          const databaseService = DatabaseService.getInstance();
          databaseService.updateProfileOnDB("theme", newTheme);
        }
      },
    },
  }
);

export const ThemeContainerStateService = interpret(ThemeContainerState);
ThemeContainerStateService.start();

export const ThemeContainerStateContext: Context<any> = React.createContext<any>(
  null
);
