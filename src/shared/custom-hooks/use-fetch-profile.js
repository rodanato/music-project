// @flow
// EXTERNAL
import React, { Fragment, useState, useEffect } from "react"; // eslint-disable-line

// DEPENDENCIES
import type { Node } from "react"; // eslint-disable-line
import type { DbProfile } from "shared/types/spotify.types";
import BackendService from "services/backend.service";
import { useQuery } from "react-query";
import { useService } from "@xstate/react";
import { SliderStateService } from "app/authenticated/slider/slider.state";

function useFetchProfile(): {
  profileData: ?DbProfile,
  refetchProfile: Function,
  profileStatus: string,
} {
  const backendService = BackendService.getInstance();
  const [state] = useService(SliderStateService);
  const profileRefetchTime = state.context.hoursToRefetch.profile;
  const { data, refetch, status } = useQuery("profileData", getProfileData, {
    refetchInterval: profileRefetchTime,
    enabled: false,
  });

  async function getProfileData() {
    const profileData: ?DbProfile = await backendService.getProfileData();

    if (!profileData) return;

    return profileData;
  }

  return { profileData: data, refetchProfile: refetch, profileStatus: status };
}

export default useFetchProfile;
