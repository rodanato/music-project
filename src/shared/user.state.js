// @flow
import { Machine, interpret, assign, actions } from "xstate";
import type { StateMachine, Interpreter } from "xstate";

export interface UserStateSchema {
  states: {
    idle: {},
  };
}

export interface UserContext {
  firebaseUser: {
    displayName: string,
    email: string,
    uid: string,
  };
  userInfo: {
    spotifyId: string,
    name: string,
    email: string,
    photo: string,
  };
}

export type UserEvent = { type: string };

export const UserState: StateMachine<
  any,
  UserStateSchema,
  UserEvent,
  {
    value: any,
    context: UserContext,
  }
> = Machine<any, UserStateSchema, UserEvent>(
  {
    initial: "idle",
    context: {
      firebaseUser: {},
      userInfo: {},
    },
    states: {
      idle: {
        on: {
          UPDATE_USER_INFO: {
            actions: "updateUserInfo",
          },
          UPDATE_FIREBASE_USER: {
            actions: "updateFirebaseUser",
          },
        },
      },
    },
  },
  {
    actions: {
      updateUserInfo: assign({
        userInfo: (ctx, e) => e.userInfo,
      }),
      updateFirebaseUser: assign({
        firebaseUser: (ctx, e) => e.firebaseUser,
      }),
    },
  }
);

export const UserStateService: Interpreter<
  any,
  UserStateSchema,
  UserEvent,
  {
    value: any,
    context: UserContext,
  }
> = interpret(UserState).start();
