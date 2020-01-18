import getUrls from "get-urls";

export default function extractUrl(tweet) {
  const urlSet = getUrls(tweet, { requireSchemeOrWww: false });
  const url = Array.from(urlSet).pop();
  return url;
}
