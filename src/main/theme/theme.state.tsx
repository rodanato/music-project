import { Machine } from "xstate";
import { themes } from "../../utils/themes";

export const ThemeState = Machine({//TODO: Rename all machines names to use state word
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
