// @flow
// EXTERNAL
import React from "react"; // eslint-disable-line
/** @jsx jsx */
// $FlowIgnore
import { jsx, css } from "@emotion/core";

// DEPENDENCIES
import type { AuthorProps } from "./metadata-author.types";

// STYLES
import { author } from "./metadata-author.styles";

function MetadataAuthorAtom({ authorName }: AuthorProps) {
  return <div css={[author]}>{authorName}</div>;
}

export default MetadataAuthorAtom;
