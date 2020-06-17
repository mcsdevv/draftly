import verify from "@lib/api/token/verify";
import { escape, query } from "@lib/api/db";
import isMember from "@lib/api/middleware/isMember";

const getDraftTweets = async (req, res) => {
  try {
    const { tuid } = req.query;

    // * Get all tweets for team
    const tweetsQuery = await query(
      escape`SELECT * FROM tweets
      WHERE tuid = ${tuid}`
    );

    const metaQuery = await query(
      escape`SELECT * FROM tweets_meta
      LEFT JOIN tweets ON tweets.twuid = tweets_meta.twuid
      WHERE tuid = ${tuid}`
    );

    const approvalsQuery = await query(
      escape`SELECT * FROM tweets_approvals
      LEFT JOIN tweets ON tweets.twuid = tweets_approvals.twuid
      WHERE tweets_approvals.twuid = '56f1267b-a223-4635-8748-c2708c127042'`
    );

    // TODO Get all tweet comments

    const tweets = tweetsQuery.map((t) => {
      return {
        ...t,
        meta: metaQuery.find((m) => m.twuid === t.twuid),
        approvals: approvalsQuery.find((a) => a.twuid === t.twuid),
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

    console.log("Retrieved draft tweets for:", tuid);
    res.status(200).json({ drafts, reviews, published });
  } catch (err) {
    console.error("ERROR - api/tweets/details/drafts -", err.message);
    res.status(500).json({ err: err.message });
  }
};

export default verify(isMember(getDraftTweets));
