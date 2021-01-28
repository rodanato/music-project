// @flow

// EXTERNAL
import React, { Fragment, useEffect } from "react"; // eslint-disable-line
import type { Node } from "react"; // eslint-disable-line
/** @jsx jsx */
// $FlowIgnore
import { Global, jsx, css } from "@emotion/core";
import { QueryClient, QueryClientProvider } from "react-query";

// DEPENDENCIES
import reset from "config/reset";
import { themeStyles } from "config/themes";
import typography from "config/typography";
import globalClasses from "config/global-styles";
import ThemeContainerOrganism from "./theme-container/theme-container.organism";
import UnauthenticatedOrganism from "./unauthenticated/unauthenticated.organism";
import LoadingAtom from "shared/loading/loading.atom";
import useAuthentication from "./authenticated/use-authentication";
import AuthenticatedOrganism from "./authenticated/authenticated.organism";

const queryClient = new QueryClient();

function App(): Node {
  const { authState, login, logout } = useAuthentication();

  function authRender() {
    switch (authState) {
      case "loggedIn":
        return (
          <ThemeContainerOrganism>
            <QueryClientProvider client={queryClient}>
              <AuthenticatedOrganism onLogout={() => logout()} />
            </QueryClientProvider>
          </ThemeContainerOrganism>
        );
      case "loggedOut":
        return <UnauthenticatedOrganism onLogin={() => login()} />;
      default:
        return <LoadingAtom flex="1" />;
    }
  }

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

      {authRender()}
    </Fragment>
  );
}

export default App;
