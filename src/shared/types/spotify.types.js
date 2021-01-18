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
