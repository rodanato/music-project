import * as functions from 'firebase-functions';
const admin = require("firebase-admin");
const serviceAccount = require("../serviceAccountKey.json");
const SpotifyWebApi = require('spotify-web-api-node');
const express = require('express');
const crypto = require('crypto');
const corsOptions = {
  origin: 'https://social-music-addd0.web.app',
  optionsSuccessStatus: 200
}
const cors = require('cors')(corsOptions);
const app = express();

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://social-music-addd0.web.app"
});

const SpotifyApi = new SpotifyWebApi({
  clientId: "2db814ad4e7e4d3b9de12532c65efd8a",
  clientSecret: "609bddc0f5db4f5b8ddcf638165957ac",
  redirectUri: `https://social-music-addd0.web.app`,
});

const OAUTH_SCOPES = [
  'user-read-email'
];

app.use(cors);

app.get('/redirect', (req: any, res: any) => {
  const state = crypto.randomBytes(20).toString('hex');
  const authorizeURL = SpotifyApi.createAuthorizeURL(OAUTH_SCOPES, state.toString());
  res.redirect(301, authorizeURL);
});

app.post('/setCode', (req: { body: { code: string } }, res: any) => {
  SpotifyApi.authorizationCodeGrant(req.body.code).then(
    function (data: any) {
      // console.log('The token expires in ' + data.body['expires_in']);
      // console.log('The access token is ' + data.body['access_token']);
      // console.log('The refresh token is ' + data.body['refresh_token']);

      // Set the access token on the API object to use it in later calls
      SpotifyApi.setAccessToken(data.body['access_token']);
      SpotifyApi.setRefreshToken(data.body['refresh_token']);

      res.json(data.body);
    },
    function (err: any) {
      console.log('Something went wrong!', err);
      res.json(err);
    }
  );
});

app.get('/getArtistAlbums', (req: any, res: any) => {
  SpotifyApi.getArtistAlbums('43ZHCT0cAZBISjO8DG9PnE').then(
    function (data: any) {
      console.log('Artist albums', data.body);
      res.send(data.body);
    },
    function (err: any) {
      console.error(err);
    }
  );
});

exports.api = functions.https.onRequest(app);
