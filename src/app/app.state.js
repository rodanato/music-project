// @flow
import { Machine } from "xstate";
import type { StateMachine } from "xstate";
import AuthService from "services/auth.service";
import SpotifyService from "services/spotify.service";
import { persistOnLocalStorage, handleError } from "utils/helpers";

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
  return authService.firebaseLogin(e.code);
};

export const AppState: StateMachine<
  any,
  AppStateSchema,
  AppEvent,
  {
    value: any,
    context: any,
  }
> = Machine<any, AppStateSchema, AppEvent>(
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
        invoke: {
          id: "firebaseLogin",
          src: firebaseLogin,
          onDone: {
            target: "loggedIn",
          },
          onError: {
            actions: ["handleError"],
          },
        },
      },
      loggedIn: {
        entry: ["cleanUrlAndAddToStorage"],
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
    actions: {
      handleError: (_ctx, e: any) => {
        handleError({ message: e.data }, "spa:authentication");
      },
      spotifyLogin: () => {
        const spotifyService = SpotifyService.getInstance();
        spotifyService.loginRedirect();
      },
      removeFromStorage: (_ctx, e: any) => {
        localStorage.removeItem("loggedIn");
        localStorage.removeItem("spotifyToken");
        const spotifyService = SpotifyService.getInstance();
        spotifyService.cleanExpirationTimeout();
      },
      cleanUrlAndAddToStorage: (_ctx, e: any) => {
        window.history.replaceState({}, document.title, "/");
        persistOnLocalStorage("loggedIn", "true");
      },
    },
  }
);
