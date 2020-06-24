import { Machine } from "xstate";

export const themeMachine = Machine({
  initial: 'closed',
  context: {
    themes: [
      "blue",
      "green",
      "light",
      "pink",
      "purple",
      "spotify"
    ]
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
