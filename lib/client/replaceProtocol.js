export default function replaceProtocol(url) {
  const uri = url.replace(/^http:\/\//i, "https://");
  return uri;
}
