// @flow
// EXTERNAL
import React from "react"; // eslint-disable-line
import type { Node } from "react"; // eslint-disable-line
/** @jsx jsx */
// $FlowIgnore
import { jsx, css } from "@emotion/core"; // eslint-disable-line

// DEPENDENCIES
import type { NavigationProps } from "./navigation.types";

// STYLES
import { navigation } from "./navigation.styles";

function NavigationOrganism(props: NavigationProps): Node {
  return (
    <section className="mpp-font--bold" css={[navigation]}>
      {props.children}
    </section>
  );
}

export default NavigationOrganism;
