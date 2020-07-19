import { isProd } from "./helpers";

const testAPIUrl: string = "https://us-central1-social-music-addd0.cloudfunctions.net/api";
const prodAPIUrl: string = "https://us-central1-social-music-prod.cloudfunctions.net/api";

export const apiUrl = () => isProd() ? prodAPIUrl : testAPIUrl;
