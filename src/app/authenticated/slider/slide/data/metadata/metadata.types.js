// @flow
import type { Node } from "react";

export type DataProps = {
  title: string,
  subtitle: Node | string,
};

export type MetadataProps = {
  data: DataProps,
};
