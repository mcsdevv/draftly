import extractUrl from "./extractUrl";
import getCardType from "./getCardType";

export default async function getMeta(text) {
  const uri = extractUrl(text);
  const res = await fetch("/api/metadata", {
    method: "POST",
    body: JSON.stringify({ uri })
  });
  const meta = await res.json();
  const cardType = await getCardType(meta);
  return { cardType, ...meta };
}
