// @flow
// EXTERNAL
import React, { Suspense } from "react";
import type { Node } from "react";
// $FlowIgnore
/** @jsx jsx */ import { jsx, css } from "@emotion/core"; // eslint-disable-line
import type { SlideContent } from "shared/types/slide.types";

// DEPENDENCIES
import LoadingAtom from "shared/loading/loading.atom";

// STYLES
import { swiperContent, swiperSlide } from "./slide.styles";

const ContentMolecule = React.lazy(() => import("./content/content.molecule"));
const DataMolecule = React.lazy(() => import("./data/data.molecule"));
const MenuMolecule = React.lazy(() => import("./menu/menu.molecule"));

function SlideMolecule({ slideContent }: { slideContent: SlideContent }): Node {
  // const songSampleData = {
  //   name: "Sex on fire",
  //   artist: "Kings of Leon",
  //   album: "I don't know",
  // };

  return (
    <div className="swiper-slide" css={[swiperSlide]}>
      <div className="swiper-content" css={[swiperContent]}>
        <Suspense fallback={<LoadingAtom flex="1.5" />}>
          <DataMolecule content={slideContent.data} />
        </Suspense>
        <Suspense fallback={<LoadingAtom flex="2" />}>
          <ContentMolecule title={slideContent.content.title}>
            {slideContent.content.listUI}
          </ContentMolecule>
        </Suspense>
        <Suspense fallback={<LoadingAtom flex="1" />}>
          <MenuMolecule content={slideContent.menu} />
        </Suspense>
      </div>
    </div>
  );
}

export default SlideMolecule;
