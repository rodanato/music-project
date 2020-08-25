// @flow
import { Machine } from "xstate";
import { themes } from "../../utils/themes";

export interface ThemeStateSchema {
  states: {
    opened: {},
    closed: {}
  }
};

export type ThemeEvent =
  | { type: string; }
  | { type: 'TOGGLE'; }

export const ThemeState = Machine<any, ThemeStateSchema, ThemeEvent>({
  initial: 'closed',
  context: {
    themes: themes.map(theme => theme.name)
  },
  states: {
    opened: {
      on: {
        TOGGLE: "closed"
      }
    },
    closed: {
      on: {
        TOGGLE: "opened"
      }
    }
  },
});
