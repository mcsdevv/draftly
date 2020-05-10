import { client, q } from "../../../_util/fauna";
import { getDocProperty, getDocByIndex } from "../../../_util/fauna/queries";
import { formatTweets } from "../../../_util/formatTweets";
import verify from "../../../_util/token/verify";

const getReviewTweets = async (req, res) => {
  try {
    const { handle } = req.query;
    if (handle === "undefined") return res.status(200).json([]);
    // * Get review tweets for account
    const dbs = await client.query(
      q.Map(
        getDocProperty(
          ["data", "reviews"],
          getDocByIndex("all_teams_by_handle", handle)
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
