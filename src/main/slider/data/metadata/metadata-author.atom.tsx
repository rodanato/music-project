import React from 'react'; // eslint-disable-line

/** @jsx jsx */
import { jsx, css } from '@emotion/core'; // eslint-disable-line

type AuthorProps = {
  author: string
}

const Author = css`
  margin-bottom: 10px;
`;

function MetadataAuthorAtom({ author }: AuthorProps) {
  return (
    <div css={Author}>{author}</div>
  );
}

export default MetadataAuthorAtom;
