import verify from "@lib/api/token/verify";
import withSentry from "@lib/api/middleware/withSentry";
import { escape, query } from "@lib/api/db";
import isMember from "@lib/api/middleware/isMember2";

const getAllTweets = async (req, res, _uid, tuid) => {
  const { draftLimit, draftPage, publishedLimit, publishedPage } = req.query;

  const tweets = await prisma.tweets.findMany({
    where: { tuid },
    include: {
      tweets_approvals: true,
      tweets_comments: true,
      tweets_meta: true,
    },
  });

  // * Add meta, approvals, and comments to tweets
  const tweets = tweetsQuery.map((t) => {
    return {
      ...t,
      metadata: metaQuery.find((m) => m.twuid === t.twuid),
      approvals: approvals.filter((m) => m.twuid === t.twuid),
      comments: comments.filter((m) => m.twuid === t.twuid),
    };
  });

  // * Format into tweet types
  const drafts = tweets.filter((t) => {
    return t.type === "draft";
  });
  const published = tweets.filter((t) => {
    return t.type === "published";
  });

  console.log("Retrieved tweets for:", tuid);
  res.status(200).json({ drafts, published });
};

export default verify(isMember(withSentry(getAllTweets)));
