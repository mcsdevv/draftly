import { client, q } from "../../../_util/fauna";
import { formatTweets } from "../../../_util/formatTweets";
import verify from "../../../_util/token/verify";

export default async (req, res) => {
  verify(req.headers.authorization || req.cookies.access_token, async error => {
    if (error) res.status(400).json({ error });
    const { handle } = req.query;
    try {
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
      res.setHeader("Cache-Control", "s-maxage=1, stale-while-revalidate");
      res.status(200).json({ drafts });
    } catch (e) {
      console.log("ERROR - api/tweets/details/drafts -", e.message);
      res.status(500).json({ error: e.message });
    }
  });
};
