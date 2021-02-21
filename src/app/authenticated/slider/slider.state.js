// @flow
import { Machine, interpret, assign } from "xstate";
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
    notStarted: {},
    starting: {},
    idle: {},
    slideAdded: {},
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
    initial: "notStarted",
    context: {
      list: [],
      hoursToRefetch: {
        playlists: 1000 * 60 * 60 * 24, // 24h
        profile: 1000 * 60 * 60 * 24, // 24h
      },
    },
    states: {
      notStarted: {
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
          ADD_SLIDE: "slideAdded",
          REMOVE_SLIDE: "removingSlide",
        },
      },
      slideAdded: {
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
      addSlide: assign({
        list: (ctx, e) => [...ctx.list, e.slide],
      }),
      removeSlide: assign({
        list: (ctx, e) => {
          const newList = ctx.list.filter((item, i) => i !== 0);
          return newList;
        },
      }),
      updateSlide: assign({
        list: (ctx, e) => {
          if (e.slide) {
            const currentList = [...ctx.list];
            const index = ctx.list.length - 1;
            const newSlide = R.mergeDeepRight(ctx.list[index], e.slide);

            currentList.splice(index, 1, newSlide);

            return currentList;
          }

          return ctx.list;
        },
      }),
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
