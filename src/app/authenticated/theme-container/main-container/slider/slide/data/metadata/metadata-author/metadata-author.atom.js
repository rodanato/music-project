// @flow
// EXTERNAL
import React from "react"; // eslint-disable-line
import type { Node } from "react"; // eslint-disable-line
/** @jsx jsx */
// $FlowIgnore
import { jsx, css } from "@emotion/core"; // eslint-disable-line

// DEPENDENCIES
import type { AuthorProps } from "./metadata-author.types";

// STYLES
import { author } from "./metadata-author.styles";

function MetadataAuthorAtom({ authorName }: AuthorProps): Node {
  return <div css={[author]}>{authorName}</div>;
}

export default MetadataAuthorAtom;
