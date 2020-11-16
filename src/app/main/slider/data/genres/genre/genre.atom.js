// @flow
// EXTERNAL
import React from "react"; // eslint-disable-line
/** @jsx jsx */
// $FlowIgnore
import { jsx, css } from "@emotion/core";
import type { Node } from "react";

// DEPENDENCIES
import type { GenreProps } from "./genre.types";

// STYLES
import { genre } from "./genre.styles";

function GenreAtom({ genreName }: GenreProps): Node {
  return <button css={[genre]}>{genreName}</button>;
}

export default GenreAtom;
