import { client, q } from "../../../_util/fauna";
import { getDocProperty, getDocByIndex } from "../../../_util/fauna/queries";
import { formatTweets } from "../../../_util/formatTweets";
import verify from "../../../_util/token/verify";

import { query } from "../../../_util/db";

const getDraftTweets = async (req, res) => {
  console.time("sql");
  const db = await query("SELECT members FROM teams WHERE teamId = $1", [1]);
  console.log("query", db.rows[0].members);
  console.timeEnd("sql");
  try {
    const { handle } = req.query;
    if (handle === "undefined") return res.status(200).json([]);
    // * Get draft tweets for account
    const dbs = await client.query(
      q.Map(
        getDocProperty(
          ["data", "drafts"],
          getDocByIndex("all_teams_by_handle", handle)
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
