// @flow
// EXTERNAL
import React, { Fragment, useState, useEffect } from "react"; // eslint-disable-line

// DEPENDENCIES
import type { Node } from "react"; // eslint-disable-line
import DatabaseService from "services/database.service";
import { useQuery } from "react-query";
import { useService } from "@xstate/react";
import { SliderStateService } from "app/authenticated/slider/slider.state";

function useFetchGenres(): {
  genresData: ?Array<any>,
  refetchGenres: Function,
  genresStatus: string,
} {
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
