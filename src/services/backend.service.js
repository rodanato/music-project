// @flow
import AuthService from "services/auth.service";
import DatabaseService from "services/database.service";
import SpotifyService from "services/spotify.service";
import type {
  DbProfile,
  SpotifyProfile,
  Playlist,
  PlaylistsDetail,
  Genre,
} from "shared/types/spotify.types";
import { ThemeContainerStateService } from "app/theme-container/theme-container.state";
import { SliderStateService } from "app/authenticated/slider/slider.state";
import { handleError } from "utils/helpers";
import { UserStateService } from "shared/user.state";

class BackendService {
  static instance: BackendService;
  static getInstance(): BackendService {
    if (!BackendService.instance) {
      BackendService.instance = new BackendService();
    }

    return BackendService.instance;
  }

  authService: AuthService;
  databaseService: DatabaseService;
  spotifyService: SpotifyService;
  // firstLogin: boolean = false;
  loginTime: number;

  constructor() {
    this.authService = AuthService.getInstance();
    this.databaseService = DatabaseService.getInstance();
    this.spotifyService = SpotifyService.getInstance();
  }

  async getProfileData(): Promise<?DbProfile> {
    if (this.timeHasExpiredFor("profile")) {
      return await this.getProfileFromSpotify();
    }

    const { email } = UserStateService.state.context.firebaseUser;
    const profileOnDB: ?DbProfile = await this.databaseService.getProfile(
      email
    );

    if (profileOnDB) {
      this.updatesBasedOnProfileConfig(profileOnDB);
      return profileOnDB;
    }

    return await this.getProfileFromSpotify();
  }

  async getUserPlaylists(): Promise<?PlaylistsDetail> {
    if (this.timeHasExpiredFor("playlists")) {
      return await this.getPlaylistsFromSpotify();
    }
    const { uid } = UserStateService.state.context.firebaseUser;
    const playlistsOnDB: ?PlaylistsDetail = await this.databaseService.getPlaylists(
      uid
    );

    return playlistsOnDB ? playlistsOnDB : await this.getPlaylistsFromSpotify();
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

  updatesBasedOnProfileConfig(profileOnDB: DbProfile): void {
    UserStateService.send("UPDATE_USER_INFO", { userInfo: profileOnDB });

    const currentTheme = ThemeContainerStateService.state.value.rendered;

    if (currentTheme !== profileOnDB.theme) {
      const newThemeEvent = `CHANGE_TO_${profileOnDB.theme.toUpperCase()}`;
      ThemeContainerStateService.send(newThemeEvent);
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

  timeHasExpiredFor(feature: string): boolean {
    const timeToRefecth =
      SliderStateService.state.context.hoursToRefetch[feature];

    return Date.now() - this.loginTime > timeToRefecth;
  }

  saveLoginTime() {
    // this.firstLogin = true;
    this.loginTime = Date.now();
  }

  cleanStorage() {
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("expirationDate");
    localStorage.removeItem("spotifyToken");
    localStorage.removeItem("spotifyRefreshToken");
    localStorage.removeItem("firebaseUser");
  }

  // DATABASE
  updateProfileOnDB(key: string, value: string) {
    const { uid } = UserStateService.state.context.firebaseUser;

    this.databaseService.updateProfile(key, value, uid);
  }

  refetchPersistedData() {
    // TODO: On any change to user´s spotify data also allocated on the DB, do a refetch of each from the spotify API so the DB will be up to date
    // Use a listener
  }

  // AUTH
  async logout(): Promise<void> {
    return await this.authService.firebaseLogout();
  }

  async login(code: string): Promise<any> {
    await this.spotifyService.getToken(code);
    const userProfile = await this.spotifyService.getProfile();
    return await this.authService.firebaseLogin(code, userProfile);
  }

  // SPOTIFY
  async getProfileFromSpotify(): Promise<?DbProfile> {
    try {
      const profileData: ?SpotifyProfile = await this.spotifyService.getProfile();

      if (!profileData) return;

      const dbProfile: DbProfile = this.adaptSpotifyProfileToDBProfile(
        profileData
      );
      const { uid } = UserStateService.state.context.firebaseUser;
      const theme = ThemeContainerStateService.state.value.rendered;
      const newUserData = {
        ...dbProfile,
        theme: theme,
      };

      this.databaseService.saveProfile(newUserData, uid);
      return dbProfile;
    } catch (e) {
      handleError(e, "spa:backendService:getProfileFromSpotify");
      // FIXME: On unauthorized response send user to logout
    }
  }

  async getPlaylistsFromSpotify(): Promise<?PlaylistsDetail> {
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
    ].map((p) => {
      const { description, id, images, name } = p;

      return {
        name,
        images,
        id,
        description,
      };
    });

    const genres: ?(Genre[]) = await this.spotifyService.getGenres();

    if (!genres) return;

    const playlistsDetail = {
      total: playlistsFirstGroup.total,
      limit: playlistsFirstGroup.limit,
      items: allPlaylists,
      genres: genres,
    };
    const { uid } = UserStateService.state.context.firebaseUser;

    this.databaseService.savePlaylists(playlistsDetail, uid);
    return playlistsDetail;
  }

  cleanExpirationTimeout() {
    this.spotifyService.cleanExpirationTimeout();
  }

  loginRedirect() {
    this.spotifyService.loginRedirect();
  }

  getCodeIfPresent(): mixed {
    const searchParams: URLSearchParams = new URLSearchParams(
      window.location.search
    );
    return searchParams.has("code") ? searchParams.get("code") : false;
  }
}

export default BackendService;
