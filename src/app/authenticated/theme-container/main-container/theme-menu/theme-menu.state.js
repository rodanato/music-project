// @flow
import { Machine } from "xstate";
import { themes } from "utils/themes";
import type { StateMachine } from "xstate";

export interface ThemeMenuStateSchema {
  states: {
    opened: {},
    closed: {},
  };
}

export type ThemeEvent = { type: string } | { type: "TOGGLE" };

export const ThemeMenuState: StateMachine<
  any,
  ThemeMenuStateSchema,
  ThemeEvent,
  {
    value: any,
    context: any,
  }
> = Machine<any, ThemeMenuStateSchema, ThemeEvent>({
  initial: "closed",
  context: {
    themes: themes.map((theme) => theme.name),
    themeLength: themes[0].colors.length,
  },
  states: {
    opened: {
      on: {
        TOGGLE: "closed",
      },
    },
    closed: {
      on: {
        TOGGLE: "opened",
      },
    },
  },
});
