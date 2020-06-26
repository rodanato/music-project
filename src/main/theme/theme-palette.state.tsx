import { Machine, sendParent, EventObject } from "xstate";

type SetPaletteEvent = EventObject & { theme: string };

export const themePaletteMachine = Machine({
  id: 'themePalette',
  initial: 'unselected',
  states: {
    selected: {},
    unselected: {
      on: {
        SELECT: {
          target: "selected",
          actions: ["setPalette"]
        }
      }
    }
  },
}, {
  actions: {
    setPalette: sendParent((_ctx, e: SetPaletteEvent) => ({
      type: `CHANGE_TO_${e.theme.toUpperCase()}`
    }))
  }
});
