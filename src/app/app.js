// @flow
// EXTERNAL
import React, { Fragment, useEffect } from "react"; // eslint-disable-line
import type { Node } from "react"; // eslint-disable-line
/** @jsx jsx */
// $FlowIgnore
import { Global, jsx, css } from "@emotion/core";

// DEPENDENCIES
import reset from "utils/reset";
import { themeStyles } from "utils/themes";
import typography from "utils/typography";
import globalClasses from "utils/global-styles";
import ThemeContainerOrganism from "./authenticated/theme-container/theme-container.organism";
import UnauthenticatedOrganism from "./unauthenticated/unauthenticated.organism";
import LoadingAtom from "shared/loading/loading.atom";
import useAuthentication from "./authenticated/use-authentication";

function App(): Node {
  const { authState, login, logout } = useAuthentication();

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

      {authState === "loggedIn" ? (
        <ThemeContainerOrganism onLogout={() => logout()} />
      ) : authState === "loggedOut" ? (
        <UnauthenticatedOrganism onLogin={() => login()} />
      ) : (
        <LoadingAtom flex="1" />
      )}
    </Fragment>
  );
}

export default App;
