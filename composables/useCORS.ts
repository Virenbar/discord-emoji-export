// Public CORS proxy
const CORS_public = "https://api.allorigins.win/raw?url=";

// Private CORS proxy
// Only works for whitelisted domains
const CORS_private = "https://cors.virenbar.workers.dev/?url=";

export default function (url: string) {
  return (!process.dev)
    ? `${CORS_private}${url}`
    : `${CORS_public}${url}`;
}
