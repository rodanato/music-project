import { interpret } from "xstate";
import { themes } from "utils/themes";
import { ThemeState } from "./theme.state";

describe("ThemeState machine", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    themeState.state.value = themeState.initialState.value;
  });

  const themeState = interpret(ThemeState).start();
  const getState = () => themeState.state.value;
  const getContext = () => themeState.state.context;

  it("Theme initial state should be 'closed'", (done) => {
    const themeNamesList = themes.map((theme) => theme.name);
    expect(themeState.initialState.value).toBe("closed");
    expect(getState()).toBe("closed");
    expect(getContext().themes).toMatchObject(themeNamesList);
    expect(getContext().themeLength).toEqual(themes[0].colors.length);
    done();
  });

  it("Theme state should be 'opened' on 'TOGGLE' action when the current state is 'closed'", (done) => {
    expect(getState()).toBe("closed");

    themeState.send("TOGGLE");

    expect(getState()).toBe("opened");
    done();
  });

  it("Theme state should be 'closed' on 'TOGGLE' action when the current state is 'opened'", (done) => {
    expect(getState()).toBe("closed");

    themeState.send("TOGGLE");

    expect(getState()).toBe("opened");

    themeState.send("TOGGLE");

    expect(getState()).toBe("closed");
    done();
  });
});
