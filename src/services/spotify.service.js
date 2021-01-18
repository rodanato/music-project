// @flow

import SpotifyWebApi from "spotify-web-api-js";
import {
  handleError,
  getIfExistOnStorage,
  persistOnLocalStorage,
} from "utils/helpers";
import { apiUrl } from "utils/helpers";
// import { db } from "./firebase/config";
import type { Playlist } from "shared/types/slide.types";
import type { Profile } from "shared/types/spotify.types";

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
};

type UserInfo = {
  spotifyId: string,
  name: string,
  email: string,
  photo: string,
};

class SpotifyService {
  static instance: SpotifyService;
  static getInstance(): SpotifyService {
    if (!SpotifyService.instance) {
      SpotifyService.instance = new SpotifyService();
    }

    return SpotifyService.instance;
  }

  _userInfo: UserInfo = { spotifyId: "", name: "", email: "", photo: "" };
  _spotifyUrls: SpotifyUrls = {
    redirect: "redirect",
    setCode: "setCode",
  };
  spotifyApi: any;
  expiresIn: number = 3600;
  _refreshToken: string;
  _expirationDate: string;
  expirationTimeout: TimeoutID;

  constructor() {
    this.spotifyApi = new SpotifyWebApi();
    const existingToken = getIfExistOnStorage("spotifyToken");
    const existingRefreshToken = getIfExistOnStorage("spotifyRefreshToken");
    const expirationDate = getIfExistOnStorage("expirationDate");
    if (existingToken && typeof existingToken === "string") {
      this.token = existingToken;
    }
    if (existingRefreshToken && typeof existingRefreshToken === "string") {
      this.refreshToken = existingRefreshToken;
    }
    if (expirationDate && typeof expirationDate === "string") {
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
    persistOnLocalStorage("spotifyRefreshToken", token);
  }

  get token(): string {
    return this.spotifyApi.getAccessToken();
  }

  set token(token: string) {
    this.spotifyApi.setAccessToken(token);
    persistOnLocalStorage("spotifyToken", token);
  }

  get userInfo(): string {
    return this._userInfo;
  }

  set userInfo(info: UserInfo): string {
    return (this._userInfo = info);
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

  async getProfile(): Promise<Profile | void> {
    try {
      const profile = await this.spotifyApi.getMe();
      this.userInfo = {
        spotifyId: profile.id,
        name: profile.display_name,
        email: profile.email,
        photo: profile.images[0].url,
      };
      return profile;
    } catch (error) {
      handleError(error, "spa:spotifyService:getProfile");
    }
  }

  async getPlaylists(): Promise<{ items: Playlist[] } | void> {
    try {
      const playlists = await this.spotifyApi.getUserPlaylists(
        this.userInfo.spotifyId
      );
      return playlists;
    } catch (e) {
      handleError(e, "spa:spotifyService:getPlaylists");
    }
  }

  loginRedirect() {
    const redirecUrl = `${apiUrl()}/${this._spotifyUrls.redirect}`;
    window.location = redirecUrl;
  }

  // TODO: Think of a better strategy to keep user session active without making it eternal
  cleanExpirationTimeout() {
    clearTimeout(this.expirationTimeout);
  }

  generateExpirationDate() {
    this.expirationDate = (Date.now() + this.expiresIn * 1000).toString();
  }

  persistExpirationDate() {
    persistOnLocalStorage("expirationDate", this.expirationDate);
  }

  setTokenExpirationTimeout() {
    this.expirationTimeout = setTimeout(() => {
      console.log(">>> expirationDate");
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

  // getPlaylist() {}

  // savePlaylist() {}

  // getArtists() {}

  // saveArtists() {}

  // getAlbums() {}

  // saveAlbums() {}

  // getListenLater() {}

  // saveListenLater() {}

  // getThemePreferences() {}
}
export default SpotifyService;
