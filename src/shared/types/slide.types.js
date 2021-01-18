// @flow
export type DataContent = {
  image: string,
  metadata?: {
    title: string,
    subtitle?: Node,
    description?: Node,
  },
  genres: string[],
};
export type Content = {
  title: string,
  listUI: Node,
};

export type SlideContent = {
  data: DataContent,
  content: Content,
  menu: string[],
};

export type Playlist = {
  name: string,
  images: any[],
};
