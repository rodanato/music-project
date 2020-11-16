// @flow
// EXTERNAL
import React from "react"; // eslint-disable-line
/** @jsx jsx */
// $FlowIgnore
import { jsx, css } from "@emotion/core";
import type { Node } from "react";

// DEPENDENCIES
import type { CardProps } from "./card.types";

// STYLES
import { card } from "./card.styles";

function CardAtom(props: CardProps): Node {
  return (
    <div css={[card]} className={props.paddingLess ? "is-paddingless" : ""}>
      {props.children}
    </div>
  );
}

export default CardAtom;
