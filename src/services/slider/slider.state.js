// @flow
import { Machine } from "xstate";
import { themes } from "config/themes";
import type { StateMachine } from "xstate";

export interface SliderStateSchema {
  states: {
    opened: {},
    closed: {},
  };
}

export type ThemeEvent = { type: string } | { type: "TOGGLE" };

export const SliderState: StateMachine<
  any,
  SliderStateSchema,
  ThemeEvent,
  {
    value: any,
    context: any,
  }
> = Machine<any, SliderStateSchema, ThemeEvent>({
  initial: "started",
  context: {
    themes: themes.map((theme) => theme.name),
    themeLength: themes[0].colors.length,
  },
  states: {
    loading: {
      on: {
        TOGGLE: "started",
      },
    },
    started: {
      on: {
        LOADING: "loading",
      },
    },
  },
});
