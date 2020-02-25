import { client, q } from "../../../_util/fauna";
import { formatTweets } from "../../../_util/formatTweets";
import verify from "../../../_util/token/verify";

export default async (req, res) => {
  verify(req.headers.authorization || req.cookies.access_token, async error => {
    if (error) res.status(400).json({ error });
    const { handle } = req.query;
    try {
      // * Get published tweets for account
      const dbs = await client.query(
        q.Map(
          q.Select(
            ["data", "published"],
            q.Get(q.Match(q.Index("all_teams_by_handle"), handle))
          ),
          q.Lambda("s", q.Get(q.Ref(q.Collection("tweets"), q.Var("s"))))
        )
      );
      // * Format published tweets
      const published = formatTweets(dbs);
      console.log("Retrieved published tweets for:", handle);
      res.status(200).json({ published });
    } catch (e) {
      console.log("ERROR - api/tweets/details/published -", e.message);
      res.status(500).json({ error: e.message });
    }
  });
};
