import { Machine } from "xstate";
import { themePaletteMachine } from "./theme/theme-palette.state";
import React from "react";

export interface MainStateSchema {
  states: {
    blue: {};
    green: {};
    pink: {};
    purple: {};
  }
};

export type MainEvent =
  | { type: ''; theme: string }
  | { type: 'CHANGE_TO_BLUE'; theme: string }
  | { type: 'CHANGE_TO_GREEN'; theme: string }
  | { type: 'CHANGE_TO_PINK'; theme: string }
  | { type: 'CHANGE_TO_PURPLE'; theme: string };

export const mainMachine = Machine<any, MainStateSchema, MainEvent>({
  id: 'main',
  initial: 'green',
  invoke: {
    id: 'themePalette',
    src: themePaletteMachine
  },
  states: {
    blue: {},
    green: {},
    pink: {},
    purple: {}
  },
  on: {
    CHANGE_TO_BLUE: {
      target: "blue"
    },
    CHANGE_TO_GREEN: {
      target: "green"
    },
    CHANGE_TO_PINK: {
      target: "pink"
    },
    CHANGE_TO_PURPLE: {
      target: "purple"
    }
  }
});

export const MainStateContext = React.createContext<any>(null);
