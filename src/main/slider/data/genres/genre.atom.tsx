import React from 'react'; // eslint-disable-line

/** @jsx jsx */
import { jsx, css } from '@emotion/core'; // eslint-disable-line

type GenreProps = {
  genre: string
}

const Genre = css`
  background-color: #f1f1f1;
  border: none;
  border-radius: 25px;
  color: gray;
  cursor: pointer;
  display: inline-block;
  font-size: 14px;
  margin: 5px;
  padding: 10px 15px;
  transition: all 0.3s;

  &:hover {
    background-color: var(--mpp-primary-light);
    color: var(--mpp-on-primary);
  }
`;

function GenreAtom({ genre }: GenreProps) {
  return (
    <button css={Genre}>{genre}</button>
  );
}

export default GenreAtom;
