import getUrls from "get-urls";

export default function extractUrl(string) {
  const urlSet = getUrls(string, { requireSchemeOrWww: false });
  const url = Array.from(urlSet).pop();
  return url;
}
