// @flow
// EXTERNAL
import React, { useEffect, Fragment } from "react"; // eslint-disable-line
/** @jsx jsx */
// $FlowIgnore
import { jsx, css } from "@emotion/core"; // eslint-disable-line
// import { QueryClient, QueryClientProvider } from "react-query";

// DEPENDENCIES
import type { Node } from "react";
import type { AuthenticatedOrganismProps } from "./authenticated.types";
import { responsive } from "utils/responsive";
import MusicControllerOrganism from "./music-controller/music-controller.organism";
import HeaderOrganism from "./header/header.organism";
import SliderOrganism from "./slider/slider.organism";

// STYLES
import { container, ContainerRow } from "./authenticated.styles";
// const queryClient = new QueryClient();

const MediaQueries = {
  [responsive("tablet")]: {
    color: "blue",
  },
  [responsive("desktop")]: {
    color: "red",
  },
};

// const SliderOrganism = React.lazy(() => import("./slider/slider.organism"));

function AuthenticatedOrganism({ onLogout }: AuthenticatedOrganismProps): Node {
  return (
    <main css={[container]}>
      <ContainerRow css={MediaQueries}>
        <button onClick={() => onLogout()}>Logout here</button>
        <HeaderOrganism />
      </ContainerRow>

      <ContainerRow content>
        {/* <QueryClientProvider client={queryClient}> */}
        <SliderOrganism />
        {/* </QueryClientProvider> */}
      </ContainerRow>

      <ContainerRow>
        <MusicControllerOrganism />
      </ContainerRow>
    </main>
  );
}

export default AuthenticatedOrganism;
