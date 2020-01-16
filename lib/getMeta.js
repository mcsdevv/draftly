import extractUrl from "./extractUrl";

export default async function getMeta(text) {
  const uri = extractUrl(text);
  console.log("URL", uri);
  const res = await fetch("/api/metadata", {
    method: "POST",
    body: JSON.stringify({ uri: uri })
  });
  const resJson = await res.json();
  console.log(resJson);
  return resJson;
}
