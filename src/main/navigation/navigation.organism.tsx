// EXTERNAL
import React from 'react'; // eslint-disable-line
/** @jsx jsx */
import { jsx, css } from '@emotion/core'; // eslint-disable-line

// DEPENDENCIES
import { NavigationProps } from './navigation.types';

// STYLES
import { navigation } from './navigation.styles';

function NavigationOrganism(props: NavigationProps) {
  return (
    <section className="mpp-font--bold" css={[navigation]}>
      {props.children}
    </section>
  );
}

export default NavigationOrganism;
