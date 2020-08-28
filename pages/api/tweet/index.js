import verify from "@lib/api/token/verify";
import withSentry from "@lib/api/middleware/withSentry";
import { escape, query } from "@lib/api/db";
import isMember from "@lib/api/middleware/isMember";

const getSingleTweet = async (req, res, _uid, _tuid) => {
  const { twuid } = req.query;

  // * Get tweet from table
  const [tweetQuery] = await query(
    escape`SELECT * FROM tweets
      WHERE twuid = ${twuid}`
  );

  // * Get tweet metadata
  const [metaQuery] = await query(
    escape`SELECT * FROM tweets_meta
    WHERE twuid = ${twuid}`
  );

  // * Get tweet approvals
  const approvalsQuery = await query(
    escape`SELECT * FROM tweets_approvals
            WHERE twuid = ${twuid}`
  );

  // * Get tweet comments
  const commentsQuery = await query(
    escape`SELECT * FROM tweets_comments
            WHERE twuid = ${twuid}`
  );

  // * Add meta, approvals, and comments to tweets
  const tweet = {
    ...tweetQuery,
    metadata: metaQuery,
    approvals: approvalsQuery,
    comments: commentsQuery,
  };

  console.log("Retrieved tweet:", twuid);
  res.status(200).json({ tweet });
};

export default verify(isMember(withSentry(getSingleTweet)));
