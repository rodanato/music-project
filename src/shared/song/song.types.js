// @flow
export type SongDataProps = {
  name: string,
  artist: string,
  album: string,
};

export type SongProps = {
  mode?: string,
  data: SongDataProps,
};
