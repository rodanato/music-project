import { Machine, send } from "xstate";

export const mainMachine = Machine({
  initial: 'green',
  states: {
    blue: {
      on: {
        CHANGE: {
          actions: ["change"]
        }
      }
    },
    green: {
      on: {
        CHANGE: {
          actions: ["change"]
        }
      }
    },
    pink: {
      on: {
        CHANGE: {
          actions: ["change"]
        }
      }
    },
    purple: {
      on: {
        CHANGE: {
          actions: ["change"]
        }
      }
    }
  },
  on: {
    CHANGE_TO_BLUE: {
      target: "blue"
    },
    CHANGE_TO_GREEN: {
      target: "green"
    },
    CHANGE_TO_PINK: {
      target: "pink"
    },
    CHANGE_TO_PURPLE: {
      target: "purple",
    }
  }
}, {
  actions: {
    change: send((ctx, e: any) => ({
        type: `CHANGE_TO_${e.theme.toUpperCase()}`
      })
    )
  }
});
