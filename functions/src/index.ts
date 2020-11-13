import * as functions from "firebase-functions";
import { spotify } from "./spotify";

export const api = functions.https.onRequest(spotify);
