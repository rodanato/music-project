// @flow
// EXTERNAL
import React from "react"; // eslint-disable-line
/** @jsx jsx */
// $FlowIgnore
import { jsx, css } from "@emotion/core"; // eslint-disable-line

// DEPENDENCIES
import LogoAtom from "./logo/logo.atom";
import PollAtom from "./poll/poll.atom";
import ProfileAtom from "./profile/profile.atom";

// STYLES
import { header, headerBlock } from "./header.styles";

function HeaderOrganism() {
  return (
    <header css={[header]}>
      <div css={[headerBlock]}>
        <LogoAtom imageName="logo.png" />
        <PollAtom />
      </div>

      <div css={[headerBlock]}>
        <ProfileAtom imageName="logo.png" />
      </div>
    </header>
  );
}

export default HeaderOrganism;
