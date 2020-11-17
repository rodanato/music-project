// @flow
import { handleError } from "utils/helpers";
import { apiUrl } from "utils/constants";
import { auth } from "./firebase/config";
import SpotifyService from "./spotify.service";

type AuthUrls = {
  createFirebaseAccount: string,
};

class AuthService {
  static instance: AuthService;
  static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  spotifyService: SpotifyService;

  _authUrls: AuthUrls = {
    createFirebaseAccount: "createFirebaseAccount",
  };

  constructor() {
    this.spotifyService = SpotifyService.getInstance();
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
