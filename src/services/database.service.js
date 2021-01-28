// @flow
import SpotifyService from "services/spotify.service";
import AuthService from "services/auth.service";
import { db } from "config/firebase";
import type {
  DbProfile,
  SpotifyProfile,
  Playlists,
} from "shared/types/spotify.types";
import { handleError } from "utils/helpers";
import { ThemeContainerStateService } from "app/theme-container/theme-container.state";

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

  adaptSpotifyProfileToDBProfile(data: SpotifyProfile): DbProfile {
    return {
      name: data.display_name,
      email: data.email,
      photo: data.images[0].url,
      spotifyId: data.id,
    };
  }

  async getProfileFromDB(): Promise<DbProfile | void> {
    const email = this.authService.firebaseUser.email;

    try {
      let response: DbProfile;
      const users = await db.collection("users").get();
      users.forEach(function(doc) {
        if (doc.data().email === email) {
          response = doc.data();
        }
      });
      return response;
    } catch (error) {
      handleError("spa:databaseService:getProfileFromDB", error);
    }
  }

  async getPlaylistsFromDB(): Promise<Playlists | void> {
    const id = this.authService.firebaseUser.uid;

    try {
      let response: Playlists;

      await db
        .collection("playlists")
        .doc(id)
        .get()
        .then(function(doc) {
          if (doc.exists) {
            response = doc.data();
          } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
          }
        });

      return response;
    } catch (error) {
      handleError("spa:databaseService:getPlaylistsFromDB", error);
    }
  }

  updatesBasedOnProfileConfig(profileOnDB: SpotifyProfile): void {
    this.spotifyService.userInfo = profileOnDB;
    const currentTheme = ThemeContainerStateService.state.value.rendered;

    if (currentTheme !== profileOnDB.theme) {
      const newThemeEvent = `CHANGE_TO_${profileOnDB.theme.toUpperCase()}`;
      ThemeContainerStateService.send(newThemeEvent);
    }
  }

  async getProfileFromSpotify(): Promise<DbProfile | void> {
    try {
      const profileData: SpotifyProfile | void = await this.spotifyService.getProfile();

      if (profileData) {
        const dbProfile = this.adaptSpotifyProfileToDBProfile(profileData);
        this.saveProfileOnDB(dbProfile);
        return dbProfile;
      }
    } catch (e) {
      handleError(e, "spa:databaseService:getProfileFromSpotify");
      // FIXME: On unauthorized response send user to logout
    }
  }

  async getPlaylistsFromSpotify(): Promise<Playlists | void> {
    try {
      console.log(">>> getting playlists from spotify and save");
      const playlists: Playlists | void = await this.spotifyService.getPlaylists();

      if (playlists) {
        this.savePlaylistsOnDB(playlists);
        return playlists;
      }
    } catch (e) {
      handleError(e, "spa:databaseService:getPlaylistsFromSpotify");
      // FIXME: On unauthorized response send user to logout
    }
  }

  async getProfileData(): Promise<DbProfile | void> {
    const profileOnDB: DbProfile = await this.getProfileFromDB();

    if (profileOnDB?.email) {
      this.updatesBasedOnProfileConfig(profileOnDB);
      return profileOnDB;
    }

    return this.getProfileFromSpotify();
  }

  async getUserPlaylists() {
    const playlistsOnDB: Playlists = await this.getPlaylistsFromDB();

    return playlistsOnDB ? playlistsOnDB : this.getPlaylistsFromSpotify();
  }

  saveProfileOnDB(data: DbProfile) {
    const newUserData = {
      ...data,
      theme: ThemeContainerStateService.state.value.rendered,
    };

    db.collection("users")
      .doc(this.authService.firebaseUser.uid)
      .set(newUserData)
      .catch(function(error) {
        console.error("spa:databaseService:saveProfileOnDB", error);
      });
  }

  savePlaylistsOnDB(data: Playlists) {
    db.collection("playlists")
      .doc(this.authService.firebaseUser.uid)
      .set(data)
      .catch(function(error) {
        console.error("spa:databaseService:savePlaylistsOnDB", error);
      });
  }

  updateProfileOnDB(key: string, value: string) {
    db.collection("users")
      .doc(this.authService.firebaseUser.uid)
      .update({ [key]: value })
      .catch(function(error) {
        console.error("spa:databaseService:updateProfileOnDB ", error);
      });
  }
}

export default DatabaseService;
