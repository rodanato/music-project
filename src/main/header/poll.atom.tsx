import React from 'react'; // eslint-disable-line

/** @jsx jsx */
import { jsx, css } from '@emotion/core'; // eslint-disable-line

const PollBtn = css`
  font-size: 25px;
`;

function PollAtom() {
  return (
    <span 
      aria-label="Take a poll"
      role="img"
      css={PollBtn}
      className="mpp-no-btn"
      title="Give us your feedback?"
    >
      🤘
    </span>
  );
}

export default PollAtom;
