// @flow
export type DbProfile = {
  name: string,
  email: string,
  photo: string,
  spotifyId: string,
  theme: string,
};

export type SpotifyProfile = {
  country: string,
  display_name: string,
  email: string,
  explicit_content: {},
  external_urls: {},
  followers: {},
  href: string,
  id: string,
  images: any[],
  product: string,
  type: string,
  uri: string,
};

export type Playlist = {
  name: string,
  images: any[],
  description: string,
  id: string,
};

export type PlaylistsDetail = {
  items: Playlist[],
  genres: Genre[],
  total: number,
  limit: number,
  previous?: string,
  next?: string,
};

export type Genre = string;
