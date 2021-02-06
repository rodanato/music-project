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
import SliderService from "services/slider.service";
import { SliderStateService } from "app/authenticated/slider/slider.state";
import useProfileSlide from "../use-profile-slide";

// STYLES
import { header, headerBlock } from "./header.styles";

function HeaderOrganism(): Node {
  const sliderService = SliderService.getInstance();
  const [state, send] = useService(SliderStateService);
  const { data } = useProfileSlide();
  const list = state.context.list;

  async function removeSlide() {
    send("REMOVE_SLIDE");
  }

  async function addSlide() {
    if (list.length > 0) sliderService.addEmptySlide();
    if (data) send("ADD_SLIDE", { slide: data });
  }

  useEffect(() => {
    if (state.matches("removingSlide")) {
      send("GO_TO_IDLE");
    }
  });

  return (
    <header css={[header]}>
      <div css={[headerBlock]}>
        <LogoAtom imageName="logo.png" />
        <PollAtom />
      </div>

      <div css={[headerBlock]}>
        <button onClick={() => removeSlide()}>Remove first slide</button>
        <ProfileAtom imageName="logo.png" onClickAction={() => addSlide()} />
      </div>
    </header>
  );
}

export default HeaderOrganism;
