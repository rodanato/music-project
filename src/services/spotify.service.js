// @flow

import SpotifyWebApi from 'spotify-web-api-js';
import { handleError } from "../utils/helpers";
import { apiUrl } from "../utils/constants";
import { db } from "./firebase/config";

type setCodeResponse = {
  access_token: string,
  expires_in: number,
  refresh_token: string,
  scope: string,
  token_type: string,
};
type SpotifyUrls = {
  redirect: string,
  setCode: string
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
    setCode: "setCode"
  };
  spotifyApi: any;
  token: string;

  constructor() {
    this.spotifyApi = new SpotifyWebApi();
    console.log('>>> token', this.spotifyApi.getAccessToken())
  }

  getToken(code: string): Promise<string> {
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

    return fetch(request)
      .then((res: any) => res.json())
      .then((res: setCodeResponse) => {
        this.spotifyApi.setAccessToken(res.access_token);
        this.token = res.access_token;
        return res.access_token;
      });
  }

  async getProfile(): Promise<any | void> { 
    console.log('>>> token 2', this.spotifyApi.getAccessToken())

    try {
      const profile = await this.spotifyApi.getMe();
      console.log(profile, "getProfile")
      
      db.collection("users").add({
        name: profile.display_name
      })
      .then(function(docRef) {
          console.log("Document written with ID: ", docRef.id);
      })
      .catch(function(error) {
          console.error("Error adding document: ", error);
      });
    
    } catch (error) {
      console.log(error)
      // this.spotifyAPIErrorHandler(error, this.getProfile);
    }
  }

  // getPlaylist() {}

  // savePlaylist() {}

  // getArtists() {}

  // saveArtists() {}

  // getAlbums() {}

  // saveAlbums() {}

  // getListenLater() {}
  
  // saveListenLater() {}

  // getThemePreferences() {}

  loginRedirect() {
    const redirecUrl = `${apiUrl()}/${this._spotifyUrls.redirect}`;
    window.location = redirecUrl;
  }

  refreshToken(): Promise<string> {
    const url: string = `${apiUrl()}/refreshToken`;
    return fetch(url)
      .catch(function(error) {
        console.error("Error on token refresh: ", error);
     });
    // TODO: Catch error
  }

  async spotifyAPIErrorHandler(error: any, fn: function) {
    // Retry if token expired
    if (error.status === 401) {
      this.token = await this.refreshToken();
      return fn();
    }

    handleError(error, 'spa:spotify:getProfile')
  }
}
export default SpotifyService;