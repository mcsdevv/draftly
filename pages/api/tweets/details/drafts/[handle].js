import { client, q } from "../../../_util/fauna";
import { formatTweets } from "../../../_util/formatTweets";
import verify from "../../../_util/token/verify";

const getDraftTweets = async (req, res) => {
  try {
    const { handle } = req.query;
    // * Get draft tweets for account
    const dbs = await client.query(
      q.Map(
        q.Select(
          ["data", "drafts"],
          q.Get(q.Match(q.Index("all_teams_by_handle"), handle))
        ),
        q.Lambda("s", q.Get(q.Ref(q.Collection("tweets"), q.Var("s"))))
      )
    );
    // * Format draft tweets
    const drafts = formatTweets(dbs);
    console.log("Retrieved draft tweets for:", handle);
    res.status(200).json({ drafts });
  } catch (err) {
    console.error("ERROR - api/tweets/details/drafts -", err.message);
    res.status(500).json({ err: err.message });
  }
};

export default verify(getDraftTweets);
