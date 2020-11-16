// @flow
// EXTERNAL
/** @jsx jsx */
// $FlowIgnore
import { jsx, css } from "@emotion/core";
import { Fragment } from "react";
import type { Node } from "react";

// DEPENDENCIES
import type { SongProps } from "./song.types";

// STYLES
import { listUI, playingUI, playingPhoto, playingData } from "./song.styles";

function SongMolecule({ mode, data }: SongProps): Node {
  const { name, artist, album } = data;

  function renderListUI() {
    return <div css={[listUI]}>{name}</div>;
  }

  function renderPlayingUI() {
    return (
      <div css={[playingUI]}>
        <div css={[playingPhoto]}>{album}</div>

        <ul css={[playingData]}>
          <li>{name}</li>
          <li>{artist}</li>
        </ul>
      </div>
    );
  }

  return (
    <Fragment>
      {mode === "playing" ? renderPlayingUI() : renderListUI()}
    </Fragment>
  );
}

export default SongMolecule;
