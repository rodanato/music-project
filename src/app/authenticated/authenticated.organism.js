// @flow
// EXTERNAL
import React, { useEffect, Fragment } from "react"; // eslint-disable-line
/** @jsx jsx */
// $FlowIgnore
import { jsx, css } from "@emotion/core"; // eslint-disable-line

// DEPENDENCIES
import type { Node } from "react";
import type { AuthenticatedOrganismProps } from "./authenticated.types";
import { responsive } from "utils/responsive";
import MusicControllerOrganism from "./music-controller/music-controller.organism";
import HeaderOrganism from "./header/header.organism";
import SliderOrganism from "./slider/slider.organism";
import DatabaseService from "services/database.service";

// STYLES
import { container, ContainerRow } from "./authenticated.styles";

const MediaQueries = {
  [responsive("tablet")]: {
    color: "blue",
  },
  [responsive("desktop")]: {
    color: "red",
  },
};

function AuthenticatedOrganism({ onLogout }: AuthenticatedOrganismProps): Node {
  const databaseService = DatabaseService.getInstance();

  useEffect(() => {
    databaseService.saveLoginTime();
  }, []);

  return (
    <main css={[container]}>
      <ContainerRow css={MediaQueries}>
        <button onClick={() => onLogout()}>Logout here</button>
        <HeaderOrganism />
      </ContainerRow>

      <ContainerRow content>
        <SliderOrganism />
      </ContainerRow>

      <ContainerRow>
        <MusicControllerOrganism />
      </ContainerRow>
    </main>
  );
}

export default AuthenticatedOrganism;
