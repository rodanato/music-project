import React from 'react'; // eslint-disable-line
/** @jsx jsx */
import { jsx, css } from '@emotion/core'; // eslint-disable-line

const Header = css`
  align-items: center;
  background-color: var(--mpp-primary-dark);
  color: var(--mpp-on-primary);
  display: flex;
  height: 50px;
  padding: 0 50px;
  width: 100%;
`;

const PollBtn = css`
  font-size: 25px;
`;

function HeaderOrganism() {
  return (
    <header css={Header}>
      <span 
        aria-label="Take a poll"
        role="img"
        css={PollBtn}
        className="mpp-no-btn"
        title="Give us your feedback?"
      >
        🤘
      </span>
    </header>
  );
}

export default HeaderOrganism;
