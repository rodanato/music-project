import { Machine } from "xstate";
import AuthService from "../services/auth.service";
import { persistOnLocalStorage } from "../utils/helpers";

export const AppState = Machine({
  initial: 'loading',
  states: {
    loading: {
      on: {
        NOT_AUTHENTICATED: "unauthenticated",
        AUTHENTICATING: "authenticating",
        AUTHENTICATE: "authenticated"
      }
    },
    authenticating: {
      entry: ["firebaseLogin"],
      on: {
        AUTHENTICATE: {
          target: "authenticated"
        }
      }
    },
    authenticated: {
      entry: ["cleanAndPersist"],
      on: {
        LOGOUT: "unauthenticated"
      }
    },
    unauthenticated: {
      on: {
        SPOTIFY_AUTH: {
          actions: ["spotifyLogin"]
        }
      }
    }
  },
}, {
  actions: {
    spotifyLogin: () => {
      const authService = AuthService.getInstance();
      authService.spotifyLogin();
    },
    firebaseLogin: (_ctx, e: any) => {
      const authService = AuthService.getInstance();
      authService.authenticate(e.code);
    },
    cleanAndPersist: (_ctx, e: any) => {
      window.history.replaceState({}, document.title, "/");
      persistOnLocalStorage("loggedIn", "true");
    }
  }
});
