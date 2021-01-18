// @flow
// EXTERNAL
import React, { useEffect, Fragment } from "react"; // eslint-disable-line
/** @jsx jsx */
// $FlowIgnore
import { jsx, css } from "@emotion/core"; // eslint-disable-line
import type { Node } from "react";
import type { SlideContent, Playlist } from "shared/types/slide.types";
import type { DbProfile } from "shared/types/spotify.types";
import { v4 as uuidv4 } from "uuid";

// DEPENDENCIES
import { responsive } from "utils/responsive";
import FooterOrganism from "./footer/footer.organism";
import HeaderOrganism from "./header/header.organism";
import SliderOrganism from "./slider/slider.organism";
import SpotifyService from "services/spotify.service";
import DatabaseService from "services/database.service";
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

function MainContainerOrganism({ onLogout }: MainContainerOrganismProps): Node {
  const spotifyService = SpotifyService.getInstance();
  const sliderService = SliderService.getInstance();
  const databaseService = DatabaseService.getInstance();

  function playlistsUI(playlists: Playlist[]): Node {
    const formattedPlaylists = playlists.map((p) => ({
      name: p.name,
      image: p.images[0].url,
    }));

    return (
      <ul style={{ display: "flex", flexWrap: "wrap", overflow: "scroll" }}>
        {formattedPlaylists.map((p) => (
          <li css={[contentListItem]} key={uuidv4()}>
            <SongMolecule data={p} mode="photo" />
          </li>
        ))}
      </ul>
    );
  }

  async function addProfileSlide() {
    let profileData: Promise<DbProfile | void> = await databaseService.getProfileData();
    let userPlaylists: Promise<{
      items: Playlist[],
    } | void> = await spotifyService.getPlaylists();

    // const content = await Promise.all([
    //   (profileData = ),
    //   (userPlaylists = await spotifyService.getPlaylists()),
    // ]);

    const slideContent: SlideContent = {
      data: {
        title: profileData.name,
        photo: profileData.photo,
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
