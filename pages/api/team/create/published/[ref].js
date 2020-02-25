import { client, q } from "../../../_util/fauna";
import verify from "../../../_util/token/verify";

export default async (req, res) => {
  verify(req.headers.authorization || req.cookies.access_token, async error => {
    if (error) res.status(400).json({ error });
    const { handle } = req.body;
    const { ref } = req.query;
    try {
      // * Remove tweet from reviews and add to published for a team
      await client.query(
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
              ),
              published: q.Append(
                ref,
                q.Select(
                  ["data", "published"],
                  q.Get(q.Match(q.Index("all_teams_by_handle"), handle))
                )
              )
            }
          }
        )
      );
      console.log("Tweet changed from review to published for:", handle);
      res.status(200).json(ref);
    } catch (e) {
      console.log("ERROR - api/team/create/published -", e.message);
      res.status(500).json({ error: e.message });
    }
  });
};
