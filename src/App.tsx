import React, { Fragment } from 'react'; // eslint-disable-line

/** @jsx jsx */
import { Global, jsx, css } from '@emotion/core';

import MainOrganism from './main/main.organism';

import globalClasses from './utils/global-styles';
import reset from './utils/reset';
import {themeStyles} from './utils/themes';
import typography from './utils/typography';

function App() {
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
