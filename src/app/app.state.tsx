import { Machine } from "xstate";
import AuthService from "../services/auth.service";
import { persistOnLocalStorage, handleError } from "../utils/helpers";


export interface AppStateSchema {
  states: {
    loading: {},
    loggingIn: {},
    loggedIn: {},
    loggingOut: {},
    loggedOut: {}
  }
};

export type AppEvent =
  | { type: string; }
  | { type: 'LOGGED_OUT'; }
  | { type: 'LOGGED_IN'; }
  | { type: 'LOGGING_IN'; }
  | { type: 'LOGOUT'; }
  | { type: 'LOGIN'; };


const firebaseLogout = (): Promise<any> => {
  const authService = AuthService.getInstance();
  return authService.firebaseLogout();
}

export const AppState = Machine<any, AppStateSchema, AppEvent>({
  initial: 'loading',
  states: {
    loading: {
      on: {
        LOGGED_OUT: "loggedOut",
        LOGGING_IN: "loggingIn",
        LOGGED_IN: "loggedIn"
      }
    },
    loggingIn: {
      entry: ["firebaseLogin"],
      on: {
        LOGGED_IN: {
          target: "loggedIn"
        }
      }
    },
    loggedIn: {
      entry: ["cleanAndPersist"],
      on: {
        LOGOUT: "loggingOut"
      }
    },
    loggingOut: {
      invoke: {
        id: 'firebaseLogout',
        src: firebaseLogout,
        onDone: {
          target: 'loggedOut',
          actions: ["removeFromStorage"]
        },
        onError: {
          actions: ["handleError"]
        }
      }
    },
    loggedOut: {
      on: {
        LOGIN: {
          actions: ["spotifyLogin"],
          target: "loading"
        }
      }
    }
  },
}, {
  actions: {
    handleError: (_ctx, e: any) => {
      handleError({ message: e.data }, "signOut")
    },
    spotifyLogin: () => {
      const authService = AuthService.getInstance();
      authService.spotifyLogin();
    },
    firebaseLogin: (_ctx, e: any) => {
      const authService = AuthService.getInstance();
      authService.authenticate(e.code);
    },
    removeFromStorage: (_ctx, e: any) => {
      localStorage.removeItem('loggedIn');
    },
    cleanAndPersist: (_ctx, e: any) => {
      window.history.replaceState({}, document.title, "/");
      persistOnLocalStorage("loggedIn", "true");
    }
  }
});
