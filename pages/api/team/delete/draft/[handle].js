import { client, q } from "../../../_util/fauna";
import verify from "../../../_util/token/verify";

export default async (req, res) => {
  verify(req.headers.authorization || req.cookies.access_token, async error => {
    if (error) res.status(400).json({ error });
    const { handle } = req.query;
    console.log("handle", handle);
    const { ref } = req.body;
    console.log("ref", ref);
    try {
      const dbs = await client.query(
        q.Update(
          q.Select(
            ["ref"],
            q.Get(q.Match(q.Index("all_teams_by_handle"), handle))
          ),
          {
            data: {
              drafts: q.Filter(
                q.Select(
                  ["data", "drafts"],
                  q.Get(q.Match(q.Index("all_teams_by_handle"), handle))
                ),
                q.Lambda("s", q.Not(q.Equals(ref, q.Var("s"))))
              )
            }
          }
        )
      );
      console.log("Deleted draft from:", handle);
      // ok
      res.status(200).json(dbs.data);
    } catch (e) {
      console.log(("ERROR", e));
      // something went wrong
      res.status(500).json({ error: e.message });
    }
  });
};
