import * as functions from 'firebase-functions';
const admin = require("firebase-admin");
const serviceAccount = require("../serviceAccountKey.json");
const SpotifyWebApi = require('spotify-web-api-node');
const express = require('express');
const crypto = require('crypto');

// LOCAL
// const appUrl = "http://localhost:3000";
// TEST
const appUrl = "https://social-music-addd0.web.app";
// PROD
// const appUrl = "https://social-music-prod.web.app";

const corsOptions = {
  origin: `${appUrl}`,
  optionsSuccessStatus: 200
}
const cors = require('cors')(corsOptions);
const app = express();

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://social-music-addd0.firebaseio.com"
});

const spotifyApi = new SpotifyWebApi({
  clientId: "2db814ad4e7e4d3b9de12532c65efd8a",
  clientSecret: "609bddc0f5db4f5b8ddcf638165957ac",
  redirectUri: `${appUrl}`,
});

const OAUTH_SCOPES = [
  'user-read-private',
  'user-read-email'
];

app.use(cors);

app.get('/redirect', (req: any, res: any) => {
  const state = crypto.randomBytes(20).toString('hex');
  const authorizeURL = spotifyApi.createAuthorizeURL(OAUTH_SCOPES, state.toString());
  res.redirect(301, authorizeURL);
});

app.get('/getProfile', (req: any, res: any) => {
  spotifyApi.getMe()
    .then(function (data: any) {
      res.json(data.body);
    }, function (err: any) {
      handleError(err, 'api:getProfile');
    });
});

app.post('/setCode', (req: { body: { code: string } }, res: any) => {
  spotifyApi.authorizationCodeGrant(req.body.code).then(
    function (data: any) {
      spotifyApi.setAccessToken(data.body['access_token']);
      spotifyApi.setRefreshToken(data.body['refresh_token']);
      res.json(data.body);
    },
    function (err: any) {
      handleError(err, 'api:authorizationCodeGrant');
      res.json(err);
    }
  );
});

app.get('/refreshToken', (req: any, res: any) => {
  spotifyApi.refreshAccessToken().then(
    function (data: any) {
      spotifyApi.setAccessToken(data.body['access_token']);
    },
    function (err: any) {
      handleError(err, 'api:refreshToken');
      res.json(err);
    }
  );
});


app.get('/getArtistAlbums', (req: any, res: any) => {
  spotifyApi.getArtistAlbums('43ZHCT0cAZBISjO8DG9PnE').then(
    function (data: any) {
      res.send(data.body);
    },
    function (err: any) {
      handleError(err, 'api:getArtistAlbums');
    }
  );
});

app.post('/createFirebaseAccount', async (req: { body: { token: string } }, res: any) => {
  let userProfile: any;

  try {
    userProfile = await spotifyApi.getMe();
  } catch (error) {
    handleError(error, 'spotifyApi.getMe');
  }

  const uid = `spotify:${userProfile.body.id}`;

  // TODO: Is this needed?
  // Save the access token to the Firebase Realtime Database.
  // const databaseTask = admin.database().ref(`/spotifyAccessToken/${uid}`)
  //   .set(req.body.token);

  // Create or update the user account.
  const userCreationTask = admin.auth().updateUser(uid, {
    displayName: userProfile.body.display_name,
    photoURL: userProfile.body.images[0].url
  }).catch((error: any) => {
    // If user does not exists we create it.
    if (error.code === 'auth/user-not-found') {
      return admin.auth().createUser({
        uid: uid,
        displayName: userProfile.body.display_name,
        photoURL: userProfile.body.images[0].url
      });
    }
    throw error;
  });

  // Wait for all async task to complete then generate and return a custom auth token.
  return Promise.all([userCreationTask]).then(() => {
    // Create a Firebase custom auth token.
    admin.auth().createCustomToken(uid)
      .then(function (firebaseToken: string) {
        console.log('Created Custom token for UID "', uid, '" Token:', firebaseToken);
        res.json(firebaseToken);
      })
      .catch(function (error: any) {
        console.log('Error creating custom token:', error);
      });
  });
});

export const handleError = (e: any, where: string) => {
  if (e.response && e.response.data) {
    console.log(e.response.data.error.status, e.response.data.error.message, where)
  } else {
    console.log(e.message, where);
  }
}

exports.api = functions.https.onRequest(app);
