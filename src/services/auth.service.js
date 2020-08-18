// @flow
import { handleError } from "../utils/helpers";
import { apiUrl } from "../utils/constants";
import { auth } from "./firebase/config";

type AuthUrls = {
  redirect: string;
  setCode: string;
  createFirebaseAccount: string;
}

type setCodeResponse = {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
  token_type: string;
}

class AuthService {
  static instance: AuthService;
  static getInstance() {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  _authUrls: AuthUrls = {
    redirect: "redirect",
    setCode: "setCode",
    createFirebaseAccount: "createFirebaseAccount"
  };

  getCodeIfPresent() {
    const searchParams: URLSearchParams = new URLSearchParams(window.location.search);
    return searchParams.has("code") ? searchParams.get("code") : false;
  }

  spotifyLogin() {
    const redirecUrl = `${apiUrl()}/${this._authUrls.redirect}`;
    window.location = redirecUrl;
  }

  firebaseLogout() {
    return auth.signOut()
  }

  async authenticate(code: string) {
    try {
      const spotifyToken: string = await this.getSpotifyToken(code);
      const firebaseToken: string = await this.createFirebaseAccount(spotifyToken);

      await auth.signInWithCustomToken(firebaseToken);
    } catch (error) {
      handleError(error, 'on authentication');
    }
  }

  getSpotifyToken(code: string): Promise<string> {
    const url = `${apiUrl()}/${this._authUrls.setCode}`;
    const request = new Request(url, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      mode: 'cors',
      body: JSON.stringify({ code: code })
    });

    return fetch(request)
      .then((res: any) => res.json())
      .then((res: setCodeResponse) => res.access_token)
  }

  createFirebaseAccount(spotifyToken: string): Promise<string> {
    const url = `${apiUrl()}/${this._authUrls.createFirebaseAccount}`;
    const request = new Request(url, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      mode: 'cors',
      body: JSON.stringify({ token: spotifyToken })
    });

    return fetch(request)
      .then((res: any) => res.json())
      .then((firebaseToken: string) => firebaseToken);
  }
}
export default AuthService;