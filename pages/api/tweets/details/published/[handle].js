import { client, q } from "../../../_util/fauna";
import { getDocByIndex } from "../../../_util/fauna/queries";
import { formatTweets } from "../../../_util/formatTweets";
import verify from "../../../_util/token/verify";

const getPublishedTweets = async (req, res) => {
  try {
    const { handle } = req.query;
    if (handle === "undefined") return res.status(200).json([]);
    // * Get published tweets for account
    const dbs = await client.query(
      q.Map(
        q.Select(
          ["data", "published"],
          getDocByIndex("all_teams_by_handle", handle)
        ),
        q.Lambda("s", q.Get(q.Ref(q.Collection("tweets"), q.Var("s"))))
      )
    );
    // * Format published tweets
    const published = formatTweets(dbs);
    console.log("Retrieved published tweets for:", handle);
    res.status(200).json({ published });
  } catch (err) {
    console.error("ERROR - api/tweets/details/published -", err.message);
    res.status(500).json({ err: err.message });
  }
};

export default verify(getPublishedTweets);
