// @flow
// EXTERNAL
import React, { Fragment, useState, useEffect } from "react"; // eslint-disable-line

// DEPENDENCIES
import type { Node } from "react"; // eslint-disable-line
import type { SlideContent } from "shared/types/slide.types";
import type { Playlist, PlaylistsDetail } from "shared/types/spotify.types";
import DatabaseService from "services/database.service";
import PlaylistContainerMolecule from "shared/components/playlist-container/playlist-container.molecule";
import { useQuery } from "react-query";
import { useService } from "@xstate/react";
import { SliderStateService } from "app/authenticated/slider/slider.state";
import SpotifyService from "services/spotify.service";

function useFetchGenres(): {
  genresData: ?Array<any>,
  refetchGenres: Function,
  genresStatus: string,
} {
  const spotifyService = SpotifyService.getInstance();
  const databaseService = DatabaseService.getInstance();
  const [state] = useService(SliderStateService);
  const playlistRefetchTime = state.context.hoursToRefetch.playlists;
  const { data, refetch, status } = useQuery("genresData", getGenresData, {
    refetchInterval: playlistRefetchTime,
    enabled: false,
  });

  async function getGenresData() {
    const genres: ?Array<any> = await databaseService.getPlaylistGenres();

    if (!genres) return;

    return genres;
  }

  return { genresData: data, refetchGenres: refetch, genresStatus: status };
}

export default useFetchGenres;
