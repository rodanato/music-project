import { handleError } from "../utils/helpers";

class AuthService {
  constructor() {

  }

  login() {
    window.location = "https://us-central1-social-music-addd0.cloudfunctions.net/app/redirect" as unknown as Location;
  }

  setCode(code: string | null) {
    const url = "https://us-central1-social-music-addd0.cloudfunctions.net/app/setCode";

    fetch(url, {
      method: "POST",
      body: JSON.stringify({ code: code }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => console.log(res, 'setCode'))
      .catch(err => handleError(err, 'setCode'));
  }

  getArtistAlbums() {
    const url = "https://us-central1-social-music-addd0.cloudfunctions.net/app/getArtistAlbums";

    fetch(url, {
      method: "GET"
    })
      .then(res => console.log(res, 'getArtistAlbums'))
      .catch(err => handleError(err, 'getArtistAlbums'));
  }
}
export default AuthService;