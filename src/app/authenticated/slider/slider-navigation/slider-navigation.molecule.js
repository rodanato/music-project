// @flow
// EXTERNAL
import React, { Fragment } from "react";
import type { Node } from "react";

// STYLES
import { SwiperPagination } from "./slider-navigation.styles";

function SliderNavigationMolecule({
  slideListLength,
}: {
  slideListLength: number,
}): Node {
  return (
    <Fragment>
      <div className="swiper-button-prev material-icons">keyboard_arrow_up</div>
      <SwiperPagination
        className="swiper-pagination"
        slideListLength={slideListLength}
      />
      <div className="swiper-button-next material-icons">
        keyboard_arrow_down
      </div>
    </Fragment>
  );
}

export default SliderNavigationMolecule;
