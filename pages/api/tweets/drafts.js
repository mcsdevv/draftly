import verify from "@lib/api/token/verify";
import withSentry from "@lib/api/middleware/withSentry";
import { escape, query } from "@lib/api/db";
import isMember from "@lib/api/middleware/isMember";

const getDraftTweets = async (req, res, _uid, tuid) => {
  const { limit, page } = req.query;

  // * Parse limit and page as integers
  const limitParsed = parseInt(limit);
  const pageParsed = parseInt(page);

  console.log("LIMIT", limit);
  console.log("PAGE", page);

  // * Get all tweets for team
  console.time("getDrafts");
  const draftsQuery = await query(
    escape`SELECT * FROM tweets
      WHERE tuid = ${tuid} AND type = 'draft'
      ORDER BY updated_at DESC
      LIMIT ${(pageParsed - 1) * limitParsed}, ${limitParsed};
      SELECT COUNT(*) AS count FROM tweets
      WHERE tuid = ${tuid} AND type = 'draft'`
  );
  console.timeEnd("getDrafts");

  // * Extract both the list of tweets and the total count
  const draftsList = [...draftsQuery[0]];
  const draftsCount = draftsQuery[1][0].count;

  // * Calculate the maximum number of pages
  const draftsPages = Math.ceil(draftsCount / limit);

  // * Get all tweet metadata
  console.time("getDraftsMeta");
  const metaQuery = await query(
    escape`SELECT * FROM tweets_meta
      LEFT JOIN tweets ON tweets.twuid = tweets_meta.twuid
      WHERE tuid = ${tuid}`
  );
  console.timeEnd("getDraftsMeta");

  // * Get all tweet approvals
  const approvalsQuery = async () => {
    const approvals = await Promise.all(
      draftsList.map((t) => {
        return query(
          escape`SELECT * FROM tweets_approvals
            WHERE twuid = ${t.twuid}`
        );
      })
    );
    return approvals;
  };

  // * Flatten approvals array
  console.time("getDraftsApprovals");
  const tweetApprovals = await approvalsQuery();
  console.timeEnd("getDraftsApprovals");
  console.time("flattenDraftsApprovals");
  const approvals = [].concat.apply([], tweetApprovals);
  console.timeEnd("flattenDraftsApprovals");

  // * Get all tweet comments
  const commentsQuery = async () => {
    const comments = await Promise.all(
      draftsList.map((t) => {
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
  console.time("getDraftsComments");
  const tweetComments = await commentsQuery();
  console.timeEnd("getDraftsComments");
  console.time("flattenDraftsComments");
  const comments = [].concat.apply([], tweetComments);
  console.timeEnd("flattenDraftsComments");

  // * Add meta, approvals, and comments to tweets
  const drafts = draftsList.map((t) => {
    return {
      ...t,
      metadata: metaQuery.find((m) => m.twuid === t.twuid),
      approvals: approvals.filter((m) => m.twuid === t.twuid),
      comments: comments.filter((m) => m.twuid === t.twuid),
    };
  });

  console.log("Retrieved draft tweets for:", tuid);
  res.status(200).json({ drafts, draftsPages });
};

export default verify(isMember(withSentry(getDraftTweets)));
