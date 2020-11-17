// @flow
// EXTERNAL
import React, { Fragment, useEffect } from "react"; // eslint-disable-line
import type { Node } from "react"; // eslint-disable-line
/** @jsx jsx */
// $FlowIgnore
import { Global, jsx, css } from "@emotion/core";

// DEPENDENCIES
import AuthService from "services/auth.service";
import { useMachine } from "@xstate/react";
import { AppState } from "./app.state";
import { getIfExistOnStorage } from "utils/helpers";
import reset from "utils/reset";
import globalClasses from "utils/global-styles";
import typography from "utils/typography";
import { themeStyles } from "utils/themes";
import MainOrganism from "./main/main.organism";
import LoadingAtom from "shared/loading/loading.atom";
import UnauthenticatedOrganism from "./main/unauthenticated/unauthenticated.organism";

function App(): Node {
  const [state, send] = useMachine(AppState);
  const authService = AuthService.getInstance();

  useEffect(() => {
    if (state.matches("loading")) {
      const code = authService.getCodeIfPresent();

      if (getIfExistOnStorage("loggedIn")) {
        send("LOGGED_IN");
        return;
      }

      if (code) {
        send("LOGGING_IN", { code: code });
        return;
      }

      if (!code) {
        send("LOGGED_OUT");
      }
    }
  });

  return (
    <Fragment>
      <Global
        styles={css`
        ${reset}
        ${themeStyles}
        ${typography}      
        ${globalClasses}
      `}
      />

      {state.matches("loggedIn") ? (
        <div>
          <button onClick={() => send("LOGOUT")}>Logout here</button>
          <MainOrganism />
        </div>
      ) : state.matches("loggedOut") ? (
        <UnauthenticatedOrganism onLogin={() => send("LOGIN")} />
      ) : (
        <LoadingAtom flex="1" />
      )}
    </Fragment>
  );
}

export default App;
