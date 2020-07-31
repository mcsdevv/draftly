const Twitter = require("twitter");
import verify from "@lib/api/token/verify";
import withSentry from "@lib/api/middleware/withSentry";
import { escape, query } from "@lib/api/db";

const createPublishedTweet = async (req, res, uid, tuid) => {
  const { text, twuid } = JSON.parse(req.body);

  // * Get keys to post tweet
  const [keysQuery] = await query(
    escape`SELECT * FROM teams WHERE tuid = ${tuid}`
  );

  // * Create new Twitter client with account and application keys
  const twitterClient = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: keysQuery.token_key,
    access_token_secret: keysQuery.token_secret,
  });

  // * Post tweet
  twitterClient.post("statuses/update", { status: text }, function (
    error,
    tweet,
    response
  ) {
    if (error) {
      console.error("Error posting tweet:", twuid, error);
      return res.status(500).json({ err: "Error posting tweet." });
    }
  });

  // * Update the tweet type to published
  await query(escape`UPDATE tweets SET type="published" WHERE twuid=${twuid}`);

  console.log("Published tweet created for:", tuid);
  res.status(200).json(text);
};

export default verify(withSentry(createPublishedTweet));
