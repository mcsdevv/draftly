import { client, q } from "../../../_util/fauna";
import verify from "../../../_util/token/verify";

export default async (req, res) => {
  verify(req.headers.authorization || req.cookies.access_token, async error => {
    if (error) res.status(400).json({ error });
    const { handle } = req.query;
    const { ref } = req.body;
    try {
      // * Delete a review tweet from a team
      const dbs = await client.query(
        q.Update(
          q.Select(
            ["ref"],
            q.Get(q.Match(q.Index("all_teams_by_handle"), handle))
          ),
          {
            data: {
              reviews: q.Filter(
                q.Select(
                  ["data", "reviews"],
                  q.Get(q.Match(q.Index("all_teams_by_handle"), handle))
                ),
                q.Lambda("s", q.Not(q.Equals(ref, q.Var("s"))))
              )
            }
          }
        )
      );
      console.log("Deleted review draft from: ", handle);
      res.status(200).json(dbs.data);
    } catch (e) {
      console.log("ERROR - api/team/delete/draft -", e.message);
      res.status(500).json({ error: e.message });
    }
  });
};
