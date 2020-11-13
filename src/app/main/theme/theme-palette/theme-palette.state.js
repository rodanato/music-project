// @flow
// import React, {useContext} from 'react';
// import ThemePaletteAtom from "./theme-palette.atom"
// import { render, fireEvent, cleanup } from '@testing-library/react';
// import { createModel } from '@xstate/test';
// import { MainStateContext } from '../../main.state';
// import ShallowRenderer from 'react-test-renderer/shallow';

import { Machine, sendParent, EventObject } from "xstate";

type SetPaletteEvent = EventObject & { theme: string };

// jest.mock('@xstate/react');

export interface ThemePaletteStateSchema {
  states: {
    selected: {},
    unselected: {},
  };
}

export type ThemePaletteEvent =
  | { type: string }
  | { type: "SELECT" }
  | { type: "UNSELECT" };

let ThemePaletteState;


// describe("feedback app", () => {
  ThemePaletteState = Machine<
    any,
    ThemePaletteStateSchema,
    ThemePaletteEvent
  >(
    {
      id: "themePalette",
      initial: "unselected",
      states: {
        selected: {
          on: {
            UNSELECT: "unselected",
          },
        },
        unselected: {
          on: {
            SELECT: {
              target: "selected",
              actions: ["setPalette"],
            },
          },
        },
      },
    },
    {
      actions: {
        setPalette: sendParent((_ctx, e: SetPaletteEvent) => ({
          type: `CHANGE_TO_${e.theme.toUpperCase()}`,
        })),
      },
    }
  );



//   const testModel = createModel(ThemePaletteState, {
//     events: {
//       SELECT: ({ getByRole }) => {
//         fireEvent.click(getByRole('li'));

//         // exec: async ({ getByTestId }) => {
//           // fireEvent.change(getByRole('span'), { name: 'testName' });
//           // fireEvent.click(getByRole('span'));
//         // }
//       }
//     }
//   });

//   const testPlans = testModel.getSimplePathPlans();


// let realUseContext;
// let useContextMock;
// // Setup mock
// beforeEach(() => {
//     realUseContext = React.useContext;
//     useContextMock = React.useContext = jest.fn();
// });
// // Cleanup mock
// afterEach(() => {
//     React.useContext = realUseContext;
// });

//   testPlans.forEach(plan => {
//     describe(plan.description, () => {
//       afterEach(cleanup);

//       plan.paths.forEach(path => {
//         it(path.description, () => {
//           const mainState = useContextMock.mockReturnValue({ children: null});
//           const rendered = render(<ThemePaletteAtom name="testName" />);
//           return path.test(rendered);
//         });
//       });
//     });
//   });

  // testPlans.forEach((plan) => {
  //   describe(plan.description, () => {
  //     plan.paths.forEach((path) => {
  //       it(path.description, () => {
  //         console.log(path.state.value, '<<<< state')
  //         render(<ThemePaletteAtom name="testName" />);
  //         expect(path.state.value).toBe("selected");
  //       });
  //     });
  //   });
  // });
// });




export { ThemePaletteState };
