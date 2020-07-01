import React from 'react'; // eslint-disable-line
/** @jsx jsx */
import { jsx, css } from '@emotion/core'; // eslint-disable-line
import LogoAtom from './logo.atom';
import PollAtom from './poll.atom';
import ProfileAtom from './profile.atom';

const HeaderBlock = css`
  align-items: center;
  display: flex;
`;

const Header = css`
  align-items: center;
  background-color: var(--mpp-primary-dark);
  color: var(--mpp-on-primary);
  display: flex;
  height: 50px;
  justify-content: space-between;
  padding: 0 50px;
  width: 100%;
`;


function HeaderOrganism() {
  return (
    <header css={Header}>
      <div css={HeaderBlock}>
        <LogoAtom imageName="logo.png" />
        <PollAtom />
      </div>

      <div css={HeaderBlock}>
        <ProfileAtom imageName="logo.png" />
      </div>
    </header>
  );
}

export default HeaderOrganism;
