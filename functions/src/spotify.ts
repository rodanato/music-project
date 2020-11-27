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
  async (req: { body: { token: string; userprofile: Profile } }, res: any) => {
    const { userprofile } = req.body;
    const uid = `spotify:${userprofile.id}`;
    const userCreationTask = admin
      .auth()
      .updateUser(uid, {
        displayName: userprofile.display_name,
        photoURL: userprofile.images[0].url,
      })
      .catch((error: any) => {
        if (error.code === "auth/user-not-found") {
          return admin.auth().createUser({
            uid: uid,
            displayName: userprofile.display_name,
            photoURL: userprofile.images[0].url,
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
