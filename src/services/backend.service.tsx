import { handleError, isProd } from "../utils/helpers";
import DatabaseService from "./database.service";

class BackendService {
  private _testUrl: string = "https://us-central1-social-music-addd0.cloudfunctions.net/api";
  private _prodUrl: string = "https://us-central1-social-music-prod.cloudfunctions.net/api";
  private databaseService: any;

  constructor() {
    this.databaseService = new DatabaseService();
  }
  
  get apiUrl(): string {
    return isProd() ? this._prodUrl : this._testUrl;
  }

  getProfile() { 
    const url = `${this.apiUrl}/getProfile`;

    fetch(url, {
      method: "GET"
    })
    .then(res => console.log(res, 'getProfile'))
    .catch(err => handleError(err, 'getProfile'));
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