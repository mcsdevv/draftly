export default function formatUrl(url) {
  const urlStripped = url.replace(/(^\w+:|^)\/\//, "");
  return urlStripped;
}
