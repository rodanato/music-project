// @flow
export type DbProfile = {
  name: string,
  email: string,
  photo: string,
  spotifyId: string,
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
  tracks: {
    href: string,
    total: number,
  },
};

export type Playlists = {
  items: Playlist[],
  limit: Number,
  previous: string,
  next: string,
  total: number,
};
