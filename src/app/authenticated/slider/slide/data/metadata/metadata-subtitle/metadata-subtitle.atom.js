// @flow
// EXTERNAL
import React from "react"; // eslint-disable-line
import type { Node } from "react"; // eslint-disable-line
/** @jsx jsx */
// $FlowIgnore
import { jsx, css } from "@emotion/core"; // eslint-disable-line

// DEPENDENCIES
import type { SubtitleProps } from "./metadata-subtitle.types";

// STYLES
import { subtitleStyles } from "./metadata-subtitle.styles";

function MetadataSubtitleAtom({ subtitle }: SubtitleProps): Node {
  return <div css={[subtitleStyles]}>{subtitle}</div>;
}

export default MetadataSubtitleAtom;
