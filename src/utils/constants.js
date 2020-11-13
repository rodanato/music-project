// @flow
import { isProd } from "./helpers";

const localUrl: string = "http://localhost:5001/social-music-addd0/us-central1";
const testUrl: string =
  "https://us-central1-social-music-addd0.cloudfunctions.net";
const prodUrl: string =
  "https://us-central1-social-music-prod.cloudfunctions.net";

export const apiUrl = () => {
  return `${
    isProd()
      ? prodUrl
      // : process.env.REACT_APP_EMUL === 'true'
      // ? localUrl
      : testUrl
  }/api`;
};
