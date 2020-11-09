// * Libraries
const Twitter = require("twitter-v2");
import prisma from "@lib/api/db/prisma";

// * Middleware
import verify from "@lib/api/token/verify";
import withSentry from "@lib/api/middleware/withSentry";
import isMember from "@lib/api/middleware/isMember";

const getTweetMetrics = async (req, res, _uid, tuid) => {
  const { tweetId, twuid } = JSON.parse(req.body);

  // * Get keys to post tweet
  const keys = await prisma.teams.findOne({
    where: { tuid },
    select: {
      tokenKey: true,
      tokenSecret: true,
    },
  });

  // * Create new Twitter client with account and application keys
  const client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token: keys.tokenKey,
    access_token_secret: keys.tokenSecret,
  });

  // * Query client for both public and private metrics
  const { data } = await client.get("tweets", {
    ids: tweetId,
    tweet: {
      fields: ["non_public_metrics", "public_metrics"],
    },
  });

  // * Destructure array to flatten then extract objects
  const [flat] = data;
  const { non_public_metrics, public_metrics } = flat;

  console.log("FLAT", flat);

  // * Create metrics object to add to database
  const metrics = {
    impressions: non_public_metrics.impression_count,
    retweets: public_metrics.retweet_count,
    quoteRetweets: public_metrics.quote_count,
    likes: public_metrics.like_count,
    replies: public_metrics.reply_count,
    urlClicks: non_public_metrics.url_link_clicks,
    profileClicks: non_public_metrics.user_profile_clicks,
  };

  // * Update tweet in database with latest metrics
  await prisma.tweets.update({
    where: { twuid },
    data: { ...metrics },
  });

  console.log("Retrieved metrics for tweet:", twuid);
  res.status(200).json(metrics);
};

export default verify(isMember(withSentry(getTweetMetrics)));
