import * as functions from "firebase-functions";
import { spotify } from "./spotify";

const runtimeOpts = {
  timeoutSeconds: 540, //9m
};

export const api = functions.runWith(runtimeOpts).https.onRequest(spotify);
