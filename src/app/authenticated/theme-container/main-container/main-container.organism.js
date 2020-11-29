// @flow
// EXTERNAL
import React, { useEffect, Fragment } from "react"; // eslint-disable-line
/** @jsx jsx */
// $FlowIgnore
import { jsx, css } from "@emotion/core"; // eslint-disable-line
import type { Node } from "react";
import type { SlideContent } from "shared/types/slide.types";
import { v4 as uuidv4 } from "uuid";

// DEPENDENCIES
import { responsive } from "utils/responsive";
import FooterOrganism from "./footer/footer.organism";
import HeaderOrganism from "./header/header.organism";
import SliderOrganism from "./slider/slider.organism";
import SpotifyService from "services/spotify.service";
import SliderService from "services/slider/slider.service";
import SongMolecule from "shared/song/song.molecule";

// STYLES
import {
  container,
  ContainerRow,
  contentListItem,
} from "./main-container.styles";

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

type Playlist = {
  name: string,
  images: any[],
};

function MainContainerOrganism({ onLogout }: MainContainerOrganismProps): Node {
  const spotifyService = SpotifyService.getInstance();
  const sliderService = SliderService.getInstance();

  function playlistsUI(playlists: Playlist[]): Node {
    const formattedPlaylists = playlists.map((p) => ({
      name: p.name,
      image: p.images[0].url,
    }));

    return (
      <ul>
        <li css={[contentListItem]}>
          {formattedPlaylists.map((p) => (
            <SongMolecule key={uuidv4()} data={p} mode="photo" />
          ))}
        </li>
      </ul>
    );
  }

  async function addProfileSlide() {
    let profileData: any;
    let userPlaylists: any;

    const content = await Promise.all([
      (profileData = await spotifyService.getProfile()),
      (userPlaylists = await spotifyService.getPlaylists()),
    ]);

    const slideContent: SlideContent = {
      data: {
        title: profileData.display_name,
        image: profileData.images[0].url,
        genres: [], //TODO: Get them from playlists
      },
      content: {
        title: "Playlists",
        listUI: playlistsUI(userPlaylists.items),
      },
      menu: ["Playlists"],
    };

    sliderService.addSlide(slideContent);
  }

  useEffect(() => {
    addProfileSlide();
  }, []);

  return (
    <main css={[container]}>
      <ContainerRow css={MediaQueries}>
        <button
          onClick={async () => {
            addProfileSlide();
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
