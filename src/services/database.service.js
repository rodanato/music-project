// @flow
import SpotifyService from "services/spotify.service";
import AuthService from "services/auth.service";
import { db } from "config/firebase";
import type {
  DbProfile,
  SpotifyProfile,
  Playlists,
} from "shared/types/spotify.types";
import { ThemeContainerStateService } from "app/theme-container/theme-container.state";
import { SliderStateService } from "app/authenticated/slider/slider.state";
import {
  handleError,
  getIfExistOnStorage,
  persistOnLocalStorage,
} from "utils/helpers";

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
  firstLogin: boolean = false;
  loginTime: number;

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

  async getPlaylistsFromDB(): Promise<Playlists | mixed> {
    const id = this.authService.firebaseUser.uid;
    console.log("playlists fromDB");

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
    console.log("playlists fromSpotify");

    let allPlaylists = [];
    const firstGroup = await this.spotifyService.getPlaylists(0);
    const playlistsPromises = [];
    const totalCalls = Math.ceil(firstGroup.total / firstGroup.limit);

    for (let i = 1; i < totalCalls; i++) {
      playlistsPromises.push(this.spotifyService.getPlaylists(i * 20));
    }

    const res = await Promise.all(playlistsPromises);
    allPlaylists = [...firstGroup.items, ...res.flatMap((p) => p.items)];

    const playlists = { ...firstGroup, items: allPlaylists };
    this.savePlaylistsOnDB(playlists);
    return playlists;
  }

  async getProfileData(): Promise<DbProfile | void> {
    const profileOnDB: DbProfile = await this.getProfileFromDB();

    if (profileOnDB?.email) {
      this.updatesBasedOnProfileConfig(profileOnDB);
      return profileOnDB;
    }

    return this.getProfileFromSpotify();
  }

  timeHasExpiredFor(feature: string): boolean {
    const timeToRefecth =
      SliderStateService.state.context.hoursToRefetch[feature];

    return Date.now() - this.loginTime > timeToRefecth;
  }

  saveLoginTime() {
    this.firstLogin = true;
    this.loginTime = Date.now();
  }

  async getUserPlaylists(): Promise<Playlist | void> {
    // if (this.firstLogin || this.timeHasExpiredFor("playlists")) {
    //   this.firstLogin = false;
    //   return await this.getPlaylistsFromSpotify();
    // }
    return await this.getPlaylistsFromSpotify();

    // return await this.getPlaylistsFromDB();
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
