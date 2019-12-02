import { client, q } from "../../_util/fauna";
import verify from "../../_util/token/verify";

export default async (req, res) => {
  console.log("HEADERRRR", req.cookies.access_token);
  verify(req.headers.authorization || req.cookies.access_token, async error => {
    console.log(
      "USER DETAILS TOKEN",
      req.headers.authorization || req.cookies.access_token
    );
    if (error) res.status(400).json({ error });
    const { handle } = req.query;
    try {
      const dbs = await client.query(
        q.Get(q.Match(q.Index("all_teams_by_handle"), handle))
      );
      // * Delete keys before sending response
      delete dbs.data.auth;
      console.log("Team details:", dbs);
      // ok
      res.status(200).json({ ...dbs.data });
    } catch (e) {
      // something went wrong
      res.status(500).json({ error: e.message });
    }
  });
};
