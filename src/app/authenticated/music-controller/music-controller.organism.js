// @flow

// EXTERNAL
import React from "react"; // eslint-disable-line
import type { Node } from "react"; // eslint-disable-line
/** @jsx jsx */
// $FlowIgnore
import { jsx, css } from "@emotion/core"; // eslint-disable-line

// DEPENDENCIES

// STYLES
import { musicController } from "./music-controller.styles";

function MusicControllerOrganism(): Node {
  return <section css={[musicController]}></section>;
}

export default MusicControllerOrganism;
