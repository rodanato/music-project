// @flow
// EXTERNAL
import React, { useEffect, Fragment } from "react"; // eslint-disable-line
/** @jsx jsx */
// $FlowIgnore
import { jsx, css } from "@emotion/core"; // eslint-disable-line
import type { Node } from "react";

// DEPENDENCIES
import { responsive } from "utils/responsive";
import FooterOrganism from "./footer/footer.organism";
import HeaderOrganism from "./header/header.organism";
import SliderOrganism from "./slider/slider.organism";
import SpotifyService from "services/spotify.service";

// STYLES
import { container, ContainerRow } from "./main-container.styles";

const MediaQueries = {
  [responsive("tablet")]: {
    color: "blue",
  },
  [responsive("desktop")]: {
    color: "red",
  },
};

type MainContainerOrganismProps = {
  onLogout: () => mixed,
};

function MainContainerOrganism({ onLogout }: MainContainerOrganismProps): Node {
  const spotifyService = SpotifyService.getInstance();

  return (
    <main css={[container]}>
      <ContainerRow css={MediaQueries}>
        <button
          onClick={async () => {
            console.log(">>> profile: ", await spotifyService.getProfile());
          }}
        >
          GET PROFILE
        </button>

        <button onClick={() => onLogout()}>Logout here</button>
        <HeaderOrganism />
      </ContainerRow>

      <ContainerRow content>
        <SliderOrganism />
      </ContainerRow>

      <ContainerRow>
        <FooterOrganism />
      </ContainerRow>
    </main>
  );
}

export default MainContainerOrganism;
