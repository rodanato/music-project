// @flow
// EXTERNAL
import React, { useEffect, Suspense, Fragment } from "react"; // eslint-disable-line
import type { Node } from "react";
// $FlowIgnore
/** @jsx jsx */ import { jsx, css } from "@emotion/core"; // eslint-disable-line
// $FlowIgnore
import { v4 as uuidv4 } from "uuid";

// DEPENDENCIES
import SlideMolecule from "../slide/slide.molecule";
import { swiperContainer } from "./swiper-container.styles";
import LoadingAtom from "shared/loading/loading.atom";

function SwiperContainerOrganism({ slideList }: { slideList: any[] }): Node {
  function SliderFallback(): Node {
    return (
      <Fragment>
        <LoadingAtom flex="1.5" />
        <LoadingAtom flex="2" />
        <LoadingAtom flex="1" />
      </Fragment>
    );
  }

  return (
    <div className="swiper-container" css={[swiperContainer]}>
      <div className="swiper-wrapper">
        {slideList.length > 0 ? (
          slideList.map((slide, i) => (
            <SlideMolecule slideContent={slide} index={i} key={uuidv4()} />
          ))
        ) : (
          <div className="swiper-slide" css={{ display: "flex" }}>
            <SliderFallback />
          </div>
        )}
      </div>
    </div>
  );
}

export default React.memo(SwiperContainerOrganism);
