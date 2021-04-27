// @flow
// EXTERNAL
import React, { useEffect } from "react"; // eslint-disable-line
import type { Node } from "react"; // eslint-disable-line
/** @jsx jsx */
// $FlowIgnore
import { jsx, css } from "@emotion/core"; // eslint-disable-line
import { useService } from "@xstate/react";

// DEPENDENCIES
import LogoAtom from "./logo/logo.atom";
import PollAtom from "./poll/poll.atom";
import ProfileAtom from "./profile/profile.atom";
import { SliderStateService } from "app/authenticated/slider/slider.state";
import useLoadProfile from "shared/custom-hooks/use-load-profile";

// STYLES
import { header, headerBlock } from "./header.styles";

function HeaderOrganism(): Node {
  const [_, send] = useService(SliderStateService);
  const { loadProfileSlide } = useLoadProfile();

  async function removeSlide() {
    send("REMOVE_SLIDE");
  }

  return (
    <header css={[header]}>
      <div css={[headerBlock]}>
        <LogoAtom imageName="logo.png" />
        <PollAtom />
      </div>

      <div css={[headerBlock]}>
        <button onClick={removeSlide}>Remove first slide</button>
        <ProfileAtom imageName="logo.png" onClickAction={loadProfileSlide} />
      </div>
    </header>
  );
}

export default HeaderOrganism;
