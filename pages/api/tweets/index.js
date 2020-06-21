import verify from "@lib/api/token/verify";
import { escape, query } from "@lib/api/db";
import isMember from "@lib/api/middleware/isMember";

const getDraftTweets = async (_req, res, _uid, tuid) => {
  try {
    // * Get all tweets for team
    const tweetsQuery = await query(
      escape`SELECT * FROM tweets
      WHERE tuid = ${tuid}`
    );

    // * Get all tweet metadata
    const metaQuery = await query(
      escape`SELECT * FROM tweets_meta
      LEFT JOIN tweets ON tweets.twuid = tweets_meta.twuid
      WHERE tuid = ${tuid}`
    );

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
    const tweetApprovals = await approvalsQuery();
    const approvals = [].concat.apply([], tweetApprovals);

    // * Get all tweet comments
    const commentsQuery = async () => {
      const comments = await Promise.all(
        tweetsQuery.map((t) => {
          return query(
            escape`SELECT * FROM tweets_comments
                WHERE twuid = ${t.twuid}`
          );
        })
      );
      return comments;
    };

    // * Flatten approvals array
    const tweetComments = await commentsQuery();
    const comments = [].concat.apply([], tweetComments);

    const tweets = tweetsQuery.map((t) => {
      return {
        ...t,
        metadata: metaQuery.find((m) => m.twuid === t.twuid),
        approvals: approvals.filter((m) => m.twuid === t.twuid),
        comments: comments.filter((m) => m.twuid === t.twuid),
      };
    });

    const drafts = tweets.filter((t) => {
      return t.type === "draft";
    });
    const reviews = tweets.filter((t) => {
      return t.type === "review";
    });
    const published = tweets.filter((t) => {
      return t.type === "published";
    });

    console.log("Retrieved tweets for:", tuid);
    res.status(200).json({ drafts, reviews, published });
  } catch (err) {
    console.error("ERROR - api/tweets -", err.message);
    res.status(500).json({ err: err.message });
  }
};

export default verify(isMember(getDraftTweets));
