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
  twitterClient.post("statuses/update", { status: text }, async function (
    error,
    tweet,
    _response
  ) {
    if (error) {
      throw new Error(error);
    }

    // * Update the tweet type to published and set the tweet_id
    await query(
      escape`UPDATE tweets
      SET type="published", tweet_id=${tweet.id_str} 
      WHERE twuid=${twuid}`
    );

    console.log("Published tweet created for:", tuid);
    res.status(200).json(text);
  });
};

export default verify(withSentry(createPublishedTweet));
