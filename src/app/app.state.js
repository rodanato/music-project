// @flow
import { Machine } from "xstate";
import AuthService from "../services/auth.service";
import SpotifyService from "../services/spotify.service";
import { persistOnLocalStorage, handleError } from "../utils/helpers";

export interface AppStateSchema {
  states: {
    loading: {},
    loggingIn: {},
    loggedIn: {},
    loggingOut: {},
    loggedOut: {},
  };
}

export type AppEvent =
  | { type: string }
  | { type: "LOGGED_OUT" }
  | { type: "LOGGED_IN" }
  | { type: "LOGGING_IN" }
  | { type: "LOGOUT" }
  | { type: "LOGIN" };

const firebaseLogout = (): Promise<any> => {
  const authService = AuthService.getInstance();
  return authService.firebaseLogout();
};

const firebaseLogin = (ctx, e): Promise<any> => {
  const authService = AuthService.getInstance();
  return authService.authenticate(e.code);
};

export const AppState = Machine<any, AppStateSchema, AppEvent>(
  {
    initial: "loading",
    states: {
      loading: {
        on: {
          LOGGED_OUT: "loggedOut",
          LOGGING_IN: "loggingIn",
          LOGGED_IN: "loggedIn",
        },
      },
      loggingIn: {
        // entry: ["firebaseLogin"],
        invoke: {
          id: "firebaseLogin",
          src: firebaseLogin,
          onDone: {
            target: "loggedIn"
          },
          onError: {
            actions: ["handleError"],
          },
        },
        // on: {
        //   LOGGED_IN: {
        //     target: "loggedIn",
        //     cond: "spotifyTokenExists"
        //   },
        // },
      },
      loggedIn: {
        entry: ["cleanAndPersist"],
        on: {
          LOGOUT: "loggingOut",
        },
      },
      loggingOut: {
        invoke: {
          id: "firebaseLogout",
          src: firebaseLogout,
          onDone: {
            target: "loggedOut",
            actions: ["removeFromStorage"],
          },
          onError: {
            actions: ["handleError"],
          },
        },
      },
      loggedOut: {
        on: {
          LOGIN: {
            actions: ["spotifyLogin"],
            target: "loading",
          },
        },
      },
    },
  },
  {
    guards: {
      spotifyTokenExists: () => {
        const spotifyService = SpotifyService.getInstance();
        return !!spotifyService.token;
      }
    },
    actions: {
      handleError: (_ctx, e: any) => {
        handleError({ message: e.data }, "signOut");
      },
      spotifyLogin: () => {
        const spotifyService = SpotifyService.getInstance();
        spotifyService.loginRedirect();
      },
      removeFromStorage: (_ctx, e: any) => {
        localStorage.removeItem("loggedIn");
      },
      cleanAndPersist: (_ctx, e: any) => {
        const spotifyService = SpotifyService.getInstance();
        window.history.replaceState({}, document.title, "/");
        persistOnLocalStorage("loggedIn", "true");
        persistOnLocalStorage("spotifyToken", spotifyService.token);
      },
    },
  }
);
