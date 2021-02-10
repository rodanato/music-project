// @flow
// EXTERNAL
import React, { Fragment, useState, useEffect } from "react"; // eslint-disable-line

// DEPENDENCIES
import type { Node } from "react"; // eslint-disable-line
import type { SlideContent } from "shared/types/slide.types";
import type {
  DbProfile,
  Playlist,
  PlaylistsDetail,
} from "shared/types/spotify.types";
import DatabaseService from "services/database.service";
import PlaylistContainerMolecule from "shared/playlist-container/playlist-container.molecule";
import { useQuery } from "react-query";
import { useService } from "@xstate/react";
import { SliderStateService } from "app/authenticated/slider/slider.state";

function useProfileSlide(): {
  data: any,
} {
  const databaseService = DatabaseService.getInstance();
  const [state] = useService(SliderStateService);
  const playlistRefetchTime = state.context.hoursToRefetch.playlists;
  const { data } = useQuery("profileSlide", getProfileSlideContent, {
    refetchInterval: playlistRefetchTime,
  });

  function getPlaylistsUI(playlistsItems: Playlist[]): Node {
    const formattedPlaylists = playlistsItems.map((p) => ({
      name: p.name,
      image: p.images[0].url,
    }));

    return <PlaylistContainerMolecule list={formattedPlaylists} />;
  }

  function formatSlideContent(
    profile: DbProfile,
    playlistsItems: Playlist[]
  ): SlideContent {
    return {
      data: {
        title: profile.name,
        photo: profile.photo,
        genres: [], //TODO: Get them from playlists
      },
      content: {
        title: "Playlists",
        listUI: getPlaylistsUI(playlistsItems),
      },
      menu: ["Playlists"],
    };
  }

  async function getGenres() {
    const genres: ?Array<any> = await databaseService.getPlaylistGenres();
    console.log(">>> genres", genres);
  }

  async function getProfileSlideContent() {
    const profileData: ?DbProfile = await databaseService.getProfileData();
    const playlists: ?Array<Playlist> = await databaseService.getUserPlaylists();
    getGenres();

    if (!profileData || !playlists) return;

    return formatSlideContent(profileData, playlists);
  }

  return { data };
}

export default useProfileSlide;
