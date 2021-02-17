// @flow
// EXTERNAL
import React, { Fragment, useState, useEffect } from "react"; // eslint-disable-line

// DEPENDENCIES
import type { Node } from "react"; // eslint-disable-line
import type { Playlist } from "shared/types/spotify.types";
import DatabaseService from "services/database.service";
import { useQuery } from "react-query";
import { useService } from "@xstate/react";
import { SliderStateService } from "app/authenticated/slider/slider.state";

function useFetchPlaylists(): {
  playlistsData: ?Array<Playlist>,
  refetchPlaylists: Function,
  playlistsStatus: string,
} {
  const databaseService = DatabaseService.getInstance();
  const [state] = useService(SliderStateService);
  const playlistRefetchTime = state.context.hoursToRefetch.playlists;
  const { data, refetch, status } = useQuery(
    "playlistsData",
    getPlaylistsData,
    {
      refetchInterval: playlistRefetchTime,
      enabled: false,
    }
  );

  async function getPlaylistsData() {
    const playlists: ?Array<Playlist> = await databaseService.getUserPlaylists();

    if (!playlists) return;

    return playlists;
  }

  return {
    playlistsData: data,
    refetchPlaylists: refetch,
    playlistsStatus: status,
  };
}

export default useFetchPlaylists;
