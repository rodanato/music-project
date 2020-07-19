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

  getProfile() { 
    const url = `${apiUrl()}/getProfile`;

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