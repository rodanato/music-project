// @flow
// EXTERNAL
import React, { Fragment, useEffect } from "react"; // eslint-disable-line
import type { Node } from "react"; // eslint-disable-line
/** @jsx jsx */
// $FlowIgnore
import { Global, jsx, css } from "@emotion/core";

// DEPENDENCIES
import reset from "config/reset";
import { themeStyles } from "config/themes";
import typography from "config/typography";
import globalClasses from "config/global-styles";
import ThemeContainerOrganism from "./authenticated/theme-container/theme-container.organism";
import UnauthenticatedOrganism from "./unauthenticated/unauthenticated.organism";
import LoadingAtom from "shared/loading/loading.atom";
import useAuthentication from "./authenticated/use-authentication";
import MainContainerOrganism from "./authenticated/theme-container/main-container/main-container.organism";

function App(): Node {
  const { authState, login, logout } = useAuthentication();

  return (
    <Fragment>
      <React.StrictMode>
        <Global
          styles={css`
        ${reset}
        ${themeStyles}
        ${typography}      
        ${globalClasses}
      `}
        />

        {authState === "loggedIn" ? (
          <ThemeContainerOrganism>
            <MainContainerOrganism onLogout={() => logout()} />
          </ThemeContainerOrganism>
        ) : authState === "loggedOut" ? (
          <UnauthenticatedOrganism onLogin={() => login()} />
        ) : (
          <LoadingAtom flex="1" />
        )}
      </React.StrictMode>
    </Fragment>
  );
}

export default App;
