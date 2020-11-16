// @flow
// EXTERNAL
/** @jsx jsx */
// $FlowIgnore
import { jsx, css } from "@emotion/core"; // eslint-disable-line
import type { Node } from "react";

// DEPENDENCIES
import type { MainImageProps } from "./data-main-image.types";

// STYLES
import { mainImage } from "./data-main-image.styles";

function MainImageAtom({ url }: MainImageProps): Node {
  return <img css={[mainImage]} src={url} alt="" />;
}

export default MainImageAtom;
