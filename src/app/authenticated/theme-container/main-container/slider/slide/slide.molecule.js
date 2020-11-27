// @flow
// EXTERNAL
import React, { Suspense } from "react";
import type { Node } from "react";
// $FlowIgnore
/** @jsx jsx */ import { jsx, css } from "@emotion/core"; // eslint-disable-line

// DEPENDENCIES
import LoadingAtom from "shared/loading/loading.atom";
import SongMolecule from "shared/song/song.molecule";

// STYLES
import { swiperContent, swiperSlide, contentListItem } from "./slide.styles";

const ContentMolecule = React.lazy(() => import("./content/content.molecule"));
const DataMolecule = React.lazy(() => import("./data/data.molecule"));
const MenuMolecule = React.lazy(() => import("./menu/menu.molecule"));

function SlideMolecule({
  slideContent,
  index,
}: {
  slideContent: any,
  index: number,
}): Node {
  const songSampleData = {
    name: "Sex on fire",
    artist: "Kings of Leon",
    album: "I don't know",
  };

  // FIXME: slideContent should come already formatted
  const content = {
    title: slideContent.display_name,
    image: slideContent.images[0].url,
  };

  return (
    <div className="swiper-slide" css={[swiperSlide]}>
      <div className="swiper-content" css={[swiperContent]}>
        <Suspense fallback={<LoadingAtom flex="1.5" />}>
          <DataMolecule content={content} />
        </Suspense>
        <Suspense fallback={<LoadingAtom flex="2" />}>
          <ContentMolecule>
            Page {index + 1}
            <ul>
              <li css={[contentListItem]}>
                <SongMolecule data={songSampleData} />
              </li>
            </ul>
          </ContentMolecule>
        </Suspense>
        <Suspense fallback={<LoadingAtom flex="1" />}>
          <MenuMolecule />
        </Suspense>
      </div>
    </div>
  );
}

export default SlideMolecule;
