// @flow
import { Machine } from "xstate";
import { themes } from "utils/themes";
import type { StateMachine } from "xstate";

export interface ThemeStateSchema {
  states: {
    opened: {},
    closed: {},
  };
}

export type ThemeEvent = { type: string } | { type: "TOGGLE" };

export const ThemeState: StateMachine<
  any,
  ThemeStateSchema,
  ThemeEvent,
  {
    value: any,
    context: any,
  }
> = Machine<any, ThemeStateSchema, ThemeEvent>({
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
