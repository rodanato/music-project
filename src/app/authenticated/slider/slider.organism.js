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
import SwiperContainerOrganism from "./swiper-container/swiper-container.organism";
import useLoadProfile from "shared/custom-hooks/use-load-profile";

// STYLES
// $FlowIgnore
import "swiper/css/swiper.css";
import { slider } from "./slider.styles";

function SliderOrganism(): Node {
  const sliderService = SliderService.getInstance();
  const [state, send] = useService(SliderStateService);
  const { loadProfileSlide } = useLoadProfile();
  const [firstSlideLoaded, setFirstSlideLoaded] = useState(false);
  const list = state.context.list;

  useEffect(() => {
    if (state.matches("notstarted")) {
      send("START");
    }
    if (state.matches("removingSlide")) {
      send("GO_TO_IDLE");
    }
    if (state.matches("idle") && !firstSlideLoaded) {
      loadProfileSlide();
      setFirstSlideLoaded(true);
    }
  }, [state]);

  useEffect(() => {
    if (list.length > 0) {
      sliderService.addSlideUpdates();
    }
  }, [list.length]);

  return (
    <section css={[slider]}>
      <SwiperContainerOrganism slideList={list} />
      <NavigationOrganism>
        <SliderNavigationMolecule slideListLength={list.length} />
      </NavigationOrganism>
    </section>
  );
}

export default React.memo(SliderOrganism);
