import { client, q } from "../../_util/fauna";
import verify from "../../_util/token/verify";

export default async (req, res) => {
  verify(req.headers.authorization, async error => {
    if (error) res.status(400).json({ error });
    const { handle, tokenKey, tokenSecret } = req.body;
    try {
      // * Update team tokens
      const dbs = await client.query(
        q.Update(
          q.Select(
            ["ref"],
            q.Get(q.Match(q.Index("all_teams_by_handle"), handle))
          ),
          {
            data: {
              auth: {
                tokenKey,
                tokenSecret
              }
            }
          }
        )
      );
      console.log("Tokens updated for:", handle);
      res.status(200).json(dbs.data);
    } catch (e) {
      console.log("ERROR - api/team/tokens/update -", e.message);
      res.status(500).json({ error: e.message });
    }
  });
};
