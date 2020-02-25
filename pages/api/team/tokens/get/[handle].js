import { client, q } from "../../../_util/fauna";
import verify from "../../../_util/token/verify";

export default async (req, res) => {
  verify(req.headers.authorization || req.cookies.access_token, async error => {
    if (error) res.status(400).json({ error });
    const { handle } = req.query;
    try {
      // * Get auth tokens for account
      const dbs = await client.query(
        q.Get(q.Match(q.Index("all_teams_by_handle"), handle))
      );
      console.log("Retrieved tokens for:", handle);
      res.status(200).json({ ...dbs.data.auth });
    } catch (e) {
      console.log("ERROR - api/team/tokens/get -", e.message);
      res.status(500).json({ error: e.message });
    }
  });
};
