// @flow
// EXTERNAL
import React, { Fragment, useState, useEffect } from "react"; // eslint-disable-line

// DEPENDENCIES
import type { Node } from "react"; // eslint-disable-line
import type {
  DbProfile,
  Playlist,
  PlaylistsDetail,
} from "shared/types/spotify.types";
import DatabaseService from "services/database.service";
import PlaylistContainerMolecule from "shared/components/playlist-container/playlist-container.molecule";
import { useQuery } from "react-query";
import { useService } from "@xstate/react";
import { SliderStateService } from "app/authenticated/slider/slider.state";

function useFetchProfile(): {
  profileData: ?DbProfile,
} {
  const databaseService = DatabaseService.getInstance();
  const [state] = useService(SliderStateService);
  const profileRefetchTime = state.context.hoursToRefetch.profile;
  const { data } = useQuery("profileData", getProfileData, {
    refetchInterval: profileRefetchTime,
  });

  async function getProfileData() {
    const profileData: ?DbProfile = await databaseService.getProfileData();

    if (!profileData) return;

    return profileData;
  }

  return { profileData: data };
}

export default useFetchProfile;
