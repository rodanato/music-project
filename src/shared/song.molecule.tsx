/** @jsx jsx */
import { jsx, css } from '@emotion/core'; // eslint-disable-line
import { Fragment } from 'react';

type SongProps = {
  mode?: string;
  data: SongDataProps;
};

type SongDataProps = {
  name: string;
  artist: string;
  album: string;
}

const ListUI = css`

`

const PlayingUI = css`
  display: flex;
`

const PlayingPhoto = css`
  background: #000;
  height: 100px;
  margin-right: 10px;
  min-width: 100px;
`

const PlayingData = css`
  display: flex;
  flex: 3;
  flex-direction: column;
  text-transform: capitalize;
`

function SongMolecule({ mode, data }: SongProps) {
  const { name, artist, album } = data;

  function renderListUI() {
    return (
      <div css={ListUI}>
        {name}
      </div>
    );
  }

  function renderPlayingUI() {
    return (
      <div css={PlayingUI}>
        <div css={PlayingPhoto}>
          {album}
        </div>

        <ul css={PlayingData}>
          <li>{name}</li>
          <li>{artist}</li>
        </ul>
      </div>
    );
  }

  return (
    <Fragment>
      {mode === "playing"
        ? renderPlayingUI()
        : renderListUI()
      }
    </Fragment>
  );
}

export default SongMolecule;
