import extractUrl from "./extractUrl";
import formatUrl from "./formatUrl";
import getCardType from "./getCardType";

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