// @flow
import SpotifyService from "services/spotify.service";
import AuthService from "services/auth.service";
import { db } from "config/firebase";
import type { DbProfile, SpotifyProfile } from "shared/types/spotify.types";
import { handleError } from "utils/helpers";
import { ThemeContainerService } from "app/theme-container/theme-container.state";

class DatabaseService {
  static instance: DatabaseService;
  static getInstance(): DatabaseService {
    if (!DatabaseService.instance) {
      DatabaseService.instance = new DatabaseService();
    }

    return DatabaseService.instance;
  }

  authService: AuthService;
  spotifyService: SpotifyService;

  constructor() {
    this.spotifyService = SpotifyService.getInstance();
    this.authService = AuthService.getInstance();
  }

  spotifyProfileToDBProfile(data: SpotifyProfile): DbProfile {
    return {
      name: data.display_name,
      email: data.email,
      photo: data.images[0].url,
      spotifyId: data.id,
    };
  }

  async getFromFirestore(): Promise<DbProfile | void> {
    // console.log(">>> currentUser", this.authService.firebaseUser);
    const email = this.authService.firebaseUser.email;

    try {
      let response: DbProfile;
      const users = await db.collection("users").get();
      users.forEach(function(doc) {
        if (doc.data().email === email) {
          console.log(doc.id, " => ", doc.data());
          response = doc.data();
        }
      });
      return response;
    } catch (error) {
      handleError("spa:databaseService:getFromFirestore", error);
    }
  }

  async getProfileData(): Promise<DbProfile | void> {
    // if (indexedDB) return profileData

    // If profile exists on DB
    const profileOnDB: DbProfile = await this.getFromFirestore();
    if (profileOnDB && profileOnDB.email) {
      this.spotifyService.userInfo = profileOnDB;
      console.log(">>> is on DB");

      if (ThemeContainerService.state.value.rendered !== profileOnDB.theme) {
        const newThemeEvent = `CHANGE_TO_${profileOnDB.theme.toUpperCase()}`;
        ThemeContainerService.send(newThemeEvent);
      }

      return profileOnDB;
    }

    // If not, get it from Spotify API
    // if (spotify.getProfile) return profileData
    try {
      console.log(">>> getting from spotify and save");
      let profileData: SpotifyProfile | void = await this.spotifyService.getProfile();
      if (profileData) {
        const dbProfile = this.spotifyProfileToDBProfile(profileData);
        this.saveProfileOnDB(dbProfile);
        return dbProfile;
      }
    } catch (e) {
      handleError(e, "spa:databaseService:getProfileData");
    }

    // sync both DBs async
  }

  getUserPlaylists() {
    /*
      if (indexedDB) return UserPlaylists
      if not firestore.getUserPlaylists
      sync both DBs
      return UserPlaylists
    */
  }

  saveProfileOnDB(data: DbProfile) {
    const newUserData = {
      ...data,
      theme: ThemeContainerService.state.value.rendered,
    };

    db.collection("users")
      .doc(this.authService.firebaseUser.uid)
      .set(newUserData)
      // .then(function(docRef) {
      //   console.log("Document written with ID: ", docRef.id);
      // })
      .catch(function(error) {
        console.error("Error adding document: ", error);
      });
  }

  updateProfileOnDB(key: string, value: string) {
    db.collection("users")
      .doc(this.authService.firebaseUser.uid)
      .update({ [key]: value });
  }
}

export default DatabaseService;
