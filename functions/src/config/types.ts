
export type Profile = {
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
  uri: string
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