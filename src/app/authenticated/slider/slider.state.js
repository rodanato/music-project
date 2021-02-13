// @flow
import { Machine, interpret } from "xstate";
import type { StateMachine, Interpreter } from "xstate";
import SliderService from "services/slider.service";
import { handleError } from "utils/helpers";
import * as R from "ramda";

export interface SliderStateSchema {
  context: {
    list: [],
    hoursToRefetch: {
      playlists: number,
      profile: number,
    },
  };
  states: {
    notstarted: {},
    starting: {},
    started: {},
    addingslide: {},
  };
}

export type SliderEvent =
  | { type: string }
  | { type: "START" }
  | { type: "STARTED" }
  | { type: "ADD_SLIDE" }
  | { type: "REMOVE_SLIDE" }
  | { type: "GO_TO_IDLE" };

const sliderService = SliderService.getInstance();

export const SliderState: StateMachine<
  any,
  SliderStateSchema,
  SliderEvent,
  {
    value: any,
    context: any,
  }
> = Machine<any, SliderStateSchema, SliderEvent>(
  {
    initial: "notstarted",
    context: {
      list: [],
      hoursToRefetch: {
        playlists: 1000 * 60 * 60 * 24, // 24h
        profile: 1000 * 60 * 60 * 4, // 4h
      },
    },
    states: {
      notstarted: {
        on: {
          START: "starting",
        },
      },
      starting: {
        entry: ["createSwiper"],
        on: {
          STARTED: "started",
        },
        exit: ["initSwiper"],
      },
      idle: {
        on: {
          ADD_SLIDE: "addingslide",
          REMOVE_SLIDE: "removingSlide",
          UPDATE_SLIDE: "updatingSlide",
        },
      },
      started: {
        on: {
          ADD_SLIDE: "addingslide",
        },
      },
      addingslide: {
        entry: ["addSlide"],
        on: {
          GO_TO_IDLE: "idle",
        },
      },
      removingSlide: {
        entry: ["removeSlide"],
        on: {
          GO_TO_IDLE: "idle",
        },
      },
      updatingSlide: {
        entry: ["updateSlide"],
        on: {
          GO_TO_IDLE: "idle",
          UPDATE_SLIDE: "updatingSlide",
        },
      },
    },
  },
  {
    actions: {
      handleError: (_ctx, e: any) => {
        handleError({ message: e.data }, "spa:sliderState");
      },
      createSwiper: (ctx, e) => {
        sliderService.createSwiper();
      },
      initSwiper: (ctx, e) => {
        sliderService.onInit(ctx.list);
      },
      addSlide: (ctx, e: any) => {
        ctx.list = [...ctx.list, e.slide];
      },
      removeSlide: (ctx, e: any) => {
        const newList = ctx.list.filter((item, i) => i !== 0);
        ctx.list = [...newList];
      },
      updateSlide: (ctx, e: any) => {
        let currentList = [...ctx.list];
        const newSlide = R.mergeDeepWith(R.concat, ctx.list[e.index], e.slide);

        currentList.splice(e.index, 1, newSlide);

        ctx.list = currentList;
      },
    },
  }
);

export const SliderStateService: Interpreter<
  any,
  SliderStateSchema,
  SliderEvent,
  {
    value: any,
    context: any,
  }
> = interpret(SliderState).start();
