// @flow
// EXTERNAL
import React from "react"; // eslint-disable-line
/** @jsx jsx */
// $FlowIgnore
import { jsx, css } from "@emotion/core"; // eslint-disable-line
import type { Node } from "react";

// DEPENDENCIES
import CardAtom from "shared/components/card/card.atom";
import type { ContentProps } from "./content.types";
import type { Playlist } from "shared/types/spotify.types";
import PlaylistContainerMolecule from "shared/components/playlist-container/playlist-container.molecule";

// STYLES
import { contentContainer, content } from "./content.styles";

function getPlaylistsUI(playlistsItems: Playlist[]): Node {
  const formattedPlaylists = playlistsItems.map((p) => ({
    name: p.name,
    image: p.images[0].url,
  }));

  return <PlaylistContainerMolecule list={formattedPlaylists} />;
}

function ContentMolecule(props: ContentProps): Node {
  return (
    <div css={[contentContainer]} className="mpp-show-slowly">
      <CardAtom fullheight>
        <div css={[content]}>
          <h1>{props.title}</h1>
          {getPlaylistsUI(props.children)}
        </div>
      </CardAtom>
    </div>
  );
}

export default ContentMolecule;
