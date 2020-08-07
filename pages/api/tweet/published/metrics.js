const Twitter = require("twitter");
import verify from "@lib/api/token/verify";
import withSentry from "@lib/api/middleware/withSentry";
import { escape, query } from "@lib/api/db";

const getTweetMetrics = async (req, res, _uid, tuid) => {
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

  // * Post tweet
  twitterClient.get("statuses/show", { id: tweet_id }, async function (
    error,
    tweet,
    _response
  ) {
    if (error) {
      console.error("Error getting metrics for tweet:", twuid, error);
      throw "Error getting metrics for tweet.";
    }

    console.log("TWEET", tweet);

    const updated_at = new Date("YYYY-MM-DD HH:mm:ss UTC");

    // * Update the metrics for the row
    await query(
      escape`UPDATE tweets
      SET favorites=${tweet.favorite_count}, retweets=${tweet.retweet_count}, metrics_updated_at=CURRENT_TIMESTAMP
      WHERE twuid=${twuid}`
    );

    console.log("Retrieved metrics for tweet:", twuid);
    res.status(200).json(tweet);
  });
};

export default verify(withSentry(getTweetMetrics));
