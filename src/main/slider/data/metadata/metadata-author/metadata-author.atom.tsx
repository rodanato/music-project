// EXTERNAL
import React from 'react'; // eslint-disable-line
/** @jsx jsx */
import { jsx, css } from '@emotion/core'; // eslint-disable-line

// DEPENDENCIES
import { AuthorProps } from './metadata-author.types';

// STYLES 
import { author } from './metadata-author.styles';


function MetadataAuthorAtom({ authorName }: AuthorProps) {
  return (
    <div css={[author]}>{authorName}</div>
  );
}

export default MetadataAuthorAtom;
