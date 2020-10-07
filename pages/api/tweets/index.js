// * Libraries
import prisma from "@lib/api/db/prisma";

// * Middleware
import verify from "@lib/api/token/verify";
import withSentry from "@lib/api/middleware/withSentry";
import isMember from "@lib/api/middleware/isMember";

const getAllTweets = async (req, res, _uid, tuid) => {
  const { draftLimit, draftPage, publishedLimit, publishedPage } = req.query;

  console.time("TWEETS");
  const tweets = await prisma.tweets.findMany({
    where: { tuid },
    include: {
      approvals: true,
      comments: true,
      creator: true,
      metadata: true,
    },
  });
  console.timeEnd("TWEETS");

  // * Format draft tweets
  const drafts = tweets.filter((t) => {
    return t.type === "draft";
  });

  // * Format published tweets
  const published = tweets.filter((t) => {
    return t.type === "published";
  });

  console.log("Retrieved tweets for:", tuid);
  res.status(200).json({ drafts, published });
};

export default verify(isMember(withSentry(getAllTweets)));
