import { handleError } from "../utils/helpers";

class AuthService {
  isSpotifyUserLoggedOut() {
    const searchParams = new URLSearchParams(window.location.search);
    const hasCode = searchParams.has("code");

    if (hasCode) {
      const code: string | null = searchParams.get("code");
      this.setCode(code);

      // TODO: TO BE REMOVED (JUST AND EXAMPLE)
      // setTimeout(() => {
      //   this.getArtistAlbums();
      // }, 0)

      return false;
    } else {
      this.login();
      return true;
    }
  }

  login() {
    window.location = "https://us-central1-social-music-addd0.cloudfunctions.net/app/redirect" as unknown as Location;
  }

  setCode(code: string | null) {
    const url = "https://us-central1-social-music-addd0.cloudfunctions.net/app/setCode";

    fetch(url, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      mode: 'cors',
      body: JSON.stringify({ code: code })
    })
      .then(res => {
        console.log(res, 'setCode')
      })
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