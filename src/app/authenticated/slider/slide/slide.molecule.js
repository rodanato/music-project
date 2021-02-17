// @flow
// EXTERNAL
import React from "react"; // eslint-disable-line
import type { Node } from "react";
// $FlowIgnore
/** @jsx jsx */ import { jsx, css } from "@emotion/core"; // eslint-disable-line
import type { SlideContent } from "shared/types/slide.types";

// DEPENDENCIES
import ContentMolecule from "./content/content.molecule";
import DataMolecule from "./data/data.molecule";
import MenuMolecule from "./menu/menu.molecule";
import LoadingAtom from "shared/components/loading/loading.atom";

// STYLES
import { swiperContent, swiperSlide } from "./slide.styles";

function SlideMolecule({ slideContent }: { slideContent: SlideContent }): Node {
  // const songSampleData = {
  //   name: "Sex on fire",
  //   artist: "Kings of Leon",
  //   album: "I don't know",
  // };

  return (
    <div className="swiper-slide" css={[swiperSlide]}>
      <div className="swiper-content" css={[swiperContent]}>
        {slideContent.data ? (
          <DataMolecule content={slideContent.data} />
        ) : (
          <LoadingAtom flex="1.5" />
        )}
        {slideContent.content && slideContent.content.listUI.length > 0 ? (
          <ContentMolecule title={slideContent.content.title}>
            {slideContent.content.listUI}
          </ContentMolecule>
        ) : (
          <LoadingAtom flex="2" />
        )}
        {slideContent.menu.length > 0 ? (
          <MenuMolecule content={slideContent.menu} />
        ) : (
          <LoadingAtom flex="1" />
        )}
      </div>
    </div>
  );
}

export default SlideMolecule;
