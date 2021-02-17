import * as functions from "firebase-functions";
const serviceAccount = require("../../serviceAccountKey.json");
const admin = require("firebase-admin");

export const appUrl = functions.config().app.url;
export const dbURL: string = JSON.parse(process.env.FIREBASE_CONFIG as string)
  .databaseURL;

const corsOptions = {
  origin: `${appUrl}`,
  optionsSuccessStatus: 200,
};

export const cors = require("cors")(corsOptions);

export const OAUTH_SCOPES = [
  "user-read-private",
  "user-read-email",
  "playlist-read-private",
  "playlist-read-collaborative",
];

export const spotifyApiConfig = {
  clientId: "2db814ad4e7e4d3b9de12532c65efd8a",
  clientSecret: "609bddc0f5db4f5b8ddcf638165957ac",
  redirectUri: `${appUrl}`,
};

const adminConfig = JSON.parse(process.env.FIREBASE_CONFIG as string);
adminConfig.credential = admin.credential.cert(serviceAccount);
adminConfig.databseURL = dbURL;
admin.initializeApp(adminConfig);

export { admin };
