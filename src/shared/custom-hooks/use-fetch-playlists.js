// @flow
// EXTERNAL
import React, { Fragment, useState, useEffect } from "react"; // eslint-disable-line

// DEPENDENCIES
import type { Node } from "react"; // eslint-disable-line
import type { PlaylistsDetail } from "shared/types/spotify.types";
import BackendService from "services/backend.service";
import { useQuery } from "react-query";
import { useService } from "@xstate/react";
import { SliderStateService } from "app/authenticated/slider/slider.state";

function useFetchPlaylists(): {
  playlistsData: ?PlaylistsDetail,
  refetchPlaylists: Function,
  playlistsStatus: string,
} {
  const backendService = BackendService.getInstance();
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
    const playlists: ?PlaylistsDetail = await backendService.getUserPlaylists();

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
