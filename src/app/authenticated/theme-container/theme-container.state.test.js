import { interpret } from "xstate";
import { ThemeContainerState } from "./theme-container.state";

describe("ThemeContainerState machine", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    themeContainerState.state.value = themeContainerState.initialState.value;
  });

  const themeContainerState = interpret(ThemeContainerState).start();
  const getState = () => themeContainerState.state.value;
  const getContext = () => themeContainerState.state.context;

  ThemeContainerState.options.actions.persist = jest.fn();

  it("ThemeContainer initial state should be 'notrendered'", (done) => {
    expect(themeContainerState.initialState.value).toBe("notrendered");
    expect(getState()).toBe("notrendered");
    done();
  });

  it("ThemeContainer initial state should include invoked machines", (done) => {
    expect(themeContainerState.children.has("themePalette")).toBeTruthy();
    expect(themeContainerState.children.has("themeMenu")).toBeTruthy();
    done();
  });

  it("ThemeContainer initial shouldn't change if any change-color-action is triggered and the current state is 'notrendered'", (done) => {
    expect(getState()).toBe("notrendered");

    themeContainerState.send("CHANGE_TO_BLUE");

    expect(getState()).toBe("notrendered");

    themeContainerState.send("CHANGE_TO_GREEN");

    expect(getState()).toBe("notrendered");

    themeContainerState.send("CHANGE_TO_PINK");

    expect(getState()).toBe("notrendered");

    themeContainerState.send("CHANGE_TO_PURPLE");

    expect(getState()).toBe("notrendered");
    done();
  });

  it("ThemeContainer state should be 'rendered' on 'RENDER' action when the current state is 'notrendered'", (done) => {
    expect(getState()).toBe("notrendered");

    themeContainerState.send("RENDER");

    expect(themeContainerState.state.matches("rendered.green")).toBeTruthy();
    done();
  });

  it("ThemeContainer state should be 'rendered.blue' on 'CHANGE_TO_BLUE' action when the current state is 'rendered'", (done) => {
    expect(getState()).toBe("notrendered");

    themeContainerState.send("RENDER");

    expect(themeContainerState.state.matches("rendered.green")).toBeTruthy();

    themeContainerState.send("CHANGE_TO_BLUE");

    expect(themeContainerState.state.matches("rendered.blue")).toBeTruthy();
    expect(ThemeContainerState.options.actions.persist).toHaveBeenCalledTimes(
      1
    );
    jest.clearAllMocks();

    themeContainerState.send("CHANGE_TO_GREEN");

    expect(themeContainerState.state.matches("rendered.green")).toBeTruthy();
    expect(ThemeContainerState.options.actions.persist).toHaveBeenCalledTimes(
      1
    );
    jest.clearAllMocks();

    themeContainerState.send("CHANGE_TO_PINK");

    expect(themeContainerState.state.matches("rendered.pink")).toBeTruthy();
    expect(ThemeContainerState.options.actions.persist).toHaveBeenCalledTimes(
      1
    );
    jest.clearAllMocks();

    themeContainerState.send("CHANGE_TO_PURPLE");

    expect(themeContainerState.state.matches("rendered.purple")).toBeTruthy();
    expect(ThemeContainerState.options.actions.persist).toHaveBeenCalledTimes(
      1
    );
    done();
  });
});
