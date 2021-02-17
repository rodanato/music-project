// @flow
// EXTERNAL
import React, { Fragment, useState, useEffect, useRef } from "react"; // eslint-disable-line

// DEPENDENCIES
import type { Node } from "react"; // eslint-disable-line
import type { SlideContent } from "shared/types/slide.types";
import SliderService from "services/slider.service";
import { useQuery } from "react-query";
import { useService } from "@xstate/react";
import { SliderStateService } from "app/authenticated/slider/slider.state";
import useFetchProfile from "shared/custom-hooks/use-fetch-profile";
import useFetchPlaylists from "shared/custom-hooks/use-fetch-playlists";
import useFetchGenres from "shared/custom-hooks/use-fetch-genres";

type FeatureProps = {
  feature: string,
  status: string,
  data: any,
  refetch: Function,
  newContent: SlideContent,
};

function useLoadProfile(): {
  loadProfileSlide: Function,
} {
  const { profileData, refetchProfile, profileStatus } = useFetchProfile();
  const {
    playlistsData,
    refetchPlaylists,
    playlistsStatus,
  } = useFetchPlaylists();
  const { genresData, refetchGenres, genresStatus } = useFetchGenres();
  const [state, send] = useService(SliderStateService);
  const sliderService = SliderService.getInstance();
  const started = useRef(false);
  const list = state.context.list;
  const dataLoaded = useRef({
    profile: false,
    playlists: false,
    genres: false,
  });

  function addEmptySlide() {
    if (list.length > 0) sliderService.addEmptySlide();
  }

  function start() {
    started.current = true;
    addSlide();
  }

  function addSlide() {
    const baseContent = {
      data: {
        genres: [],
      },
      content: {
        listUI: [],
      },
      menu: [],
    };
    send("ADD_SLIDE", { slide: baseContent });
  }

  function loadProfile() {
    const newContent = {
      data: {
        title: "",
        photo: "",
      },
    };

    if (profileData) {
      newContent.data.title = profileData.name;
      newContent.data.photo = profileData.photo;
    }

    const featureProps = {
      feature: "profile",
      status: profileStatus,
      data: profileData,
      refetch: refetchProfile,
      newContent,
    };
    loadFeature(featureProps);
  }

  function loadPlaylists() {
    const newContent = {
      content: {
        listUI: [],
        title: "",
      },
    };

    if (playlistsData) {
      newContent.content.listUI = playlistsData;
      newContent.content.title = "Playlists";
    }

    const featureProps = {
      feature: "playlists",
      status: playlistsStatus,
      data: playlistsData,
      refetch: refetchPlaylists,
      newContent,
    };
    loadFeature(featureProps);
  }

  function loadGenres() {
    const newContent = {
      data: {
        genres: [],
      },
    };

    if (genresData) newContent.data.genres = genresData;

    const featureProps = {
      feature: "genres",
      status: genresStatus,
      data: genresData,
      refetch: refetchGenres,
      newContent,
    };
    loadFeature(featureProps);
  }

  function loadFeature({
    feature,
    status,
    data,
    refetch,
    newContent,
  }: FeatureProps) {
    if (status === "success" && data) {
      dataLoaded.current[feature] = true;
      send("UPDATE_SLIDE", {
        slide: newContent,
      });
    } else if (status !== "loading") {
      refetch();
    }
  }

  function allSlideDataLoaded() {
    const profileExist = dataLoaded.current.profile;
    const playlistsExist = dataLoaded.current.playlists;
    const genresExist = dataLoaded.current.genres;
    // const profileExist = featureExistOnSlide("data", "title");
    // const playlistsExist = featureExistOnSlide("content", "listUI");
    // const genresExist = featureExistOnSlide("data", "genres");

    return profileExist && playlistsExist && genresExist;
  }

  function featureExistOnSlide(prop: string, subProp: string): boolean {
    const featureExist = list[list.length - 1];

    if (featureExist) {
      const featureValue = featureExist[prop][subProp];
      return featureValue && featureValue.length > 0;
    }

    return false;
  }

  function shouldLoadFeature(featureDoesntExist: boolean): boolean {
    return (
      (state.matches("idle") || state.matches("updatingSlide")) &&
      featureDoesntExist
    );
  }

  function loadProfileSlide() {
    // addEmptySlide();
    start();
  }

  useEffect(() => {
    if (state.matches("addingslide") && list.length === 1) {
      send("UPDATE_SLIDE");
    }
  }, [state]);

  useEffect(() => {
    if (started.current) {
      // const profileDoesntExist = !featureExistOnSlide("data", "title");
      const profileDoesntExist = !dataLoaded.current.profile;

      if (shouldLoadFeature(profileDoesntExist)) {
        return loadProfile();
      }
      // }, [state, profileData]);

      // useEffect(() => {
      // const playlistsDoesntExist = !featureExistOnSlide("content", "listUI");
      const playlistsDoesntExist = !dataLoaded.current.playlists;

      if (profileData && shouldLoadFeature(playlistsDoesntExist)) {
        return loadPlaylists();
      }
      // }, [state, profileData, playlistsData]);

      // useEffect(() => {
      // const genresDoesntExist = !featureExistOnSlide("data", "genres");
      const genresDoesntExist = !dataLoaded.current.genres;

      if (profileData && shouldLoadFeature(genresDoesntExist)) {
        return loadGenres();
      }
      // }, [state, profileData, genresData]);

      // useEffect(() => {
      // if (state.matches("updatingSlide") && profileData) {
      if (state.matches("updatingSlide") && allSlideDataLoaded()) {
        started.current = false;
        dataLoaded.current.profile = false;
        dataLoaded.current.playlists = false;
        dataLoaded.current.genres = false;
        send("GO_TO_IDLE");
      }
    }
  }, [started, state, profileData, playlistsData, genresData]);

  return { loadProfileSlide };
}

export default useLoadProfile;
