// @flow
import {
  handleError,
  apiUrl,
  persistOnLocalStorage,
  getIfExistOnStorage,
} from "utils/helpers";
import { auth } from "config/firebase";
import SpotifyService from "./spotify.service";

type AuthUrls = {
  createFirebaseAccount: string,
};

type FirebaseUser = {
  displayName: string,
  email: string,
  uid: string,
};

class AuthService {
  static instance: AuthService;
  static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  _authUrls: AuthUrls = {
    createFirebaseAccount: "createFirebaseAccount",
  };
  firebaseUser: FirebaseUser;
  spotifyService: SpotifyService;

  constructor() {
    this.spotifyService = SpotifyService.getInstance();

    const signedInFirebaseUser = getIfExistOnStorage("firebaseUser");
    if (signedInFirebaseUser && typeof signedInFirebaseUser === "object") {
      this.firebaseUser = signedInFirebaseUser;
    }
  }

  getCodeIfPresent(): mixed {
    const searchParams: URLSearchParams = new URLSearchParams(
      window.location.search
    );
    return searchParams.has("code") ? searchParams.get("code") : false;
  }

  async firebaseLogout(): Promise<void> {
    try {
      return await auth.signOut();
    } catch (error) {
      handleError(error, "spa:authService:firebaseLogout");
    }
  }

  async firebaseLogin(code: string): Promise<any> {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.firebaseUser = user;
        persistOnLocalStorage("firebaseUser", user);
      }
    });

    try {
      const spotifyToken: string = await this.spotifyService.getToken(code);
      const userprofile = await this.spotifyService.getProfile();
      const firebaseToken: string | void = await this.createFirebaseAccount(
        spotifyToken,
        userprofile
      );

      return await auth.signInWithCustomToken(firebaseToken);
    } catch (error) {
      handleError(error, "spa:authService:firebaseLogin");
    }
  }

  async createFirebaseAccount(
    spotifyToken: string,
    userprofile: any
  ): Promise<string | void> {
    const url = `${apiUrl()}/${this._authUrls.createFirebaseAccount}`;
    const request = new Request(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      mode: "cors",
      body: JSON.stringify({ token: spotifyToken, userprofile: userprofile }),
    });

    try {
      const res = await fetch(request);
      const firebaseToken: string = await res.json();
      return firebaseToken;
    } catch (e) {
      handleError(e, "spa:spotifyService:getToken");
    }
  }
}
export default AuthService;
