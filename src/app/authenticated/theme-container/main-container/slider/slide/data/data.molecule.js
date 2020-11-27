// @flow
// EXTERNAL
import React from "react";
import type { Node } from "react";

// DEPENDENCIES
import CardAtom from "shared/card/card.atom";
import GenresMolecule from "./genres/genres.molecule";
import MainImageAtom from "./data-main-image/data-main-image.atom";
import MetadataMolecule from "./metadata/metadata.molecule";

// STYLES
import { data } from "./data.styles";

const metadataSampleData = {
  title: "Only by the night",
  author: "Kings of Leon",
};
const genresSampleData = ["Rock", "Progressive Rock", "Indie", "Soft Rock"];

function DataMolecule({ content }: { content: any }): Node {
  return (
    <section css={[data]} className="mpp-show-slowly">
      <h1>{content.title}</h1>
      <CardAtom paddingLess>
        <MainImageAtom
          url={content.image || "https://dummyimage.com/500x500/000000/fff"}
        />
      </CardAtom>

      <CardAtom>
        <MetadataMolecule data={metadataSampleData} />
      </CardAtom>

      <CardAtom>
        <GenresMolecule genres={genresSampleData} />
      </CardAtom>
    </section>
  );
}

export default DataMolecule;
