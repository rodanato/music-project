// @flow
// EXTERNAL
import React, { Fragment, useState, useEffect } from "react"; // eslint-disable-line

// DEPENDENCIES
import type { Node } from "react"; // eslint-disable-line
import type { SlideContent } from "shared/types/slide.types";
import type { DbProfile, Playlists } from "shared/types/spotify.types";
import DatabaseService from "services/database.service";
import PlaylistContainerMolecule from "shared/playlist-container/playlist-container.molecule";
import { useQuery, refetchInterval } from "react-query";
import { useService } from "@xstate/react";
import { SliderStateService } from "app/authenticated/slider/slider.state";

function useProfileSlide(): {
  data: any,
} {
  const databaseService = DatabaseService.getInstance();
  const [state] = useService(SliderStateService);
  const playlistRefetchTime = state.context.hoursToRefetch.playlists;
  const { isLoading, isError, data, error } = useQuery(
    "profileSlide",
    getProfileSlideContent,
    {
      refetchInterval: playlistRefetchTime,
    }
  );

  function getPlaylistsUI(playlists: Playlist[]): Node {
    const formattedPlaylists = playlists.map((p) => ({
      name: p.name,
      image: p.images[0].url,
    }));

    return <PlaylistContainerMolecule list={formattedPlaylists} />;
  }

  function getSlideContent(
    profile: DbProfile,
    playlists: Playlists
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

  async function getProfileSlideContent() {
    const profileData: Promise<DbProfile | void> = await databaseService.getProfileData();
    const userPlaylists: Promise<{
      items: Playlists,
    } | void> = await databaseService.getUserPlaylists();

    return getSlideContent(profileData, userPlaylists);
  }

  return { data };
}

export default useProfileSlide;
