// @flow
import { Machine, sendParent, EventObject } from "xstate";

type SetPaletteEvent = EventObject & { theme: string };

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

export const ThemePaletteState = Machine<
  any,
  ThemePaletteStateSchema,
  ThemePaletteEvent
>(
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
