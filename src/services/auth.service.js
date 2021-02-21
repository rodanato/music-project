// @flow
import {
  handleError,
  apiUrl,
  persistOnStorage,
  getFromStorage,
} from "utils/helpers";
import { auth } from "config/firebase";
import { UserStateService } from "shared/user.state";

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

  _authUrls: AuthUrls = {
    createFirebaseAccount: "createFirebaseAccount",
  };

  constructor() {
    const signedInFirebaseUser: Object = getFromStorage("firebaseUser");

    if (signedInFirebaseUser) {
      UserStateService.send("UPDATE_FIREBASE_USER", {
        firebaseUser: signedInFirebaseUser,
      });
    }
  }

  async firebaseLogout(): Promise<void> {
    try {
      return await auth.signOut();
    } catch (error) {
      handleError(error, "spa:authService:firebaseLogout");
    }
  }

  async firebaseLogin(code: string, userProfile: any): Promise<any> {
    auth.onAuthStateChanged((user) => {
      if (user) {
        UserStateService.send("UPDATE_FIREBASE_USER", { firebaseUser: user });
        persistOnStorage("firebaseUser", user);
      }
    });

    try {
      const firebaseToken: string | void = await this.createFirebaseAccount(
        userProfile
      );

      return await auth.signInWithCustomToken(firebaseToken);
    } catch (error) {
      handleError(error, "spa:authService:firebaseLogin");
    }
  }

  async createFirebaseAccount(userProfile: any): Promise<string | void> {
    const url = `${apiUrl()}/${this._authUrls.createFirebaseAccount}`;
    const request = new Request(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      mode: "cors",
      body: JSON.stringify({ userprofile: userProfile }),
    });

    try {
      const res = await fetch(request);
      const firebaseToken: string = await res.json();
      return firebaseToken;
    } catch (e) {
      handleError(e, "spa:authService:createFirebaseAccount");
    }
  }
}
export default AuthService;
