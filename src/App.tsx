import React from 'react'; // eslint-disable-line
import { ThemeProvider } from 'emotion-theming';

/** @jsx jsx */
import { Global, jsx, css } from '@emotion/core';

import MainOrganism from './main/main.organism';

import reset from './utils/reset';
import globalClasses from './utils/global-styles';

const theme1 = {// eslint-disable-line
  bg: 'hotpink'
}

const theme2 = {
  bg: '#5742cc'
}

function App() {
  return (
    <ThemeProvider theme={theme2}>
      <Global styles={css`
        ${reset}
        ${globalClasses}
      `} />
      <MainOrganism />
    </ThemeProvider>
  );
}

export default App;
