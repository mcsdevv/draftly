import verify from "@lib/api/token/verify";
import withSentry from "@lib/api/middleware/withSentry";
import { escape, query } from "@lib/api/db";
import isMember from "@lib/api/middleware/isMember";

const getPublishedTweets = async (req, res, _uid, tuid) => {
  const { limit, page } = req.query;
  // * Get all tweets for team
  console.time("getPublished");
  const tweetsQuery = await query(
    escape`SELECT * FROM tweets
      WHERE tuid = ${tuid} AND type = 'published'
      ORDER BY updated_at DESC`
  );
  console.timeEnd("getPublished");

  // * Get all tweet metadata
  console.time("getPublishedMeta");
  const metaQuery = await query(
    escape`SELECT * FROM tweets_meta
      LEFT JOIN tweets ON tweets.twuid = tweets_meta.twuid
      WHERE tuid = ${tuid}`
  );
  console.timeEnd("getPublishedMeta");

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
  console.time("getPublishedApprovals");
  const tweetApprovals = await approvalsQuery();
  console.timeEnd("getPublishedApprovals");
  console.time("flattenPublishedApprovals");
  const approvals = [].concat.apply([], tweetApprovals);
  console.timeEnd("flattenPublishedApprovals");

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
  console.time("getPublishedComments");
  const tweetComments = await commentsQuery();
  console.timeEnd("getPublishedComments");
  console.time("flattenPublishedComments");
  const comments = [].concat.apply([], tweetComments);
  console.timeEnd("flattenPublishedComments");

  // * Add meta, approvals, and comments to tweets
  const published = tweetsQuery.map((t) => {
    return {
      ...t,
      metadata: metaQuery.find((m) => m.twuid === t.twuid),
      approvals: approvals.filter((m) => m.twuid === t.twuid),
      comments: comments.filter((m) => m.twuid === t.twuid),
    };
  });

  console.log("Retrieved published tweets for:", tuid);
  res.status(200).json({ published });
};

export default verify(isMember(withSentry(getPublishedTweets)));
