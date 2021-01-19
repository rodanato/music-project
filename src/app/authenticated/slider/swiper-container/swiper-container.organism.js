// @flow
// EXTERNAL
import React, { useEffect, Suspense } from "react"; // eslint-disable-line
import type { Node } from "react";
// $FlowIgnore
/** @jsx jsx */ import { jsx, css } from "@emotion/core"; // eslint-disable-line
// $FlowIgnore
import { v4 as uuidv4 } from "uuid";

// DEPENDENCIES
import SlideMolecule from "../slide/slide.molecule";
import { swiperContainer } from "./swiper-container.styles";

function SwiperContainerOrganism({ slideList }: { slideList: any[] }): Node {
  return (
    <div className="swiper-container" css={[swiperContainer]}>
      <div className="swiper-wrapper">
        {slideList.map((slide, i) => (
          <SlideMolecule slideContent={slide} index={i} key={uuidv4()} />
        ))}
      </div>
    </div>
  );
}

export default SwiperContainerOrganism;
