// @flow
// EXTERNAL
import React from "react"; // eslint-disable-line
import type { Node } from "react"; // eslint-disable-line
/** @jsx jsx */
// $FlowIgnore
import { jsx, css } from "@emotion/core"; // eslint-disable-line

// DEPENDENCIES

// STYLES
import { footer } from "./footer.styles";

function FooterOrganism(): Node {
  return <footer css={[footer]}></footer>;
}

export default FooterOrganism;