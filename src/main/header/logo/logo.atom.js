// @flow
// EXTERNAL
import React from 'react'; // eslint-disable-line
/** @jsx jsx */
import { jsx, css } from '@emotion/core'; // eslint-disable-line

// DEPENDENCIES

// STYLES
import type { LogoProps } from './logo.types';

function LogoAtom({ imageName }: LogoProps) {
  return (
    <img
      width="50"
      src={`${process.env.PUBLIC_URL}/images/${imageName}`} 
      alt="Logo"
    />
  );
}

export default LogoAtom;
