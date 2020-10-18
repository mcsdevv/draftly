// * Libraries
import getUrls from "get-urls";

// * Utilities
import replaceProtocol from "@lib/client/replaceProtocol";

export default function extractUrl(string) {
  // * Get all URL's as a set, include apex only
  const urlSet = getUrls(string, {
    requireSchemeOrWww: false,
    stripProtocol: true,
  });

  // * Return undefined if no URL's present
  if (urlSet.size === 0) {
    return undefined;
  }

  // * Get last item of set as the URL to be used
  const urlFromSet = Array.from(urlSet).pop();

  // * Replace the protocol to use https to save redirect time
  const urlReplaced = replaceProtocol(urlFromSet);

  // * Return URL
  return urlReplaced;
}
