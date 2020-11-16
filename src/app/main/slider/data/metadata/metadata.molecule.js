// @flow
// EXTERNAL
import React from "react"; // eslint-disable-line
/** @jsx jsx */
// $FlowIgnore
import { jsx, css } from "@emotion/core"; // eslint-disable-line

// DEPENDENCIES
import MetadataAuthorAtom from "./metadata-author/metadata-author.atom";
import MetadataTitleAtom from "./metadata-title/metadata-title.atom";
import type { MetadataProps } from "./metadata.types";

// STYLES

function MetadataMolecule(props: MetadataProps) {
  const { title, author } = props.data;
  return (
    <section>
      <MetadataTitleAtom titleName={title} />
      <MetadataAuthorAtom authorName={author} />
    </section>
  );
}

export default MetadataMolecule;
