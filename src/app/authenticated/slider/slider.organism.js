// @flow
// EXTERNAL
import React, { useEffect, useState } from "react"; // eslint-disable-line
import type { Node } from "react";
// $FlowIgnore
/** @jsx jsx */ import { jsx, css } from "@emotion/core"; // eslint-disable-line
import { useService } from "@xstate/react";

// DEPENDENCIES
import SliderService from "services/slider.service";
import { SliderStateService } from "app/authenticated/slider/slider.state";
import NavigationOrganism from "../navigation/navigation.organism";
import SliderNavigationMolecule from "./slider-navigation/slider-navigation.molecule";
import useProfileSlide from "../use-profile-slide";
import SwiperContainerOrganism from "./swiper-container/swiper-container.organism";

// STYLES
// $FlowIgnore
import "swiper/css/swiper.css";
import { slider } from "./slider.styles";

function SliderOrganism(): Node {
  const sliderService = SliderService.getInstance();
  const [state, send] = useService(SliderStateService);
  // TODO: Try loading the profile first and adding the slide only with it, then get playlists and genres and update context.list, sliderOrganism should rerender with the new data
  const { data } = useProfileSlide();
  const list = state.context.list;

  async function addSlide() {
    if (list.length > 0) sliderService.addEmptySlide();
    if (data) send("ADD_SLIDE", { slide: data });
  }

  if (state.matches("started")) {
    addSlide();
  }

  useEffect(() => {
    if (state.matches("notstarted")) {
      send("START");
    }
  }, []);

  useEffect(() => {
    if (list.length > 0) sliderService.addSlideUpdates();
  }, [list]);

  return (
    <section css={[slider]}>
      <SwiperContainerOrganism slideList={list} />
      <NavigationOrganism>
        <SliderNavigationMolecule slideListLength={list.length} />
      </NavigationOrganism>
    </section>
  );
}

export default SliderOrganism;
