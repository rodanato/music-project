import { interpret } from "xstate";
import { themes } from "utils/themes";
import { ThemePaletteState } from "./theme-palette.state";

describe("ThemePaletteState machine", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    themePaletteState.state.value = themePaletteState.initialState.value;
  });

  const sentTheme = themes[0].name.toUpperCase();
  let expectedSentTheme = "";
  ThemePaletteState.options.actions.setPalette = jest.fn((ctx, e) => {
    expectedSentTheme = e.theme.toUpperCase();
  });

  const themePaletteState = interpret(ThemePaletteState).start();
  const getState = () => themePaletteState.state.value;
  const getContext = () => themePaletteState.state.context;

  it("Themepalette initial state should be 'unselected'", (done) => {
    expect(themePaletteState.initialState.value).toBe("unselected");
    expect(getState()).toBe("unselected");
    done();
  });

  it("Themepalette state should be 'selected' on 'SELECT' action when the current state is 'unselected'", (done) => {
    expect(getState()).toBe("unselected");

    themePaletteState.send({
      type: "SELECT",
      theme: sentTheme,
    });

    expect(getState()).toBe("selected");
    expect(ThemePaletteState.options.actions.setPalette).toHaveBeenCalledTimes(
      1
    );
    expect(expectedSentTheme).toBe(sentTheme);
    done();
  });

  it("Themepalette state shouldn't change on 'SELECT' action if the current state is 'selected'", (done) => {
    expect(getState()).toBe("unselected");

    themePaletteState.send({
      type: "SELECT",
      theme: sentTheme,
    });

    expect(getState()).toBe("selected");
    expect(ThemePaletteState.options.actions.setPalette).toHaveBeenCalledTimes(
      1
    );

    jest.clearAllMocks();

    themePaletteState.send({
      type: "SELECT",
      theme: sentTheme,
    });

    expect(getState()).toBe("selected");
    expect(ThemePaletteState.options.actions.setPalette).toHaveBeenCalledTimes(
      0
    );
    done();
  });

  it("Themepalette state should be 'unselected' on 'UNSELECT' action when the current state is 'selected'", (done) => {
    themePaletteState.send({
      type: "SELECT",
      theme: sentTheme,
    });
    expect(getState()).toBe("selected");
    expect(ThemePaletteState.options.actions.setPalette).toHaveBeenCalledTimes(
      1
    );

    themePaletteState.send("UNSELECT");

    expect(getState()).toBe("unselected");
    done();
  });

  it("Themepalette state shouldn't change on 'UNSELECT' action if the current state is 'unselected'", (done) => {
    expect(getState()).toBe("unselected");

    themePaletteState.send("UNSELECT");

    expect(getState()).toBe("unselected");
    expect(ThemePaletteState.options.actions.setPalette).toHaveBeenCalledTimes(
      0
    );
    done();
  });
});
