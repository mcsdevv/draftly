import verify from "@lib/api/token/verify";
import withSentry from "@lib/api/middleware/withSentry";
import { escape, query } from "@lib/api/db";
import isMember from "@lib/api/middleware/isMember";

const getAllTweets = async (req, res, _uid, tuid) => {
  const { draftLimit, draftPage, publishedLimit, publishedPage } = req.query;
  // * Get all tweets for team
  console.time("getTweets");
  const tweetsQuery = await query(
    escape`SELECT * FROM tweets
      WHERE tuid = ${tuid}
      ORDER BY updated_at DESC`
  );
  console.timeEnd("getTweets");

  // * Get all tweet metadata
  console.time("getMeta");
  const metaQuery = await query(
    escape`SELECT * FROM tweets_meta
      LEFT JOIN tweets ON tweets.twuid = tweets_meta.twuid
      WHERE tuid = ${tuid}`
  );
  console.timeEnd("getMeta");

  // * Get all tweet approvals
  const approvalsQuery = async () => {
    const approvals = await Promise.all(
      tweetsQuery.map((t) => {
        return query(
          escape`SELECT * FROM tweets_approvals
            WHERE twuid = ${t.twuid}`
        );
      })
    );
    return approvals;
  };

  // * Flatten approvals array
  console.time("getApprovals");
  const tweetApprovals = await approvalsQuery();
  console.timeEnd("getApprovals");
  console.time("flattenApprovals");
  const approvals = [].concat.apply([], tweetApprovals);
  console.timeEnd("flattenApprovals");

  // * Get all tweet comments
  const commentsQuery = async () => {
    const comments = await Promise.all(
      tweetsQuery.map((t) => {
        return query(
          escape`SELECT * FROM tweets_comments
            WHERE twuid = ${t.twuid}
            ORDER BY added_at DESC`
        );
      })
    );
    return comments;
  };

  // * Flatten comments array
  console.time("getComments");
  const tweetComments = await commentsQuery();
  console.timeEnd("getComments");
  console.time("flattenComments");
  const comments = [].concat.apply([], tweetComments);
  console.timeEnd("flattenComments");

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
