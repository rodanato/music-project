// @flow
// import Dexie from "dexie";
import SpotifyService from "services/spotify.service";
import AuthService from "services/auth.service";
import { db } from "config/firebase";
import type { DbProfile, SpotifyProfile } from "shared/types/spotify.types";
import { handleError } from "utils/helpers";
import { ThemeContainerService } from "app/authenticated/theme-container/theme-container.state";

class DatabaseService {
  static instance: DatabaseService;
  static getInstance(): DatabaseService {
    if (!DatabaseService.instance) {
      DatabaseService.instance = new DatabaseService();
    }

    return DatabaseService.instance;
  }

  // localDB: any;
  authService: AuthService;
  spotifyService: SpotifyService;

  constructor() {
    this.spotifyService = SpotifyService.getInstance();
    this.authService = AuthService.getInstance();
  }

  // TODO: Save DB data locally
  // createDB(): Dexie {
  //   this.localDB = new Dexie("myDb");
  //   this.localDB.version(1).stores({
  //     profiles: `++id, name`,
  //   });

  //   return this.localDB.open().catch(function(err) {
  //     console.error("Failed to open db: " + err);
  //   });
  // }

  // saveProfile() {
  //   return this.localDB.profiles
  //     .put({ name: "Ingemar Bergman" })
  //     .catch(function(e) {
  //       console.error(e);
  //     });
  // }

  spotifyProfileToDBProfile(data: SpotifyProfile): DbProfile {
    return {
      name: data.display_name,
      email: data.email,
      photo: data.images[0].url,
      spotifyId: data.id,
    };
  }

  // getProfile() {
  //   return this.localDB.profiles.get(0).then(function(profile) {
  //     console.log("DbProfile name: " + JSON.stringify(profile));
  //   });
  // }

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
      return profileOnDB;
    }

    // If not, get it from Spotify API
    // if (spotify.getProfile) return profileData
    try {
      console.log(">>> getting from spotify and save");
      let profileData: SpotifyProfile | void = await this.spotifyService.getProfile();
      if (profileData) {
        const dbProfile = this.spotifyProfileToDBProfile(profileData);
        this.saveProfileOnDBs(dbProfile);
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

  saveProfileOnDBs(data: DbProfile) {
    const { name, email, photo, spotifyId } = data;

    db.collection("users")
      .add({
        name,
        email,
        photo,
        spotifyId,
        theme: ThemeContainerService.state.value.rendered,
      })
      .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
      })
      .catch(function(error) {
        console.error("Error adding document: ", error);
      });
  }
}
export default DatabaseService;
