export default function stripProtocol(url) {
  const uri = url.replace(/(^\w+:|^)\/\//, "");
  return uri;
}
