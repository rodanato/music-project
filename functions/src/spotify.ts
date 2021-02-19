import { admin, cors, OAUTH_SCOPES, spotifyApiConfig } from "./config/config";
import { Profile, Playlist } from "./config/types";
import { handleError } from "./config/utils";
const SpotifyWebApi = require("spotify-web-api-node");
const crypto = require("crypto");
const express = require("express");
const spotify = express();

const spotifyApi = new SpotifyWebApi(spotifyApiConfig);

spotify.use(cors);

spotify.get("/redirect", (req: any, res: any) => {
  const state = crypto.randomBytes(20).toString("hex");
  const authorizeURL = spotifyApi.createAuthorizeURL(
    OAUTH_SCOPES,
    state.toString()
  );
  res.redirect(301, authorizeURL);
});

async function getPlaylistIds(userProfileId: string) {
  try {
    const playlistsDetail = await spotifyApi.getUserPlaylists(userProfileId);
    return playlistsDetail.body.items.map((p: Playlist) => p.id);
  } catch (e) {
    handleError(e, "api:spotify:getPlaylistIds");
  }
}

// function saveGenresOnDB(genres: any, userProfileId: string) {
//   admin.db
//     .collection("playlists")
//     .doc(`spotify:${userProfileId}`)
//     .update({ genres: genres })
//     .catch(function(error: any) {
//       handleError("api:spotify:saveGenresOnDB", error);
//     });
// }

async function getGenres(songs: any[]) {
  const genres = [];
  const artists = [
    ...new Set(
      songs
        .filter((song) => song.track)
        .map((song) => song.track.artists[0].name)
    ),
  ];

  artists.splice(10, artists.length - 10);

  for (let artistName of artists) {
    artistName = artistName.toLowerCase();

    try {
      const searchResult = await spotifyApi.searchArtists(artistName);

      if (searchResult.body.artists.items.length > 0) {
        const artistInfo = searchResult.body.artists.items.filter(
          (artist: any) => artist.name.toLowerCase() === artistName
        );

        if (artistInfo.length > 0) {
          genres.push(...artistInfo[0].genres);
        }
      }
    } catch (e) {
      handleError(e, "api:spotify:getGenres");
    }
  }

  genres.splice(10, genres.length - 10);

  return [...new Set(genres)];
}

function getRandomNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max - min) + min);
}

function filterPlaylistIdstoScan(ids: string[]): string[] {
  const selectedIds = new Array(3)
    .fill(0)
    .map(() => getRandomNumber(0, ids.length - 1));

  return ids.filter((id: string, i: number) => selectedIds.includes(i));
}

spotify.post(
  "/genres",
  async (req: { body: { userProfileId: string; token: string } }, res: any) => {
    await spotifyApi.setAccessToken(req.body.token);
    const { userProfileId } = req.body;
    const playlistIds = await getPlaylistIds(userProfileId);
    const playlistIdstoScan: string[] = filterPlaylistIdstoScan(playlistIds);
    const songs = [];

    for (const playlistId of playlistIdstoScan) {
      try {
        const playlistSongs = await spotifyApi.getPlaylistTracks(playlistId);
        songs.push(...playlistSongs.body.items);
      } catch (e) {
        handleError(e, "api:spotify:getPlaylistTracks");
      }
    }

    const genres = await getGenres(songs);
    // saveGenresOnDB(genres, userProfileId);

    res.json(genres);
  }
);

spotify.post("/setCode", (req: { body: { code: string } }, res: any) => {
  spotifyApi.authorizationCodeGrant(req.body.code).then(
    function(data: any) {
      res.json(data.body);
    },
    function(err: any) {
      handleError(err, "api:spotify:authorizationCodeGrant");
      res.json(err);
    }
  );
});

spotify.post(
  "/refreshToken",
  (req: { body: { token: string; refreshtoken: string } }, res: any) => {
    spotifyApi.setAccessToken(req.body.token);
    spotifyApi.setRefreshToken(req.body.refreshtoken);
    spotifyApi.refreshAccessToken().then(
      function(data: any) {
        res.json(data.body["access_token"]);
      },
      function(err: any) {
        handleError(err, "api:spotify:refreshToken");
        res.json(err);
      }
    );
  }
);

spotify.post(
  "/createFirebaseAccount",
  async (req: { body: { userprofile: Profile } }, res: any) => {
    const { userprofile } = req.body;
    const uid = `spotify:${userprofile.id}`;
    const fakeEmail = `${userprofile.id}@spotify-api-mpp.fake`;
    const userCreationTask = admin
      .auth()
      .updateUser(uid, {
        displayName: userprofile.display_name,
        photoURL: userprofile.images[0].url,
        email: userprofile.email || fakeEmail,
      })
      .catch((error: any) => {
        if (error.code === "auth/user-not-found") {
          return admin.auth().createUser({
            uid: uid,
            displayName: userprofile.display_name,
            photoURL: userprofile.images[0].url,
            email: userprofile.email || fakeEmail,
          });
        }
        throw error;
      });

    return Promise.all([userCreationTask]).then(() => {
      admin
        .auth()
        .createCustomToken(uid)
        .then(function(firebaseToken: string) {
          res.json(firebaseToken);
        })
        .catch(function(error: any) {
          handleError("api:auth:createCustomToken", error);
          res.json(error);
        });
    });
  }
);

export { spotify };
