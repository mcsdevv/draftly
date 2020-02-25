import { client, q } from "../../_util/fauna";
import verify from "../../_util/token/verify";

export default async (req, res) => {
  verify(req.headers.authorization || req.cookies.access_token, async error => {
    if (error) res.status(400).json({ error });
    const { teams } = req.body;
    try {
      // * Delete multiple teams
      const dbs = await client.query(
        q.Foreach(
          q.Paginate(
            q.Union(
              q.Map(
                teams,
                q.Lambda(
                  "x",
                  q.Match(q.Index("all_teams_by_handle"), [q.Var("x")])
                )
              )
            )
          ),
          q.Lambda("u", q.Delete(q.Var("u")))
        )
      );
      console.log("Deleted teams: ", teams);
      res.status(200).json(dbs.data);
    } catch (e) {
      console.log("ERROR - api/teams/delete/delete -", e.message);
      res.status(500).json({ error: e.message });
    }
  });
};
