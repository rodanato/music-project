// @flow
// EXTERNAL
import React, { Fragment, useState, useEffect, useRef } from "react"; // eslint-disable-line

// DEPENDENCIES
import type { Node } from "react"; // eslint-disable-line
import type { SlideContent } from "shared/types/slide.types";
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
  const started = useRef(false);
  const list = state.context.list;
  const dataLoaded = useRef({
    profile: false,
    playlists: false,
    genres: false,
  });

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
      data: profileData,
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
      data: playlistsData,
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
      data: genresData,
      newContent,
    };
    loadFeature(featureProps);
  }

  function loadFeature({ feature, data, newContent }: FeatureProps) {
    if (data) {
      dataLoaded.current[feature] = true;
      send("UPDATE_SLIDE", { slide: newContent });
    }
  }

  function allDataHasLoaded() {
    const { profile, playlists, genres } = dataLoaded.current;
    return profile && playlists && genres;
  }

  function featureHasntLoaded(feature: string): boolean {
    return !dataLoaded.current[feature];
  }

  function firstSlideWasAdded() {
    return state.matches("addingslide") && list.length === 1;
  }

  function resetFlags() {
    started.current = false;
    dataLoaded.current.profile = false;
    dataLoaded.current.playlists = false;
    dataLoaded.current.genres = false;
  }

  function loadProfileSlide() {
    started.current = true;
    addSlide();
  }

  useEffect(() => {
    if (firstSlideWasAdded()) {
      send("UPDATE_SLIDE");
    }
  }, [state]);

  useEffect(() => {
    if (started.current && state.matches("updatingSlide")) {
      if (profileStatus === "idle") {
        refetchProfile();
      }

      if (profileStatus === "success" && featureHasntLoaded("profile")) {
        loadProfile();
      }

      if (profileData) {
        if (playlistsStatus === "idle" && genresStatus === "idle") {
          refetchPlaylists();
          refetchGenres();
        }

        if (playlistsStatus === "success" && featureHasntLoaded("playlists")) {
          loadPlaylists();
        }

        if (genresStatus === "success" && featureHasntLoaded("genres")) {
          loadGenres();
        }
      }

      if (allDataHasLoaded()) {
        resetFlags();
        send("GO_TO_IDLE");
      }
    }
  }, [started, state, profileData, playlistsData, genresData]);

  return { loadProfileSlide };
}

export default useLoadProfile;
