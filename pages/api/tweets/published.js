// * Libraries
import { PrismaClient } from "@prisma/client";

// * Middleware
import verify from "@lib/api/token/verify";
import withSentry from "@lib/api/middleware/withSentry";
import isMember from "@lib/api/middleware/isMember2";

// * Initialize Prisma client outside of handler
const prisma = new PrismaClient();

const getPublishedTweets = async (req, res, _uid, tuid) => {
  const { limit, page } = req.query;

  // * Parse limit and page as integers
  const limitParsed = parseInt(limit);
  const pageParsed = parseInt(page);

  // * Get published for the team based on limit along with the total count
  const published = await prisma.tweets.findMany({
    skip: (pageParsed - 1) * limitParsed,
    take: limitParsed,
    where: { tuid, type: "published" },
    include: {
      approvals: true,
      comments: true,
      metadata: true,
    },
    orderBy: {
      updated_at: "desc",
    },
  });

  // * Get the total number of published for the team
  const publishedCount = await prisma.tweets.count({
    where: { tuid, type: "published" },
  });

  // * Calculate the maximum number of pages
  const publishedPages = Math.ceil(publishedCount / limit);

  console.log("Retrieved published tweets for:", tuid);
  res.status(200).json({ published, publishedPages });
};

export default verify(isMember(withSentry(getPublishedTweets)));
