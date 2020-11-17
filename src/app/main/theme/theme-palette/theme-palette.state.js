// @flow
import { Machine, sendParent } from "xstate";
import type { StateMachine } from "xstate";

type SetPaletteEvent = { theme: string };

export interface ThemePaletteStateSchema {
  states: {
    selected: {},
    unselected: {},
  };
}

export type ThemePaletteEvent =
  | { type: string }
  | { type: "SELECT" }
  | { type: "UNSELECT" };

const ThemePaletteState: StateMachine<
  any,
  ThemePaletteStateSchema,
  ThemePaletteEvent,
  {
    value: any,
    context: any,
  }
> = Machine<any, ThemePaletteStateSchema, ThemePaletteEvent>(
  {
    id: "themePalette",
    initial: "unselected",
    states: {
      selected: {
        on: {
          UNSELECT: "unselected",
        },
      },
      unselected: {
        on: {
          SELECT: {
            target: "selected",
            actions: ["setPalette"],
          },
        },
      },
    },
  },
  {
    actions: {
      setPalette: sendParent((_ctx, e: SetPaletteEvent) => ({
        type: `CHANGE_TO_${e.theme.toUpperCase()}`,
      })),
    },
  }
);

export { ThemePaletteState };
