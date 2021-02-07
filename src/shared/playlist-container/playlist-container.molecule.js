// @flow

// EXTERNAL
import React from "react"; // eslint-disable-line
/** @jsx jsx */
// $FlowIgnore
import { jsx, css } from "@emotion/core"; // eslint-disable-line
import type { Node } from "react";
import { v4 as uuidv4 } from "uuid";

// DEPENDENCIES
import type { PlaylistContainerProps } from "./playlist-container.types";
import PlaylistAtom from "./playlist/playlist.atom";

// STYLES
import { playlistContainer } from "./playlist-container.styles";

function PlaylistContainerMolecule(props: PlaylistContainerProps): Node {
  return (
    <ul css={[playlistContainer]}>
      {props.list.map((playlist) => (
        <PlaylistAtom data={playlist} key={uuidv4()} />
      ))}
    </ul>
  );
}

export default PlaylistContainerMolecule;
