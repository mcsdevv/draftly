import { client, q } from "../../_util/fauna";
import verify from "../../_util/token/verify";

export default async (req, res) => {
  verify(req.headers.authorization || req.cookies.access_token, async error => {
    if (error) res.status(400).json({ error });
    try {
      const { teams } = req.body;
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
      console.log("NEW DATA", dbs);
      // ok
      res.status(200).json(dbs.data);
    } catch (e) {
      console.log(("ERROR", e));
      // something went wrong
      res.status(500).json({ error: e.message });
    }
  });
};
