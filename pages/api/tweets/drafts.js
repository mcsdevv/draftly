// * Libraries
import prisma from "@lib/api/db/prisma";

// * Middleware
import verify from "@lib/api/token/verify";
import withSentry from "@lib/api/middleware/withSentry";
import isMember from "@lib/api/middleware/isMember";

const getDraftTweets = async (req, res, _uid, tuid) => {
  const { limit, page } = req.query;

  // * Parse limit and page as integers
  const limitParsed = parseInt(limit);
  const pageParsed = parseInt(page);

  // * Get drafts for the team based on limit along with the total count
  const drafts = await prisma.tweets.findMany({
    skip: (pageParsed - 1) * limitParsed,
    take: limitParsed,
    where: { tuid, type: "draft" },
    include: {
      approvals: true,
      creator: true,
      comments: true,
      metadata: true,
    },
    orderBy: {
      updatedAt: "desc",
    },
  });

  // * Get the total number of drafts for the team
  const draftsCount = await prisma.tweets.count({
    where: { tuid, type: "draft" },
  });

  // * Calculate the maximum number of pages
  const draftsPages = Math.ceil(draftsCount / limit);

  console.log("Retrieved draft tweets for:", tuid);
  res.status(200).json({ drafts, draftsPages });
};

export default verify(isMember(withSentry(getDraftTweets)));
