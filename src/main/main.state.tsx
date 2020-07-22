import { Machine } from "xstate";
import { ThemePaletteState } from "./theme/theme-palette/theme-palette.state";
import React from "react";
import { persistState, getChildrenStateName } from "../utils/helpers";

export interface MainStateSchema {
  states: {
    notrendered: {},
    rendered: {
      states: {
        blue: {};
        green: {};
        light: {};
        pink: {};
        purple: {};
        spotify: {};
      }
    }
  }
};

export type MainEvent =
  | { type: string; }
  | { type: 'CHANGE_TO_BLUE'; }
  | { type: 'CHANGE_TO_GREEN'; }
  | { type: 'CHANGE_TO_PINK'; }
  | { type: 'CHANGE_TO_PURPLE'; };

export const MainState = Machine<any, MainStateSchema, MainEvent>({
  id: 'main',
  initial: 'notrendered',
  invoke: {
    id: 'themePalette',
    src: ThemePaletteState
  },
  states: {
    notrendered: {
      on: {
        RENDER: "rendered"
      }
    },
    rendered: {
      initial: 'green',
      states: {
        blue: {},
        green: {},
        light: {},
        pink: {},
        purple: {},
        spotify: {}
      },
      on: {
        CHANGE_TO_BLUE: {
          target: "rendered.blue",
          actions: ["persist"]
        },
        CHANGE_TO_GREEN: {
          target: "rendered.green",
          actions: ["persist"]
        },
        CHANGE_TO_PINK: {
          target: "rendered.pink",
          actions: ["persist"]
        },
        CHANGE_TO_PURPLE: {
          target: "rendered.purple",
          actions: ["persist"]
        }
      }
    }
  }
}, {
  actions: {
    persist: (ctx, e, actionMeta) => {
      const ParentState = "rendered";
      
      if (actionMeta.state.matches(ParentState)) {
        persistState(getChildrenStateName(actionMeta.state, ParentState))
      }
    }
  }
});

export const MainStateContext = React.createContext<any>(null);
