// * Libraries
const Twitter = require("twitter");

// * Helpers
import verify from "@lib/api/token/verify";
import withSentry from "@lib/api/middleware/withSentry";
import { escape, query } from "@lib/api/db";

const deletePublishedTweet = async (req, res, _uid, tuid) => {
  const { tweet_id, twuid } = JSON.parse(req.body);

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

  // * Delete tweet from Twitter account
  twitterClient.post("statuses/destroy", { id: tweet_id }, async function (
    error,
    tweet,
    _response
  ) {
    if (error) {
      throw new Error(error);
    }

    // * Delete published tweet and meta
    await query(escape`DELETE FROM tweets WHERE twuid = ${twuid}`);

    // * Send response
    console.log("Deleted tweet:", twuid);
    res.status(200).json(twuid);
  });
};

export default verify(withSentry(deletePublishedTweet));
