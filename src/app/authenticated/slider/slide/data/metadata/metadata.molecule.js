// @flow
// EXTERNAL
import React from "react"; // eslint-disable-line
import type { Node } from "react"; // eslint-disable-line
/** @jsx jsx */
// $FlowIgnore
import { jsx, css } from "@emotion/core"; // eslint-disable-line

// DEPENDENCIES
import MetadataSubtitleAtom from "./metadata-subtitle/metadata-subtitle.atom";
import MetadataTitleAtom from "./metadata-title/metadata-title.atom";
import type { MetadataProps } from "./metadata.types";

// STYLES

function MetadataMolecule(props: MetadataProps): Node {
  const { title, subtitle } = props.data;
  return (
    <section>
      <MetadataTitleAtom titleName={title} />
      <MetadataSubtitleAtom subtitle={subtitle} />
    </section>
  );
}

export default MetadataMolecule;
