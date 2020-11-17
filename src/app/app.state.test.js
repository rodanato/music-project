import { interpret } from "xstate";
import { AppState } from "./app.state";

describe("AppState machine", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    appState.state.value = appState.initialState.value;
  });

  const appState = interpret(AppState).start();
  const getState = () => appState.state.value;
  const getContext = () => appState.state.context;

  AppState.options.actions.handleError = jest.fn();
  AppState.options.actions.spotifyLogin = jest.fn();
  AppState.options.actions.removeFromStorage = jest.fn();
  AppState.options.actions.cleanUrlAndAddToStorage = jest.fn();

  it("App initial state should be 'loading'", (done) => {
    expect(appState.initialState.value).toBe("loading");
    expect(getState()).toBe("loading");
    done();
  });

  it("Main state should change to 'loggedOut' on 'LOGGED_OUT' action if the current state is 'loading'", (done) => {
    expect(getState()).toBe("loading");
    appState.send("LOGGED_OUT");
    expect(getState()).toBe("loggedOut");
    done();
  });

  it("Main state should change to 'loggingIn' on 'LOGGING_IN' action if the current state is 'loading'", (done) => {
    expect(getState()).toBe("loading");
    appState.send("LOGGING_IN");
    expect(getState()).toBe("loggingIn");
    done();
  });

  it("Main state should change to 'loggedIn' on 'LOGGED_IN' action if the current state is 'loading'", (done) => {
    expect(getState()).toBe("loading");
    appState.send("LOGGED_IN");
    expect(getState()).toBe("loggedIn");
    expect(
      AppState.options.actions.cleanUrlAndAddToStorage
    ).toHaveBeenCalledTimes(1);
    done();
  });
});
