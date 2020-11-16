// @flow

import SpotifyWebApi from "spotify-web-api-js";
import { handleError, getIfExistOnStorage } from "../utils/helpers";
import { apiUrl } from "../utils/constants";
// import { db } from "./firebase/config";
import { persistOnLocalStorage } from "../utils/helpers";

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

class SpotifyService {
  static instance: SpotifyService;
  static getInstance() {
    if (!SpotifyService.instance) {
      SpotifyService.instance = new SpotifyService();
    }

    return SpotifyService.instance;
  }

  _spotifyUrls: SpotifyUrls = {
    redirect: "redirect",
    setCode: "setCode",
  };
  spotifyApi: SpotifyWebApi;
  expiresIn: number;
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

  async getProfile(): Promise<string | void> {
    try {
      const profile = await this.spotifyApi.getMe();
      return profile;
      // db.collection("users").add({
      //   name: profile.display_name
      // })
      // .then(function(docRef) {
      //     console.log("Document written with ID: ", docRef.id);
      // })
      // .catch(function(error) {
      //     console.error("Error adding document: ", error);
      // });
    } catch (error) {
      handleError(error, "spa:spotifyService:getProfile");
    }
  }

  loginRedirect() {
    const redirecUrl = `${apiUrl()}/${this._spotifyUrls.redirect}`;
    window.location = redirecUrl;
  }

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
