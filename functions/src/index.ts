import * as functions from 'firebase-functions';
const admin = require("firebase-admin");
const serviceAccount = require("../serviceAccountKey.json");
const SpotifyWebApi = require('spotify-web-api-node');
const crypto = require('crypto');

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

exports.redirect = functions.https.onRequest((req, res) => {
  const state = crypto.randomBytes(20).toString('hex');
  const authorizeURL = SpotifyApi.createAuthorizeURL(OAUTH_SCOPES, state.toString());
  res.redirect(authorizeURL);
});

exports.setCode = functions.https.onRequest((req, res) => {
  SpotifyApi.authorizationCodeGrant(req.body.code).then(
    function(data: any) {
      console.log('The token expires in ' + data.body['expires_in']);
      console.log('The access token is ' + data.body['access_token']);
      console.log('The refresh token is ' + data.body['refresh_token']);
  
      // Set the access token on the API object to use it in later calls
      SpotifyApi.setAccessToken(data.body['access_token']);
      SpotifyApi.setRefreshToken(data.body['refresh_token']);
    },
    function(err: any) {
      console.log('Something went wrong!', err);
    }
  );
});

exports.getArtistAlbums = functions.https.onRequest((req, res) => {
  SpotifyApi.getArtistAlbums('43ZHCT0cAZBISjO8DG9PnE').then(
    function(data: any) {
      console.log('Artist albums', data.body);
      res.send(data.body);
    },
    function(err: any) {
      console.error(err);
    }
  );
});
