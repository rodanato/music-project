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
        <DataMolecule content={slideContent.data} />
        <ContentMolecule title={slideContent.content.title}>
          {slideContent.content.listUI}
        </ContentMolecule>
        <MenuMolecule content={slideContent.menu} />
      </div>
    </div>
  );
}

export default SlideMolecule;
