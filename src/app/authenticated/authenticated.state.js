// @flow
import { Machine } from "xstate";
import type { StateMachine } from "xstate";
import BackendService from "services/backend.service";
import { persistOnStorage, handleError } from "utils/helpers";

export interface AuthenticatedStateSchema {
  states: {
    loading: {},
    loggingIn: {},
    loggedIn: {},
    loggingOut: {},
    loggedOut: {},
  };
}

export type AuthenticatedEvent =
  | { type: string }
  | { type: "LOGGED_OUT" }
  | { type: "LOGGED_IN" }
  | { type: "LOGGING_IN" }
  | { type: "LOGOUT" }
  | { type: "LOGIN" };

const backendService = BackendService.getInstance();

const firebaseLogout = (): Promise<any> => {
  return backendService.logout();
};

const firebaseLogin = (ctx, e): Promise<any> => {
  return backendService.login(e.code);
};

export const AuthenticatedState: StateMachine<
  any,
  AuthenticatedStateSchema,
  AuthenticatedEvent,
  {
    value: any,
    context: any,
  }
> = Machine<any, AuthenticatedStateSchema, AuthenticatedEvent>(
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
            target: "loggedOut",
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
            target: "loggedOut",
            actions: ["removeFromStorage", "handleError"],
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
        handleError({ message: e.data }, "spa:authenticatedState");
      },
      spotifyLogin: () => {
        backendService.loginRedirect();
      },
      removeFromStorage: (_ctx, e: any) => {
        backendService.cleanStorage();
        backendService.cleanExpirationTimeout();
      },
      cleanUrlAndAddToStorage: (_ctx, e: any) => {
        window.history.replaceState({}, document.title, "/");
        persistOnStorage("loggedIn", "true");
      },
    },
  }
);
