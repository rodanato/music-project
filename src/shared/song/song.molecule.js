// @flow
// EXTERNAL
/** @jsx jsx */
// $FlowIgnore
import { jsx, css } from "@emotion/core"; // eslint-disable-line
import { Fragment } from "react";
import type { Node } from "react";

// DEPENDENCIES
import type { SongProps } from "./song.types";

// STYLES
import { listUI, playingUI, playingPhoto, playingData } from "./song.styles";

function SongMolecule({ mode, data }: SongProps): Node {
  const { name, image } = data;

  function renderListUI() {
    return <div css={[listUI]}>{name}</div>;
  }

  function renderPlayingUI() {
    return (
      <div css={[playingUI]}>
        <div css={[playingPhoto]}>
          <img src={image} />
        </div>

        <ul css={[playingData]}>
          <li>{name}</li>
          {/* <li>{artist}</li> */}
        </ul>
      </div>
    );
  }

  return (
    <Fragment>{mode === "photo" ? renderPlayingUI() : renderListUI()}</Fragment>
  );
}

export default SongMolecule;
