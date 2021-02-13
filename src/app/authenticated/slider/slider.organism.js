// @flow
// EXTERNAL
import React, { useEffect, useState, useRef } from "react"; // eslint-disable-line
import type { Node } from "react";
import type { SlideContent } from "shared/types/slide.types";
// $FlowIgnore
/** @jsx jsx */ import { jsx, css } from "@emotion/core"; // eslint-disable-line
import { useService } from "@xstate/react";

// DEPENDENCIES
import SliderService from "services/slider.service";
import { SliderStateService } from "app/authenticated/slider/slider.state";
import NavigationOrganism from "../navigation/navigation.organism";
import SliderNavigationMolecule from "./slider-navigation/slider-navigation.molecule";
import useFetchProfile from "shared/custom-hooks/use-fetch-profile";
import useFetchPlaylists from "shared/custom-hooks/use-fetch-playlists";
import useFetchGenres from "shared/custom-hooks/use-fetch-genres";
import SwiperContainerOrganism from "./swiper-container/swiper-container.organism";

// STYLES
// $FlowIgnore
import "swiper/css/swiper.css";
import { slider } from "./slider.styles";

function SliderOrganism(): Node {
  const sliderService = SliderService.getInstance();
  const [state, send] = useService(SliderStateService);
  // TODO: Try loading the profile first and adding the slide only with it, then get playlists and genres and update context.list, sliderOrganism should rerender with the new data
  const { profileData } = useFetchProfile();

  const {
    playlistsData,
    refetchPlaylists,
    playlistsStatus,
  } = useFetchPlaylists();
  const { genresData, refetchGenres, genresStatus } = useFetchGenres();
  const list = state.context.list;
  const newSlideIndex = useRef(null);
  const firstSlideLoaded = useRef({ playlists: false, genres: false });
  const baseContent = {
    data: {
      title: "",
      photo: "",
      genres: [],
    },
    content: {
      title: "",
      listUI: [],
    },
    menu: [],
  };

  function loadPlaylists() {
    if (playlistsStatus === "success" && playlistsData) {
      const newContent = {
        ...baseContent,
      };
      newContent.content.listUI = playlistsData;
      newContent.content.title = "Playlists";
      firstSlideLoaded.current.playlists = true;

      send("UPDATE_SLIDE", {
        index: newSlideIndex.current,
        slide: newContent,
      });
    } else {
      refetchPlaylists();
    }
  }

  function loadGenres() {
    if (genresStatus === "success" && genresData) {
      const newContent = {
        ...baseContent,
      };
      newContent.data.genres = genresData;
      firstSlideLoaded.current.genres = true;

      send("UPDATE_SLIDE", { index: newSlideIndex.current, slide: newContent });
    } else {
      refetchGenres();
    }
  }

  function addEmptySlide() {
    if (list.length > 0) sliderService.addEmptySlide();
  }

  async function addProfileSlide() {
    newSlideIndex.current = state.context.list.length;

    const newContent = {
      ...baseContent,
    };
    newContent.data.title = profileData.name;
    newContent.data.photo = profileData.photo;

    send("ADD_SLIDE", { slide: newContent });
  }

  function allSlideDataLoaded() {
    return (
      firstSlideLoaded.current.playlists && firstSlideLoaded.current.genres
    );
  }

  useEffect(() => {
    if (state.matches("notstarted")) {
      send("START");
    }

    if (state.matches("started")) {
      addEmptySlide();
    }
  }, [state]);

  useEffect(() => {
    if (state.matches("started") && profileData) {
      addProfileSlide();
    }
  }, [state, profileData]);

  useEffect(() => {
    if (
      (state.matches("idle") || state.matches("updatingSlide")) &&
      profileData &&
      !firstSlideLoaded.current.playlists
    ) {
      loadPlaylists();
    }
    if (
      (state.matches("idle") || state.matches("updatingSlide")) &&
      profileData &&
      !firstSlideLoaded.current.genres
    ) {
      loadGenres();
    }
  }, [state, profileData, firstSlideLoaded, playlistsData, genresData]);

  useEffect(() => {
    if (state.matches("updatingSlide") && allSlideDataLoaded()) {
      send("GO_TO_IDLE");
    }
  }, [playlistsData, genresData, firstSlideLoaded]);

  useEffect(() => {
    if (list.length > 0) sliderService.addSlideUpdates();
  }, [list.length]);

  return (
    <section css={[slider]}>
      <SwiperContainerOrganism slideList={list} />
      <NavigationOrganism>
        <SliderNavigationMolecule slideListLength={list.length} />
      </NavigationOrganism>
    </section>
  );
}

export default SliderOrganism;
