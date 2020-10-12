// * Utilities
import extractUrl from "@lib/client/extractUrl";
import formatUrl from "@lib/client/formatUrl";
import getCardType from "@lib/client/getCardType";

export default async function getMetadata(text) {
  // * Extract the last used URL from the tweet, if present
  const uri = extractUrl(text);

  // * If no URL, return early that this is a text only tweet
  if (uri === undefined) return { cardType: "text" };

  // * If not text only, use URL to get metadata
  const res = await fetch("/api/metadata/twitter", {
    method: "POST",
    body: JSON.stringify({ uri }),
  });
  const meta = await res.json();

  // * Use the metadata to determine the card type
  const cardType = await getCardType(meta);

  // * If URL present, format by stripping protocol for storage
  const url = uri ? formatUrl(uri) : undefined;

  // * Return card type, meta, and formatted URL
  return { ...cardType, ...meta, url };
}
