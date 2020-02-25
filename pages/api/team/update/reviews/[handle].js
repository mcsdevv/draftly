import { client, q } from "../../../_util/fauna";
import verify from "../../../_util/token/verify";

export default async (req, res) => {
  verify(req.headers.authorization || req.cookies.access_token, async error => {
    if (error) res.status(400).json({ error });
    const { reviews } = JSON.parse(req.body);
    const { handle } = req.query;
    try {
      // * Update number of reviews required to publish a tweet for a team
      const dbs = await client.query(
        q.Update(
          q.Select(
            ["ref"],
            q.Get(q.Match(q.Index("all_teams_by_handle"), handle))
          ),
          {
            data: {
              reviewsRequired: reviews
            }
          }
        )
      );
      console.log("Team reviews required updated for:", handle);
      res.status(200).json(dbs.data);
    } catch (e) {
      console.log("ERROR - api/team/update/review -", e.message);
      res.status(500).json({ error: e.message });
    }
  });
};
