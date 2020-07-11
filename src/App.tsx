// EXTERNAL
import React, { Fragment } from 'react'; // eslint-disable-line
/** @jsx jsx */
import { Global, jsx, css } from '@emotion/core';

// DEPENDENCIES
import globalClasses from './utils/global-styles';
import reset from './utils/reset';
import { themeStyles } from './utils/themes';
import typography from './utils/typography';
import AuthService from './services/auth.service';
import MainOrganism from './main/main.organism';

function App() {
  const authService = new AuthService();
  authService.login();

  return (
    <Fragment>
      <Global styles={css`
        ${reset}
        ${themeStyles}
        ${typography}      
        ${globalClasses}
      `} />
      <MainOrganism />
    </Fragment>
  );
}

export default App;
