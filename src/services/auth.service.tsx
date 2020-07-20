import { handleError, persistOnLocalStorage } from "../utils/helpers";
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
  private static instance: AuthService;
  public static getInstance() {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }

    return AuthService.instance;
  }

  private _loggedIn: boolean = false;
  private _authUrls: AuthUrls = {
    redirect: "redirect",
    setCode: "setCode",
    createFirebaseAccount: "createFirebaseAccount"
  };

  get loggedIn(): boolean {
    return this._loggedIn;
  }

  set loggedIn(value) {
    this._loggedIn = value;
  }

  getCodeIfPresent() {
    const searchParams = new URLSearchParams(window.location.search);
    return searchParams.has("code") ? searchParams.get("code") : false;
  }

  login() {
    const redirecUrl = `${apiUrl()}/${this._authUrls.redirect}`;
    window.location = redirecUrl as unknown as Location;
  }

  logout() {
    auth.signOut().then(function () {
      localStorage.removeItem('loggedIn');
    }).catch(function (err) {
      handleError(err, "signOut")
    });
  }

  removeCodeFromUrl() {
    window.history.replaceState({}, document.title, "/");
  }

  onLoginSuccess() {
    this.removeCodeFromUrl();
    this.loggedIn = true;
    persistOnLocalStorage("loggedIn", "true");
  }

  async authenticate(code: string) {
    try {
      const spotifyToken: string = await this.getSpotifyToken(code);
      const firebaseToken: string = await this.createLoginAccount(spotifyToken);

      await auth.signInWithCustomToken(firebaseToken);
      this.onLoginSuccess();
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
        // const expirationDate = new Date();
        // expirationDate.setTime(expirationDate.getTime() + (res.expires_in * 1000));
        // persistOnLocalStora("accessExpires", expirationDate.toString());
  }

  createLoginAccount(spotifyToken: string): Promise<string> {
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