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
    idle: {},
    addingslide: {},
    updatingSlide: {},
    removingSlide: {},
  };
}

export type SliderEvent =
  | { type: string }
  | { type: "START" }
  | { type: "STARTED" }
  | { type: "ADD_SLIDE" }
  | { type: "REMOVE_SLIDE" }
  | { type: "UPDATE_SLIDE" }
  | { type: "GO_TO_IDLE" };

const sliderService = SliderService.getInstance();

const addSlidePromise = async (ctx, e) => {
  ctx.list = [...ctx.list, e.slide];
  return Promise.resolve(ctx.list);
};

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
          STARTED: "idle",
        },
        exit: ["initSwiper"],
      },
      idle: {
        on: {
          ADD_SLIDE: "addingslide",
          // TODO: Put cond for this, if ctx.list.length > 0
          REMOVE_SLIDE: "removingSlide",
        },
      },
      addingslide: {
        entry: ["addSlide"],
        on: {
          UPDATE_SLIDE: "updatingSlide",
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
        if (e.slide) {
          let currentList = [...ctx.list];
          const index = ctx.list.length - 1;
          const newSlide = R.mergeDeepRight(ctx.list[index], e.slide);

          currentList.splice(index, 1, newSlide);

          ctx.list = currentList;
        }
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
