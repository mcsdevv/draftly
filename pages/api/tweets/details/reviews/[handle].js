import { client, q } from "../../../_util/fauna";
import { getRef } from "../../../_util/getRef";
import verify from "../../../_util/token/verify";

export default async (req, res) => {
  verify(req.headers.authorization || req.cookies.access_token, async error => {
    if (error) res.status(400).json({ error });
    const { handle } = req.query;
    try {
      const dbs = await client.query(
        q.Map(
          q.Select(
            ["data", "reviews"],
            q.Get(q.Match(q.Index("all_teams_by_handle"), handle))
          ),
          q.Lambda("s", q.Get(q.Ref(q.Collection("tweets"), q.Var("s"))))
        )
      );
      const reviews = dbs
        .map(d => {
          return {
            ...d.data,
            ref: getRef(d.ref),
            updated: d.ts
          };
        })
        .reverse();
      console.log("Reviews for:", handle);
      console.log("Reviews:", reviews);
      // ok
      res.status(200).json({ reviews });
    } catch (e) {
      console.log("uh oh", e.message);
      // something went wrong
      res.status(500).json({ error: e.message });
    }
  });
};
