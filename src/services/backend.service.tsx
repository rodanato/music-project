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

  // TODO: To be removed (EXAMPLE)
  getArtistAlbums() { 
    const url = `${this.apiUrl}/getArtistAlbums`;

    fetch(url, {
      method: "GET"
    })
    .then(res => console.log(res, 'getArtistAlbums'))
    .catch(err => handleError(err, 'getArtistAlbums'));
  }

  getProfile() {}

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