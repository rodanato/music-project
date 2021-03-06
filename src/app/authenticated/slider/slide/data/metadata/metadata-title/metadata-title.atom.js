// @flow
// EXTERNAL
import React from "react"; // eslint-disable-line
import type { Node } from "react"; // eslint-disable-line
/** @jsx jsx */
// $FlowIgnore
import { jsx, css } from "@emotion/core"; // eslint-disable-line

// DEPENDENCIES
import type { TitleProps } from "./metadata-title.types";

// STYLES
import { title } from "./metadata-title.styles";

function MetadataTitleAtom({ titleName }: TitleProps): Node {
  return (
    <div css={[title]} className="mpp-font--subtitle">
      {titleName}
    </div>
  );
}

export default MetadataTitleAtom;
