// @flow
// EXTERNAL
import React, { Fragment, useState, useEffect } from "react"; // eslint-disable-line

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
  const [state, setState] = useState("notStarted");
  const [profileData, setData] = useState();

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

    setData(getSlideContent(profileData, userPlaylists));
  }

  useEffect(() => {
    if (state === "isLoading" && profileData) {
      setState("done");
      setData(null);
    }

    if (state === "isLoading" && !profileData) {
      getProfileSlideContent();
    }
  }, [state, profileData]);

  useEffect(() => {
    setState("isLoading");
  }, []);

  return { profileData, state };
}

export default useProfileSlide;
