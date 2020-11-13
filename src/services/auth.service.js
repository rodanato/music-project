// @flow
import { handleError } from "../utils/helpers";
import { apiUrl } from "../utils/constants";
import { auth } from "./firebase/config";
import SpotifyService from './spotify.service';

type AuthUrls = {
  createFirebaseAccount: string,
};

class AuthService {
  static instance: AuthService;
  static getInstance() {
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

  getCodeIfPresent() {
    const searchParams: URLSearchParams = new URLSearchParams(
      window.location.search
    );
    return searchParams.has("code") ? searchParams.get("code") : false;
  }

  firebaseLogout() {
    return auth.signOut();
  }

  async authenticate(code: string) {
    try {
      const spotifyToken: string = await this.spotifyService.getToken(code);
      const firebaseToken: string = await this.createFirebaseAccount(
        spotifyToken
      );

      await auth.signInWithCustomToken(firebaseToken);
    } catch (error) {
      handleError(error, "on authentication");
    }
  }

  async createFirebaseAccount(spotifyToken: string): Promise<string> {
    const url = `${apiUrl()}/${this._authUrls.createFirebaseAccount}`;
    const request = new Request(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      mode: "cors",
      body: JSON.stringify({ token: spotifyToken }),
    });

    try {
      const res = await fetch(request);
      const firebaseToken: string = await res.json()
      return firebaseToken;
    } catch(e) {
      handleError(e, 'spa:spotifyService:getToken')
    }
  }
}
export default AuthService;
