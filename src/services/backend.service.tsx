import { handleError } from "../utils/helpers";
import { apiUrl } from "../utils/constants";

class BackendService {
  private static instance: BackendService;
  public static getInstance() {
    if (!BackendService.instance) {
      BackendService.instance = new BackendService();
    }

    return BackendService.instance;
  }

  refreshToken() {
    const url = `${apiUrl()}/refreshToken`;
    return fetch(url);
  }

  async spotifyAPIErrorHandler(error: any, fn: Function) {
    // Retry if token expired
    if (error.status === 401) {
      await this.refreshToken();
      return fn();
    }

    handleError(error, 'getProfile')
  }

  async getProfile(): Promise<any | void> { 
    const url = `${apiUrl()}/getProfile`;

    try {
      const res = await fetch(url);
      console.log(res, "getProfile")
    } catch (error) {
      this.spotifyAPIErrorHandler(error, this.getProfile);
    }
  }

  getPlaylist() {}

  savePlaylist() {}

  getArtists() {}

  saveArtists() {}

  getAlbums() {}

  saveAlbums() {}

  getListenLater() {}
  
  saveListenLater() {}

  getThemePreferences() {}
}
export default BackendService;