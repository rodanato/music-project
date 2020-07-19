import { handleError, persistOnLocalStora } from "../utils/helpers";
import { apiUrl } from "../utils/constants";
import { auth } from "./firebase/config";

type AuthUrls = {
  redirect: string;
  setCode: string;
  createFirebaseAccount: string;
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

  // async isAuthenticated() {
  //   // Get expiration date from localstorage
  //   const accessExpires: string | null = localStorage.getItem("accessExpires");

  //   if (accessExpires !== null) {
  //     const now = new Date();
  //     const accessExpired = +accessExpires < now.getTime();

  //     // If present and expired go to login
  //     if (accessExpired) {
  //       // this.login();
  //       return;
  //     }
  //     // If present and not expired go to main.organism
  //     this.loggedIn = true;
  //   }

  //   // If null and urlCode is present go to main.organism
  //   const code = this.getCodeIfPresent();
  //   if (code) {
  //     return this.setCode(code)
  //       .then(() => {
  //       });
  //   }

  //   // If null and urlCode not present go to login
  //   // this.login();
  // }

  getCodeIfPresent() {
    const searchParams = new URLSearchParams(window.location.search);
    return searchParams.has("code") ? searchParams.get("code") : false;
  }

  login() {
    const redirecUrl = `${apiUrl()}/${this._authUrls.redirect}`;
    window.location = redirecUrl as unknown as Location;
  }

  logout() {
    auth.signOut().then(function() {
      localStorage.removeItem('loggedIn');
    }).catch(function(err) {
      handleError(err, "signOut")
    });
  }

  setCode(code: string | null): Promise<any> {
    const url = `${apiUrl()}/${this._authUrls.setCode}`;
    const url2 = `${apiUrl()}/${this._authUrls.createFirebaseAccount}`;
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
      .then((res: any) => {
        console.log(res, 'res')

        return fetch(url2, {
          method: "POST",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          mode: 'cors',
          body: JSON.stringify({ token: res.access_token })
        })
        .then((res: any) => res.json())
        .then((firebaseToken: string) => {
          auth.signInWithCustomToken(firebaseToken)
          .then(() => {
            persistOnLocalStora("loggedIn", "true");
            window.history.replaceState({}, document.title, "/");
          })
          .catch((err) => {
            handleError(err, "signInWithCustomToken")
          });
        })
        .catch(err => handleError(err, 'createFirebaseAccount'));


        // this.loggedIn = true;
        // const expirationDate = new Date();
        // expirationDate.setTime(expirationDate.getTime() + (res.expires_in * 1000));
        // persistOnLocalStora("accessExpires", expirationDate.toString());
      })
      .catch(err => handleError(err, 'setCode'));
  }
}
export default AuthService;