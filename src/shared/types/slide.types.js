// @flow
import type { Node } from "react"; // eslint-disable-line

export type DataContent = {
  title: string,
  photo: string,
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
