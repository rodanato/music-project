// @flow
// EXTERNAL
import React from "react"; // eslint-disable-line
import type { Node } from "react";
/** @jsx jsx */
// $FlowIgnore
import { jsx, css } from "@emotion/core"; // eslint-disable-line

// DEPENDENCIES
import CardAtom from "shared/components/card/card.atom";
import GenresMolecule from "./genres/genres.molecule";
import MainImageAtom from "./data-main-image/data-main-image.atom";
import MetadataMolecule from "./metadata/metadata.molecule";

// STYLES
import { data } from "./data.styles";

function DataMolecule({ content }: { content: any }): Node {
  return (
    <section css={[data]} className="mpp-show-slowly">
      <h1>{content.title}</h1>
      <CardAtom paddingLess>
        <MainImageAtom
          url={content.photo || "https://dummyimage.com/500x500/000000/fff"}
        />
      </CardAtom>

      {content.metadata ? (
        <CardAtom>
          <MetadataMolecule data={content.metadata} />
        </CardAtom>
      ) : null}

      {content.genres.length > 0 ? (
        <CardAtom>
          <GenresMolecule genres={content.genres} />
        </CardAtom>
      ) : null}
    </section>
  );
}

export default DataMolecule;
