// @flow
// EXTERNAL
import React from "react"; // eslint-disable-line
/** @jsx jsx */
// $FlowIgnore
import { jsx, css } from "@emotion/core"; // eslint-disable-line

// DEPENDENCIES

// STYLES
import { pollBtn } from "./poll.styles";

function PollAtom() {
  return (
    <span
      aria-label="Take a poll"
      role="img"
      css={[pollBtn]}
      className="mpp-no-btn"
      title="Give us your feedback"
    >
      🤘
    </span>
  );
}

export default PollAtom;
