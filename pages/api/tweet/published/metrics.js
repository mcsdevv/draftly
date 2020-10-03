// * Libraries
const Twitter = require("twitter");
import prisma from "@lib/api/db/prisma";

// * Middleware
import verify from "@lib/api/token/verify";
import withSentry from "@lib/api/middleware/withSentry";
import isMember from "@lib/api/middleware/isMember";

const getTweetMetrics = async (req, res, _uid, tuid) => {
  const { tweet_id, twuid } = JSON.parse(req.body);

  // * Get keys to post tweet
  const keys = await prisma.teams.findOne({
    where: { tuid },
    select: {
      token_key: true,
      token_secret: true,
    },
  });

  // * Create new Twitter client with account and application keys
  const twitterClient = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: keys.token_key,
    access_token_secret: keys.token_secret,
  });

  // * Get tweet details including basic metrics
  twitterClient.get("statuses/show", { id: tweet_id }, async function (
    error,
    tweet,
    _response
  ) {
    if (error) {
      throw new Error("Error getting metrics for tweet.");
    }

    // * Get all tweet mentions for the account (limit of 800 since status posted)
    twitterClient.get(
      "statuses/mentions_timeline",
      { since_id: tweet_id, trim_user: true },
      async function (error, mentions, _response) {
        if (error) {
          throw new Error(`Error getting replies for tweet: ${twuid}`);
        }

        // * Filter the mentions for the relevant tweet only
        const filteredMentions = mentions.filter(
          (m) => m.in_reply_to_status_id_str === tweet_id
        );

        // * Number of replies is the filtered mentions length
        const replies = filteredMentions.length;

        // * Update the metrics for the row
        await prisma.tweets.update({
          where: { twuid },
          data: {
            favorites: tweet.favorite_count,
            replies,
            retweets: tweet.retweet_count,
          },
        });

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

export default verify(isMember(withSentry(getTweetMetrics)));
