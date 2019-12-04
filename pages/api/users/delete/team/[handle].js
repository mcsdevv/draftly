// TODO Delete team from all users
// * Loop over (Foreach) documents
// * Paginate matches
// * Use Lambda to remove team from array
// * https://docs.fauna.com/fauna/current/api/fql/functions/foreach#examples

import { client, q } from "../../../_util/fauna";
import verify from "../../../_util/token/verify";

export default async (req, res) => {
  verify(req.headers.authorization || req.cookies.access_token, async error => {
    console.log(
      "USERS DELETE TEAMS",
      req.headers.authorization || req.cookies.access_token
    );
    if (error) res.status(400).json({ error });
    try {
      const { emails } = req.body;
      const { handle } = req.query;
      console.log("HANDLE", handle);
      console.log("EMAILS", emails);
      const dbs = await client.query(
        q.Foreach(
          q.Paginate(
            q.Union(
              q.Map(
                emails,
                q.Lambda(
                  "x",
                  q.Match(q.Index("all_users_by_email"), [q.Var("x")])
                )
              )
            )
          ),
          q.Lambda(
            "u",
            q.Update(q.Var("u"), {
              data: {
                scopes: q.Filter(
                  q.Select(["data", "scopes"], q.Get(q.Var("u"))),
                  q.Lambda(
                    "s",
                    q.Not(q.Equals(handle, q.Select(["name"], q.Var("s"))))
                  )
                )
              }
            })
          )
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
