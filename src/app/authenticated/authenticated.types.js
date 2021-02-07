// @flow
import * as React from "react";

export type ContainerRowProps = {
  content?: boolean,
};
export type DivProps = {
  className?: string,
  content?: ?boolean,
  text?: string,
  children?: React.Node,
};

export type AuthenticatedOrganismProps = {
  onLogout: () => mixed,
};
