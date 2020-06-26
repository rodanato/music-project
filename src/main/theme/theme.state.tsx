import { Machine } from "xstate";
import { themes } from "../../utils/themes";

export const themeMachine = Machine({
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
