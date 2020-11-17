import { interpret } from "xstate";
import { MainState } from "./main.state";

describe("MainState machine", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mainState.state.value = mainState.initialState.value;
  });

  const mainState = interpret(MainState).start();
  const getState = () => mainState.state.value;
  const getContext = () => mainState.state.context;

  MainState.options.actions.persist = jest.fn();

  it("Main initial state should be 'notrendered'", (done) => {
    expect(mainState.initialState.value).toBe("notrendered");
    expect(getState()).toBe("notrendered");
    done();
  });

  it("Main initial state should include invoked machines", (done) => {
    expect(mainState.children.has("themePalette")).toBeTruthy();
    expect(mainState.children.has("themes")).toBeTruthy();
    done();
  });

  it("Main initial shouldn't change if any change-color-action is triggered and the current state is 'notrendered'", (done) => {
    expect(getState()).toBe("notrendered");

    mainState.send("CHANGE_TO_BLUE");

    expect(getState()).toBe("notrendered");

    mainState.send("CHANGE_TO_GREEN");

    expect(getState()).toBe("notrendered");

    mainState.send("CHANGE_TO_PINK");

    expect(getState()).toBe("notrendered");

    mainState.send("CHANGE_TO_PURPLE");

    expect(getState()).toBe("notrendered");
    done();
  });

  it("Main state should be 'rendered' on 'RENDER' action when the current state is 'notrendered'", (done) => {
    expect(getState()).toBe("notrendered");

    mainState.send("RENDER");

    expect(mainState.state.matches("rendered.green")).toBeTruthy();
    done();
  });

  it("Main state should be 'rendered.blue' on 'CHANGE_TO_BLUE' action when the current state is 'rendered'", (done) => {
    expect(getState()).toBe("notrendered");

    mainState.send("RENDER");

    expect(mainState.state.matches("rendered.green")).toBeTruthy();

    mainState.send("CHANGE_TO_BLUE");

    expect(mainState.state.matches("rendered.blue")).toBeTruthy();
    expect(MainState.options.actions.persist).toHaveBeenCalledTimes(1);
    jest.clearAllMocks();

    mainState.send("CHANGE_TO_GREEN");

    expect(mainState.state.matches("rendered.green")).toBeTruthy();
    expect(MainState.options.actions.persist).toHaveBeenCalledTimes(1);
    jest.clearAllMocks();

    mainState.send("CHANGE_TO_PINK");

    expect(mainState.state.matches("rendered.pink")).toBeTruthy();
    expect(MainState.options.actions.persist).toHaveBeenCalledTimes(1);
    jest.clearAllMocks();

    mainState.send("CHANGE_TO_PURPLE");

    expect(mainState.state.matches("rendered.purple")).toBeTruthy();
    expect(MainState.options.actions.persist).toHaveBeenCalledTimes(1);
    done();
  });
});
