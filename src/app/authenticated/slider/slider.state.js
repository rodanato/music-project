// @flow
import { Machine, interpret } from "xstate";
import type { StateMachine } from "xstate";
import SliderService from "services/slider.service";
import { handleError } from "utils/helpers";

export interface SliderStateSchema {
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
  | { type: "ADD_EMPTY_SLIDE" }
  | { type: "ADD_SLIDE" };

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
        // playlists: 1000 * 30,
        playlists: 1000 * 60 * 60 * 24,
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
        },
      },
      started: {
        // FIXME: Add profile slide here if cond: list is empty
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
    },
  },
  {
    actions: {
      handleError: (_ctx, e: any) => {
        handleError({ message: e.data }, "spa:sliderState");
      },
      createSwiper: (ctx, e) => {
        const sliderService = SliderService.getInstance();
        sliderService.createSwiper();
      },
      initSwiper: (ctx, e) => {
        const sliderService = SliderService.getInstance();
        sliderService.onInit(ctx.list);
      },
      addSlide: (ctx, e: any) => {
        ctx.list = [...ctx.list, e.slide];
      },
      removeSlide: (ctx, e: any) => {
        const newList = ctx.list.filter((item, i) => i !== 0);
        ctx.list = [...newList];
      },
    },
  }
);
console.log(1);
export const SliderStateService = interpret(SliderState).start();
console.log(2);
