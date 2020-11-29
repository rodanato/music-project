// @flow
// EXTERNAL
import React from "react"; // eslint-disable-line
/** @jsx jsx */
// $FlowIgnore
import { jsx, css } from "@emotion/core"; // eslint-disable-line
import type { Node } from "react";
import classNames from "classnames";

// DEPENDENCIES
import type { CardProps } from "./card.types";

// STYLES
import { card } from "./card.styles";

function CardAtom(props: CardProps): Node {
  const cardClasses = classNames({
    "is-paddingless": props.paddingLess,
    "is-card-fullheight": props.fullheight,
  });

  return (
    <div css={[card]} className={cardClasses}>
      {props.children}
    </div>
  );
}

export default CardAtom;
