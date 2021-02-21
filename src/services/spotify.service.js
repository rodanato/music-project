// @flow

import SpotifyWebApi from "spotify-web-api-js";
import { handleError, getFromStorage, persistOnStorage } from "utils/helpers";
import { apiUrl } from "utils/helpers";
import type {
  SpotifyProfile,
  PlaylistsDetail,
  Genre,
} from "shared/types/spotify.types";
import { UserStateService } from "shared/user.state";

type setCodeResponse = {
  access_token: string,
  expires_in: number,
  refresh_token: string,
  scope: string,
  token_type: string,
};
type SpotifyUrls = {
  redirect: string,
  setCode: string,
  genres: string,
};

class SpotifyService {
  static instance: SpotifyService;
  static getInstance(): SpotifyService {
    if (!SpotifyService.instance) {
      SpotifyService.instance = new SpotifyService();
    }

    return SpotifyService.instance;
  }

  _spotifyUrls: SpotifyUrls = {
    redirect: "redirect",
    setCode: "setCode",
    genres: "genres",
  };
  spotifyApi: any;
  expiresIn: number = 3600;
  _refreshToken: string;
  _expirationDate: string;
  expirationTimeout: TimeoutID;

  constructor() {
    this.spotifyApi = new SpotifyWebApi();
    const existingToken: mixed = getFromStorage("spotifyToken");
    const existingRefreshToken: mixed = getFromStorage("spotifyRefreshToken");
    const expirationDate: mixed = getFromStorage("expirationDate");

    if (typeof existingToken === "string") {
      this.token = existingToken;
    }

    if (typeof existingRefreshToken === "string") {
      this.refreshToken = existingRefreshToken;
    }

    if (typeof expirationDate === "string") {
      this.expirationDate = expirationDate;
      this.setTokenExpirationTimeout();
    }

    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        this.cleanExpirationTimeout();
      } else {
        this.setTokenExpirationTimeout();
      }
    });
  }

  get expirationDate(): string {
    return this._expirationDate;
  }

  set expirationDate(expirationDate: string) {
    this._expirationDate = expirationDate;
  }

  get refreshToken(): string {
    return this._refreshToken;
  }

  set refreshToken(token: string) {
    this._refreshToken = token;
    persistOnStorage("spotifyRefreshToken", token);
  }

  get token(): string {
    return this.spotifyApi.getAccessToken();
  }

  set token(token: string) {
    this.spotifyApi.setAccessToken(token);
    persistOnStorage("spotifyToken", token);
  }

  async getToken(code: string): Promise<string> {
    const url = `${apiUrl()}/${this._spotifyUrls.setCode}`;
    const request = new Request(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      mode: "cors",
      body: JSON.stringify({ code: code }),
    });

    try {
      const res = await fetch(request);
      const result: setCodeResponse = await res.json();
      this.expiresIn = result.expires_in;
      this.token = result.access_token;
      this.refreshToken = result.refresh_token;
      this.generateExpirationDate();
      this.persistExpirationDate();
      this.setTokenExpirationTimeout();
    } catch (e) {
      handleError(e, "spa:spotifyService:getToken");
    }

    return this.token;
  }

  async getProfile(): Promise<?SpotifyProfile> {
    try {
      const profile: SpotifyProfile = await this.spotifyApi.getMe();

      const userInfo = {
        spotifyId: profile.id,
        name: profile.display_name,
        email: profile.email,
        photo: profile.images[0].url,
      };

      UserStateService.send("UPDATE_USER_INFO", { userInfo });

      return profile;
    } catch (error) {
      handleError(error, "spa:spotifyService:getProfile");
    }
  }

  async getPlaylists(offset: number): Promise<?PlaylistsDetail> {
    try {
      const { spotifyId } = UserStateService.state.context.userInfo;
      const playlists: PlaylistsDetail = await this.spotifyApi.getUserPlaylists(
        spotifyId,
        { offset: offset }
      );
      return playlists;
    } catch (e) {
      handleError(e, "spa:spotifyService:getPlaylists");
    }
  }

  async getGenres(): Promise<?(Genre[])> {
    const { spotifyId } = UserStateService.state.context.userInfo;
    const url = `${apiUrl()}/${this._spotifyUrls.genres}`;
    const request = new Request(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      mode: "cors",
      body: JSON.stringify({
        userProfileId: spotifyId,
        token: this.token,
      }),
    });

    try {
      const res = await fetch(request);
      const genres: Genre[] = await res.json();
      return genres;
    } catch (e) {
      handleError(e, "spa:spotifyService:getGenres");
    }
  }

  loginRedirect() {
    const redirecUrl = `${apiUrl()}/${this._spotifyUrls.redirect}`;
    window.location = redirecUrl;
  }

  // TODO: Think of a better strategy to keep user session active without making it eternal. Maybe refresh session option like adobe
  cleanExpirationTimeout() {
    clearTimeout(this.expirationTimeout);
  }

  generateExpirationDate() {
    this.expirationDate = (Date.now() + this.expiresIn * 1000).toString();
  }

  persistExpirationDate() {
    persistOnStorage("expirationDate", this.expirationDate);
  }

  setTokenExpirationTimeout() {
    this.expirationTimeout = setTimeout(() => {
      this.getNewToken();
    }, Number(this.expirationDate) - 30 * 1000 - Date.now());
  }

  async getNewToken(): Promise<void> {
    const url: string = `${apiUrl()}/refreshToken`;
    const request = new Request(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      mode: "cors",
      body: JSON.stringify({
        token: this.token,
        refreshtoken: this.refreshToken,
      }),
    });

    try {
      const res = await fetch(request);
      const newToken: string = await res.json();
      this.token = newToken;
      this.generateExpirationDate();
      this.persistExpirationDate();
      this.setTokenExpirationTimeout();
    } catch (e) {
      handleError(e, "spa:spotifyService:refreshToken");
    }
  }

  // async spotifyAPIErrorHandler(error: any, fn: function) {
  //   // Retry if token expired
  //   if (error.status === 401) {
  //     await this.getNewToken();
  //     return fn();
  //   }

  //   handleError(error, "spa:spotify");
  // }
}
export default SpotifyService;
