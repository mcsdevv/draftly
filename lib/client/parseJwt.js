export default function parseJwt(token) {
  if (!token) {
    throw new Error("No token present, unable to parse.");
  }
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace("-", "+").replace("_", "/");
    return JSON.parse(window.atob(base64));
  } catch (err) {
    console.error(err);
    throw new Error("Unable to parse, malformed JWT provided.");
  }
}
