import React from 'react'; // eslint-disable-line

/** @jsx jsx */
import { jsx, css } from '@emotion/core'; // eslint-disable-line

type LogoProps = {
  imageName: string
}
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
