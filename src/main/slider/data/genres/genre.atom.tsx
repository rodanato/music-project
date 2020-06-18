import React from 'react';

/** @jsx jsx */
import { jsx, css } from '@emotion/core'; // eslint-disable-line

type GenreProps = {
  genre: string
}

const Genre = css`
  margin-bottom: 10px;
`;

function GenreAtom({ genre }: GenreProps) {
  return (
    <span css={Genre}>{genre}</span>
  );
}

export default GenreAtom;
