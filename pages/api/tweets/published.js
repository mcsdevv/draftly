import verify from "@lib/api/token/verify";
import withSentry from "@lib/api/middleware/withSentry";
import { escape, query } from "@lib/api/db";
import isMember from "@lib/api/middleware/isMember";

const getPublishedTweets = async (req, res, _uid, tuid) => {
  const { limit, page } = req.query;

  // * Parse limit and page as integers
  const limitParsed = parseInt(limit);
  const pageParsed = parseInt(page);

  // * Get published for the team based on limit along with the total count
  const publishedQuery = await query(
    escape`SELECT * FROM tweets
      WHERE tuid = ${tuid} AND type = 'published'
      ORDER BY updated_at DESC
      LIMIT ${(pageParsed - 1) * limitParsed}, ${limitParsed};
      SELECT COUNT(*) AS count FROM tweets
      WHERE tuid = ${tuid} AND type = 'published'`
  );

  // * Extract both the list of tweets and the total count
  const publishedList = [...publishedQuery[0]];
  const publishedCount = publishedQuery[1][0].count;

  // * Get all tweet metadata
  const metaQuery = await query(
    escape`SELECT * FROM tweets_meta
      LEFT JOIN tweets ON tweets.twuid = tweets_meta.twuid
      WHERE tuid = ${tuid}`
  );

  // * Get all tweet approvals
  const approvalsQuery = async () => {
    const approvals = await Promise.all(
      publishedList.map((t) => {
        return query(
          escape`SELECT * FROM tweets_approvals
            WHERE twuid = ${t.twuid}`
        );
      })
    );
    return approvals;
  };

  // * Flatten approvals array
  const tweetApprovals = await approvalsQuery();
  const approvals = [].concat.apply([], tweetApprovals);

  // * Get all tweet comments
  const commentsQuery = async () => {
    const comments = await Promise.all(
      publishedList.map((t) => {
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
  const tweetComments = await commentsQuery();
  const comments = [].concat.apply([], tweetComments);

  // * Add meta, approvals, and comments to tweets
  const published = publishedList.map((t) => {
    return {
      ...t,
      metadata: metaQuery.find((m) => m.twuid === t.twuid),
      approvals: approvals.filter((m) => m.twuid === t.twuid),
      comments: comments.filter((m) => m.twuid === t.twuid),
    };
  });

  // * Calculate the maximum number of pages
  const publishedPages = Math.ceil(publishedCount / limit);

  console.log("Retrieved published tweets for:", tuid);
  res.status(200).json({ published, publishedPages });
};

export default verify(isMember(withSentry(getPublishedTweets)));
