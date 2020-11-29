// @flow
export type SongDataProps = {
  name: string,
  image: string,
  // artist: string,
  // album: string,
};

export type SongProps = {
  mode?: string,
  data: SongDataProps,
};
