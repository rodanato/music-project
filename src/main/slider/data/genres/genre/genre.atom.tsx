// EXTERNAL
import React from 'react'; // eslint-disable-line
/** @jsx jsx */
import { jsx, css } from '@emotion/core'; // eslint-disable-line

// DEPENDENCIES
import { GenreProps } from './genre.types';

// STYLES
import { genre } from './genre.styles';

function GenreAtom({ genreName }: GenreProps) {
  return (
    <button css={[genre]}>{genreName}</button>
  );
}

export default GenreAtom;
