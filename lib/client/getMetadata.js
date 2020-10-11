// * Utilities
import extractUrl from "@lib/client/extractUrl";
import formatUrl from "@lib/client/formatUrl";
import getCardType from "@lib/client/getCardType";

export default async function getMetadata(text) {
  const uri = extractUrl(text);
  if (uri === undefined) return { cardType: "text" };
  const res = await fetch("/api/metadata/twitter", {
    method: "POST",
    body: JSON.stringify({ uri }),
  });
  const meta = await res.json();
  const cardType = await getCardType(meta);
  const url = uri ? formatUrl(uri) : undefined;
  return { ...cardType, ...meta, url };
}
