// @flow
// EXTERNAL
import React from "react"; // eslint-disable-line
/** @jsx jsx */
// $FlowIgnore
import { jsx, css } from "@emotion/core";

// DEPENDENCIES
import type { TitleProps } from "./metadata-title.types";

// STYLES
import { title } from "./metadata-title.styles";

function MetadataTitleAtom({ titleName }: TitleProps) {
  return (
    <div css={[title]} className="mpp-font--subtitle">
      {titleName}
    </div>
  );
}

export default MetadataTitleAtom;
