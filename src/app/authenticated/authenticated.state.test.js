import { interpret } from "xstate";
import { AuthenticatedState } from "./authenticated.state";

describe("AuthenticatedState machine", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    authenticatedState.state.value = authenticatedState.initialState.value;
  });

  const authenticatedState = interpret(AuthenticatedState).start();
  const getState = () => authenticatedState.state.value;
  const getContext = () => authenticatedState.state.context;

  AuthenticatedState.options.actions.handleError = jest.fn();
  AuthenticatedState.options.actions.spotifyLogin = jest.fn();
  AuthenticatedState.options.actions.removeFromStorage = jest.fn();
  AuthenticatedState.options.actions.cleanUrlAndAddToStorage = jest.fn();

  it("Authenticated initial state should be 'loading'", (done) => {
    expect(authenticatedState.initialState.value).toBe("loading");
    expect(getState()).toBe("loading");
    done();
  });

  it("Theme state should change to 'loggedOut' on 'LOGGED_OUT' action if the current state is 'loading'", (done) => {
    expect(getState()).toBe("loading");
    authenticatedState.send("LOGGED_OUT");
    expect(getState()).toBe("loggedOut");
    done();
  });

  it("Theme state should change to 'loggingIn' on 'LOGGING_IN' action if the current state is 'loading'", (done) => {
    expect(getState()).toBe("loading");
    authenticatedState.send("LOGGING_IN");
    expect(getState()).toBe("loggingIn");
    done();
  });

  it("Theme state should change to 'loggedIn' on 'LOGGED_IN' action if the current state is 'loading'", (done) => {
    expect(getState()).toBe("loading");
    authenticatedState.send("LOGGED_IN");
    expect(getState()).toBe("loggedIn");
    expect(
      AuthenticatedState.options.actions.cleanUrlAndAddToStorage
    ).toHaveBeenCalledTimes(1);
    done();
  });
});
