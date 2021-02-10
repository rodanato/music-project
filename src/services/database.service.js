// @flow
import SpotifyService from "services/spotify.service";
import AuthService from "services/auth.service";
import { db } from "config/firebase";
import type {
  DbProfile,
  SpotifyProfile,
  Playlist,
  PlaylistsDetail,
} from "shared/types/spotify.types";
import { ThemeContainerStateService } from "app/theme-container/theme-container.state";
import { SliderStateService } from "app/authenticated/slider/slider.state";
import { handleError } from "utils/helpers";

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
      theme: "",
    };
  }

  async getProfileFromDB(): Promise<?DbProfile> {
    const email = this.authService.firebaseUser.email;

    try {
      // let response: DbProfile = {};
      const users = await db.collection("users").get();
      users.forEach(function(doc) {
        if (doc.data().email === email) {
          return doc.data();
        }
      });
      // return response;
    } catch (error) {
      handleError("spa:databaseService:getProfileFromDB", error);
    }
  }

  // async getPlaylistsFromDB(): Promise<?PlaylistsDetail> {
  //   const id = this.authService.firebaseUser.uid;
  //   console.log("playlists fromDB");

  //   try {
  //     await db
  //       .collection("playlists")
  //       .doc(id)
  //       .get()
  //       .then(function(doc) {
  //         if (doc.exists) {
  //           return doc.data();
  //         } else {
  //           // doc.data() will be undefined in this case
  //           console.log("No such document!");
  //         }
  //       });
  //   } catch (error) {
  //     handleError("spa:databaseService:getPlaylistsFromDB", error);
  //   }
  // }

  updatesBasedOnProfileConfig(profileOnDB: DbProfile): void {
    this.spotifyService.userInfo = profileOnDB;
    const currentTheme = ThemeContainerStateService.state.value.rendered;

    if (currentTheme !== profileOnDB.theme) {
      const newThemeEvent = `CHANGE_TO_${profileOnDB.theme.toUpperCase()}`;
      ThemeContainerStateService.send(newThemeEvent);
    }
  }

  async getProfileFromSpotify(): Promise<?DbProfile> {
    try {
      const profileData: ?SpotifyProfile = await this.spotifyService.getProfile();

      if (!profileData) return;

      const dbProfile: DbProfile = this.adaptSpotifyProfileToDBProfile(
        profileData
      );
      this.saveProfileOnDB(dbProfile);
      return dbProfile;
    } catch (e) {
      handleError(e, "spa:databaseService:getProfileFromSpotify");
      // FIXME: On unauthorized response send user to logout
    }
  }

  getPlaylistDetailPromises(totalCalls: number) {
    let promisesArray = [];

    for (let i = 1; i < totalCalls; i++) {
      const playlistGroup = this.spotifyService.getPlaylists(i * 20);
      promisesArray.push(playlistGroup);
    }

    return promisesArray;
  }

  extractItemsFromPlaylistsDetail(
    playlistDetailArray: Array<?PlaylistsDetail>
  ): Array<Playlist> {
    return playlistDetailArray.flatMap((p: ?PlaylistsDetail): any => {
      if (p) return p.items;
    });
  }

  async getPlaylistsFromSpotify(): Promise<?(Playlist[])> {
    const playlistsFirstGroup: ?PlaylistsDetail = await this.spotifyService.getPlaylists(
      0
    );

    if (!playlistsFirstGroup) return;

    const totalCalls = Math.ceil(
      playlistsFirstGroup.total / playlistsFirstGroup.limit
    );
    const playlistDetailPromises: Array<
      Promise<?PlaylistsDetail>
    > = this.getPlaylistDetailPromises(totalCalls);
    const playlistDetailArray: Array<?PlaylistsDetail> = await Promise.all(
      playlistDetailPromises
    );
    const remainingPlaylists: Array<Playlist> = this.extractItemsFromPlaylistsDetail(
      playlistDetailArray
    );

    const allPlaylists: Array<Playlist> = [
      ...playlistsFirstGroup.items,
      ...(remainingPlaylists ? remainingPlaylists : []),
    ];

    const playlists = {
      ...playlistsFirstGroup,
      items: allPlaylists,
    };

    this.savePlaylistsOnDB(playlists);
    return allPlaylists;
  }

  async getProfileData(): Promise<?DbProfile> {
    const profileOnDB: ?DbProfile = await this.getProfileFromDB();

    if (profileOnDB) {
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

  async getUserPlaylists(): Promise<?(Playlist[])> {
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

  savePlaylistsOnDB(data: PlaylistsDetail) {
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

  async getPlaylistGenres() {
    return await this.spotifyService.getGenres();
  }
}

export default DatabaseService;
