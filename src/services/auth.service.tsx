import { handleError } from "../utils/helpers";
import BackendService from "./backend.service";

type AuthUrls = {
  redirect: string;
  setCode: string;
}

class AuthService {
  private _loggedIn: boolean = false;
  private backendService: any;
  private _authUrls: AuthUrls = {
    redirect: "redirect",
    setCode: "setCode"
  };

  constructor() {
    this.backendService = new BackendService();
  }
  
  get loggedIn(): boolean {
    return this._loggedIn;
  }
  
  set loggedIn(value) {
    this._loggedIn = value;
  }

  async login() {
    const searchParams = new URLSearchParams(window.location.search);
    const hasCode = searchParams.has("code");

    if (hasCode) {
      const code: string | null = searchParams.get("code");
      this.setCode(code);
      this.loggedIn = true;
    } else {
      this.loggedIn = false;
      window.location = `${this.backendService.apiUrl}/${this._authUrls.redirect}` as unknown as Location;
    }
  }

  setCode(code: string | null) {
    const url = `${this.backendService.apiUrl}/${this._authUrls.setCode}`;

    fetch(url, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      mode: 'cors',
      body: JSON.stringify({ code: code })
    })
    .then(res => {
      console.log(res, 'setCode')
    })
    .catch(err => handleError(err, 'setCode'));
  }

}
export default AuthService;