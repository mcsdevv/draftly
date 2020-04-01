import { client, q } from "../../../_util/fauna";
import { formatTweets } from "../../../_util/formatTweets";
import verify from "../../../_util/token/verify-new";

const getReviewTweets = async (req, res) => {
  try {
    const { handle } = req.query;
    // * Get review tweets for account
    const dbs = await client.query(
      q.Map(
        q.Select(
          ["data", "reviews"],
          q.Get(q.Match(q.Index("all_teams_by_handle"), handle))
        ),
        q.Lambda("s", q.Get(q.Ref(q.Collection("tweets"), q.Var("s"))))
      )
    );
    // * Format review tweets
    const reviews = formatTweets(dbs);
    console.log("Retrieved review tweets for:", handle);
    res.status(200).json({ reviews });
  } catch (err) {
    console.error("ERROR - api/tweets/details/reviews -", err.message);
    res.status(500).json({ err: err.message });
  }
};

export default verify(getReviewTweets);
