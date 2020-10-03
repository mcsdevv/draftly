// * Libraries
const Twitter = require("twitter");
import prisma from "@lib/api/db/prisma";

// * Middleware
import verify from "@lib/api/token/verify";
import withSentry from "@lib/api/middleware/withSentry";
import isMember from "@lib/api/middleware/isMember";

const createPublishedTweet = async (req, res, _uid, tuid) => {
  const { text, twuid } = JSON.parse(req.body);

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
    await prisma.tweets.update({
      where: { twuid },
      data: { type: "published", tweet_id: tweet.id_str },
    });

    console.log("Published tweet created for:", tuid);
    res.status(200).json(text);
  });
};

export default verify(isMember(withSentry(createPublishedTweet)));
