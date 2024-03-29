// * Libraries
const Twitter = require("twitter");
import prisma from "@lib/api/db/prisma";

// * Middleware
import verify from "@lib/api/token/verify";
import withSentry from "@lib/api/middleware/withSentry";
import isMember from "@lib/api/middleware/isMember";

const deletePublishedTweet = async (req, res, _uid, tuid) => {
  const { tweetId, twuid } = JSON.parse(req.body);

  // * Get keys to post tweet
  const keys = await prisma.teams.findUnique({
    where: { tuid },
    select: {
      tokenKey: true,
      tokenSecret: true,
    },
  });

  // * Create new Twitter client with account and application keys
  const twitterClient = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: keys.tokenKey,
    access_token_secret: keys.tokenSecret,
  });

  // * Delete tweet from Twitter account
  twitterClient.post(
    "statuses/destroy",
    { id: tweetId },
    async function (error, tweet, _response) {
      if (error) {
        throw new Error(error);
      }

      // * Delete published tweet and meta
      await prisma.tweets.deleteMany({
        where: { twuid },
      });

      // * Send response
      console.log("Deleted tweet:", twuid);
      res.status(200).json(twuid);
    }
  );
};

export default verify(isMember(withSentry(deletePublishedTweet)));
