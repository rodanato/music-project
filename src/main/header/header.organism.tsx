import React from 'react';
/** @jsx jsx */
import { jsx, css } from '@emotion/core'; // eslint-disable-line

const Header = css`
  align-content: center;
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
      <button css={PollBtn} className="mpp-no-btn" title="Do you have feedback?">
        🤘
      </button>
    </header>
  );
}

export default HeaderOrganism;
