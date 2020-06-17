const Twitter = require("twitter");
import verify from "../../_util/token/verify";
import { escape, query } from "@lib/api/db";

const createPublishedTweet = async (req, res) => {
  try {
    const { tweet, tuid } = JSON.parse(req.body);

    // * Get keys to post tweet
    const keysQuery = await query(
      escape`SELECT * FROM team WHERE tuid = ${tuid}`
    );

    // * Create new Twitter client with account and application keys
    const twitterClient = new Twitter({
      consumer_key: process.env.TWITTER_CONSUMER_KEY,
      consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
      access_token_key: keysQuery.token_key,
      access_token_secret: keysQuery.token_secret,
    });

    // * Post tweet
    twitterClient.post("statuses/update", { status: tweet }, function (
      error,
      tweet,
      response
    ) {
      if (error) throw error;
      console.error("Error posting tweet:", tweet);
    });

    // * Update the tweet type to published
    await query(
      escape`UPDATE tweets SET type="published" WHERE twuid=${twuid}`
    );

    console.log("Published tweet created for:", tuid);
    res.status(200).json(dbs.data);
  } catch (err) {
    console.error("ERROR - api/tweet/published/create -", err.message);
    res.status(500).json({ err: err.message });
  }
};

export default verify(createPublishedTweet);
