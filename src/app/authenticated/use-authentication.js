// @flow
// EXTERNAL
import React, { Fragment, useEffect, useState } from "react"; // eslint-disable-line
import type { Node } from "react"; // eslint-disable-line

// DEPENDENCIES
import AuthService from "services/auth.service";
import { useMachine } from "@xstate/react";
import { AuthenticatedState } from "./authenticated.state";
import { getIfExistOnStorage } from "utils/helpers";

function useAuthentication(): {
  authState: string,
  login: Function,
  logout: Function,
} {
  const [state, send] = useMachine(AuthenticatedState);
  const authService = AuthService.getInstance();
  let auth = {
    authState: state.value,
    login,
    logout,
  };

  function login(): void {
    send("LOGIN");
  }

  function logout(): void {
    send("LOGOUT");
  }

  if (state.matches("loading")) {
    const code = authService.getCodeIfPresent();

    if (getIfExistOnStorage("loggedIn")) {
      send("LOGGED_IN");
    }

    if (code) {
      send("LOGGING_IN", { code: code });
    }

    if (!code) {
      send("LOGGED_OUT");
    }
  }

  return auth;
}

export default useAuthentication;
