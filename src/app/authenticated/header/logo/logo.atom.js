// @flow
// EXTERNAL
import React from "react"; // eslint-disable-line
import type { Node } from "react"; // eslint-disable-line
/** @jsx jsx */
// $FlowIgnore
import { jsx, css } from "@emotion/core"; // eslint-disable-line

// DEPENDENCIES
import { getPublicUrl } from "utils/helpers";

// STYLES
import type { LogoProps } from "./logo.types";

function LogoAtom({ imageName }: LogoProps): Node {
  return (
    <img width="50" src={`${getPublicUrl()}/images/${imageName}`} alt="Logo" />
  );
}

export default LogoAtom;
