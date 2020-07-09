export type SongProps = {
  mode?: string;
  data: SongDataProps;
};

export type SongDataProps = {
  name: string;
  artist: string;
  album: string;
}