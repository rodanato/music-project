// @flow
// EXTERNAL
import React, { useEffect, Suspense, useState } from "react"; // eslint-disable-line
import type { Node } from "react";
// $FlowIgnore
/** @jsx jsx */ import { jsx, css } from "@emotion/core"; // eslint-disable-line

// DEPENDENCIES
import NavigationOrganism from "../navigation/navigation.organism";
import SliderNavigationMolecule from "./slider-navigation/slider-navigation.molecule";
import SwiperContainerOrganism from "./swiper-container/swiper-container.organism";
import SliderService from "services/slider/slider.service";

// STYLES
// $FlowIgnore
import "swiper/css/swiper.css";
import { slider } from "./slider.styles";

function SliderOrganism(): Node {
  const sliderService = SliderService.getInstance();
  const [, forceRender] = React.useState();

  document.addEventListener("slideListUpdated", () => {
    forceRender({});
  });

  useEffect(() => {
    sliderService.createSwiper();
    sliderService.swiper.init();
  }, []);

  return (
    <section css={[slider]}>
      <SwiperContainerOrganism slideList={sliderService.slideList} />

      <NavigationOrganism>
        <SliderNavigationMolecule
          slideListLength={sliderService.slideList.length}
        />
      </NavigationOrganism>
    </section>
  );
}

export default SliderOrganism;
