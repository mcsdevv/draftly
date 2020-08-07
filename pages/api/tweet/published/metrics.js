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

  // * Get tweet details including basic metrics
  twitterClient.get("statuses/show", { id: tweet_id }, async function (
    error,
    tweet,
    _response
  ) {
    if (error) {
      console.error("Error getting metrics for tweet:", twuid, error);
      throw "Error getting metrics for tweet.";
    }

    // * Get all tweet mentions for the account (limit of 800 since status posted)
    twitterClient.get(
      "statuses/mentions_timeline",
      { since_id: tweet_id, trim_user: true },
      async function (error, mentions, _response) {
        if (error) {
          console.error("Error getting replies for tweet:", twuid, error);
          throw "Error getting replies for tweet.";
        }

        // * Filter the mentions for the relevant tweet only
        const filteredMentions = mentions.filter(
          (m) => m.in_reply_to_status_id_str === tweet_id
        );

        // * Number of replies is the filtered mentions length
        const replies = filteredMentions.length;

        // * Update the metrics for the row
        await query(
          escape`UPDATE tweets
          SET favorites=${tweet.favorite_count}, replies=${replies},
          retweets=${tweet.retweet_count},  metrics_updated_at=CURRENT_TIMESTAMP
          WHERE twuid=${twuid}`
        );

        const metrics = {
          favorites: tweet.favorite_count,
          replies,
          retweets: tweet.retweet_count,
          metrics_updated_at: Date.now(),
        };

        console.log("Retrieved metrics for tweet:", twuid);
        res.status(200).json(metrics);
      }
    );
  });
};

export default verify(withSentry(getTweetMetrics));
