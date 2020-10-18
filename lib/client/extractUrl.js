// * Libraries
import getUrls from "get-urls";
import { tldExists } from "tldjs";

export default function extractUrl(string) {
  // * Split string to allow filter
  const split = string.split(" ");

  // * Filter array to leave only valid TLD's
  const validTlds = split.filter((s) => tldExists(s));

  // * Reverse array to allow last domain to remain when Set applied
  const reverse = validTlds.reverse();

  // * Join array for the getUrls function
  const join = reverse.join(" ");

  // * Get all URL's as a set, include apex only
  const urlSet = getUrls(join, {
    requireSchemeOrWww: false,
    stripProtocol: true,
  });

  // * Return undefined if no URL's present
  if (urlSet.size === 0) {
    return undefined;
  }

  // * Get first item of set as the URL to be used
  const urlFromSet = Array.from(urlSet).shift();

  // * Return URL
  return urlFromSet;
}
