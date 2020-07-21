// EXTERNAL
import React, { Fragment, useEffect } from 'react'; // eslint-disable-line
/** @jsx jsx */
import { Global, jsx, css } from '@emotion/core';

// DEPENDENCIES
import globalClasses from '../utils/global-styles';
import reset from '../utils/reset';
import { themeStyles } from '../utils/themes';
import typography from '../utils/typography';
import AuthService from '../services/auth.service';
import MainOrganism from '../main/main.organism';
import { auth } from '../services/firebase/config';
import LoadingAtom from '../shared/loading/loading.atom';
import UnauthenticatedOrganism from '../main/unauthenticated/unauthenticated.organism';
import { useMachine } from '@xstate/react';
import { AppState } from './app.state';

function App() {
  const [state, send] = useMachine(AppState);
  const authService = AuthService.getInstance();

  useEffect(() => {
    auth.onAuthStateChanged(function (user) {
      if (user) send("AUTHENTICATE");
    });
  }, [send]);

  useEffect(() => {
    if (state.matches("loading")) {
      const code = authService.getCodeIfPresent();

      if (isLoggedInOnStorage()) {
        send("AUTHENTICATE");
        return;
      }

      if (code) {
        send("AUTHENTICATING", { code: code });
        return;
      }

      if (!code) {
        send("NOT_AUTHENTICATED");
      }
    }
  });

  function isLoggedInOnStorage() {
    const storageLoggedIn: string | null = localStorage.getItem("loggedIn");
    return storageLoggedIn !== null;
  }

  function doSpotifyLogin() {
    send("SPOTIFY_AUTH");
  }

  //FIXME: When code is present on url, the unauthenticated 
  // view is loading after the "loading" view and before
  // the authenticated one 

  return (
    <Fragment>
      <Global styles={css`
        ${reset}
        ${themeStyles}
        ${typography}      
        ${globalClasses}
      `} />

      {state.matches("loading")
        ? <LoadingAtom flex="1" />
        : state.matches("authenticated")
          ? <MainOrganism />
          : <UnauthenticatedOrganism onLogin={doSpotifyLogin} />}
    </Fragment>
  );
}

export default App;
