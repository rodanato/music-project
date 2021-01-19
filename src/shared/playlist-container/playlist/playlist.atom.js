// @flow

// EXTERNAL
import React from "react"; // eslint-disable-line
/** @jsx jsx */
// $FlowIgnore
import { jsx, css } from "@emotion/core"; // eslint-disable-line
import type { Node } from "react";

// DEPENDENCIES
import type { PlaylistProps } from "./playlist.types";
import SongMolecule from "shared/song/song.molecule";

// STYLES
import { Playlist } from "./playlist.styles";

function PlaylistAtom(props: PlaylistProps): Node {
  return (
    <li css={[Playlist]}>
      <SongMolecule data={props.data} mode="photo" />
    </li>
  );
}

export default PlaylistAtom;
