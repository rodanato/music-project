// @flow
// EXTERNAL
import React, { Fragment, useState, useEffect } from "react"; // eslint-disable-line
import { useQuery } from "react-query";

// DEPENDENCIES
import type { Node } from "react"; // eslint-disable-line
import type { SlideContent } from "shared/types/slide.types";
import type { DbProfile, Playlist } from "shared/types/spotify.types";
import DatabaseService from "services/database.service";
import PlaylistContainerMolecule from "shared/playlist-container/playlist-container.molecule";

function useProfileSlide(): {
  getProfileSlideContent: Function,
} {
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

  async function getProfileSlideContent() {
    const profileData: Promise<DbProfile | void> = await databaseService.getProfileData();
    const userPlaylists: Promise<{
      items: Playlist[],
    } | void> = await databaseService.getUserPlaylists();

    return getSlideContent(profileData, userPlaylists);
  }

  const { isLoading, isError, data, error } = useQuery(
    "profileSlideContent",
    () => getProfileSlideContent()
  );

  return { isLoading, isError, data, error };
}

export default useProfileSlide;
