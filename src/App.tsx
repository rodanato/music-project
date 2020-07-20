// EXTERNAL
import React, { Fragment, Suspense, useEffect, useState } from 'react'; // eslint-disable-line
/** @jsx jsx */
import { Global, jsx, css } from '@emotion/core';

// DEPENDENCIES
import globalClasses from './utils/global-styles';
import reset from './utils/reset';
import { themeStyles } from './utils/themes';
import typography from './utils/typography';
import AuthService from './services/auth.service';
import MainOrganism from './main/main.organism';
import { auth } from './services/firebase/config';

type LoggedStatus = null | boolean;

function App() {
  const [loggedIn, setLoggedIn] = useState<LoggedStatus>(null);
  const authService = AuthService.getInstance();
  
  useEffect(() => {
    auth.onAuthStateChanged(function (user) {
      if (user) {
        console.log("firebase loggedIn");
        setLoggedIn(true);
      } else {
        console.log("firebase not loggedIn");
        // setLoggedIn(false);
      }
    });
  }, []);

  useEffect(() => {
    const code = authService.getCodeIfPresent();

    if (loggedIn === null) {
      const isLoggedInOnStorage: string | null = localStorage.getItem("loggedIn");
      
      if (isLoggedInOnStorage !== null) {
        setLoggedIn(true);
      }
      
      if (!code) {
        setLoggedIn(false); 
      }
    }

    if (code) authService.authenticate(code);
  });

  function doLogin() {
    authService.login();
  }

  function ConditionalRender() {
    if (loggedIn === null) {
      return <div css={`color: #fff`}><h1>Loading...</h1></div>;
    }
    
    if (!loggedIn) {
      return (
        <div>
          <h2>You are not loggedIn</h2>
          <button onClick={() => doLogin()}>Login here</button>
        </div>
      );
    }

    return <MainOrganism />;
  }

  return (
    <Fragment>
      <Global styles={css`
        ${reset}
        ${themeStyles}
        ${typography}      
        ${globalClasses}
      `} />
      <ConditionalRender />
    </Fragment>
  );
}

export default App;
