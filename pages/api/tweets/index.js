// * Libraries
import { PrismaClient } from "@prisma/client";

// * Middleware
import verify from "@lib/api/token/verify";
import withSentry from "@lib/api/middleware/withSentry";
import isMember from "@lib/api/middleware/isMember2";

// * Initialize Prisma client outside of handler
const prisma = new PrismaClient();

const getAllTweets = async (req, res, _uid, tuid) => {
  const { draftLimit, draftPage, publishedLimit, publishedPage } = req.query;

  const tweets = await prisma.tweets.findMany({
    where: { tuid },
    include: {
      approvals: true,
      comments: true,
      metadata: true,
    },
  });

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
