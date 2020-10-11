// * Libraries
import getUrls from "get-urls";

// * Utilities
import replaceProtocol from "@lib/client/replaceProtocol";

export default function extractUrl(string) {
  const urlSet = getUrls(string, { requireSchemeOrWww: false });
  console.log("SET", urlSet, Array.from(urlSet));
  return "https://vercel.com";
  const urlFromSet = Array.from(urlSet).pop();
  const urlReplaced = replaceProtocol(urlFromSet);
  return urlReplaced;
}
