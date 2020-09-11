export default function removeUrl(metadata, text) {
  // * If no URL present, return original text
  if (!metadata?.url) return text;
  // * If card type is text, return original text
  if (metadata?.cardType === "text") return text;
  // * If URL present, get len
  const length = metadata.url.length;
  // * Use length to get last characters of tweet text
  const substring = text.substring(text.length - length, text.length);
  // * Check if substring matches URL
  if (metadata.url === substring) {
    // * If it matches, return tweet text minus the URL
    return text.substring(text.length - length, 0);
  }
  return text;
}

// TODO Do not remove URL if card type is text and only URL present
