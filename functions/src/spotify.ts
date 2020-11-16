import { admin, cors, OAUTH_SCOPES, spotifyApiConfig } from "./config/config";
import { Profile } from "./config/types";
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

// spotify.get("/getProfile", async (req: any, res: any) => {
//   const userProfile: Profile = await getProfile();
//   res.json(userProfile);
// });

spotify.post("/setCode", (req: { body: { code: string } }, res: any) => {
  spotifyApi.authorizationCodeGrant(req.body.code).then(
    function(data: any) {
      // spotifyApi.setAccessToken(data.body["access_token"]);
      // spotifyApi.setRefreshToken(data.body["refresh_token"]);
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
        // spotifyApi.setAccessToken(data.body["access_token"]);
        res.json(data.body["access_token"]);
      },
      function(err: any) {
        handleError(err, "api:spotify:refreshToken");
        res.json(err);
      }
    );
  }
);

// spotify.get("/getArtistAlbums", (req: any, res: any) => {
//   spotifyApi.getArtistAlbums("43ZHCT0cAZBISjO8DG9PnE").then(
//     function(data: any) {
//       res.send(data.body);
//     },
//     function(err: any) {
//       handleError(err, "api:spotify:getArtistAlbums");
//     }
//   );
// });

spotify.post(
  "/createFirebaseAccount",
  async (req: { body: { token: string; userprofile: Profile } }, res: any) => {
    const { userprofile } = req.body;
    const uid = `spotify:${userprofile.id}`;

    // TODO: Is this needed?
    // Save the access token to the Firebase Realtime Database.
    // const databaseTask = admin.database().ref(`/spotifyAccessToken/${uid}`)
    //   .set(token);

    // Create or update the user account.
    const userCreationTask = admin
      .auth()
      .updateUser(uid, {
        displayName: userprofile.display_name,
        photoURL: userprofile.images[0].url,
      })
      .catch((error: any) => {
        // If user does not exists we create it.
        if (error.code === "auth/user-not-found") {
          return admin.auth().createUser({
            uid: uid,
            displayName: userprofile.display_name,
            photoURL: userprofile.images[0].url,
          });
        }
        throw error;
      });

    // Wait for all async task to complete then generate and return a custom auth token.
    return Promise.all([userCreationTask]).then(() => {
      // Create a Firebase custom auth token.
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
