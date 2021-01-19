// @flow
// EXTERNAL
import React, { useEffect, Fragment } from "react"; // eslint-disable-line
/** @jsx jsx */
// $FlowIgnore
import { jsx, css } from "@emotion/core"; // eslint-disable-line
import type { Node } from "react";
import type { SlideContent, Playlist } from "shared/types/slide.types";
import type { DbProfile } from "shared/types/spotify.types";

// DEPENDENCIES
import { responsive } from "utils/responsive";
import MusicControllerOrganism from "./music-controller/music-controller.organism";
import HeaderOrganism from "./header/header.organism";
import SliderOrganism from "./slider/slider.organism";
import SpotifyService from "services/spotify.service";
import DatabaseService from "services/database.service";
import SliderService from "services/slider/slider.service";
import SongMolecule from "shared/song/song.molecule";
import PlaylistContainerMolecule from "shared/playlist-container/playlist-container.molecule";
import type { AuthenticatedOrganismProps } from "./authenticated.types";

// STYLES
import {
  container,
  ContainerRow,
  contentListItem,
} from "./authenticated.styles";

const MediaQueries = {
  [responsive("tablet")]: {
    color: "blue",
  },
  [responsive("desktop")]: {
    color: "red",
  },
};

function AuthenticatedOrganism({ onLogout }: AuthenticatedOrganismProps): Node {
  const spotifyService = SpotifyService.getInstance();
  const sliderService = SliderService.getInstance();
  const databaseService = DatabaseService.getInstance();

  function getPlaylistsUI(playlists: Playlist[]): Node {
    const formattedPlaylists = playlists.map((p) => ({
      name: p.name,
      image: p.images[0].url,
    }));

    return <PlaylistContainerMolecule list={formattedPlaylists} />;
  }

  function getSlideContent(
    profile: DbProfile,
    playlists: Playlist[]
  ): SlideContent {
    return {
      data: {
        title: profile.name,
        photo: profile.photo,
        genres: [], //TODO: Get them from playlists
      },
      content: {
        title: "Playlists",
        listUI: getPlaylistsUI(playlists.items),
      },
      menu: ["Playlists"],
    };
  }

  async function addProfileSlide() {
    const profileData: Promise<DbProfile | void> = await databaseService.getProfileData();
    const userPlaylists: Promise<{
      items: Playlist[],
    } | void> = await spotifyService.getPlaylists();

    const slideContent: SlideContent = getSlideContent(
      profileData,
      userPlaylists
    );
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
        <MusicControllerOrganism />
      </ContainerRow>
    </main>
  );
}

export default AuthenticatedOrganism;
