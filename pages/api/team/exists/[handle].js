import { client, q } from "../../_util/fauna";
import verify from "../../_util/token/verify";

export default async (req, res) => {
  verify(req.headers.authorization, async error => {
    if (error) res.status(400).json({ error });
    const { handle } = req.query;
    try {
      // * Establish whether a team already exists
      const exists = await client.query(
        q.Exists(q.Match(q.Index("all_teams_by_handle"), handle))
      );
      console.log("Team exists: ", exists);
      res.status(200).json({ exists });
    } catch (e) {
      console.log("ERROR - api/team/exists -", e.message);
      res.status(500).json({ error: e.message });
    }
  });
};
