export default function removeWww(tweet) {
  const tweetParts = tweet.split(" ");
  const cleanTweet = tweetParts.map(t => {
    if (t.startsWith("www.")) {
      return t.substring(4, t.length);
    }
    return t;
  });
  const joinTweet = cleanTweet.join(" ");
  return joinTweet;
}
