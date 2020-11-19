// @flow
// EXTERNAL
import React from "react"; // eslint-disable-line
/** @jsx jsx */
// $FlowIgnore
import { jsx, css } from "@emotion/core"; // eslint-disable-line
import type { Node } from "react";

// DEPENDENCIES
import CardAtom from "shared/card/card.atom";
import type { ContentProps } from "./content.types";

// STYLES
import { contentContainer, content } from "./content.styles";

function ContentMolecule(props: ContentProps): Node {
  return (
    <div css={[contentContainer]} className="mpp-show-slowly">
      <CardAtom>
        <div css={[content]}>{props.children}</div>
      </CardAtom>
    </div>
  );
}

export default ContentMolecule;
