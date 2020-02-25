import { client, q } from "../../../_util/fauna";
import verify from "../../../_util/token/verify";

export default async (req, res) => {
  verify(req.headers.authorization || req.cookies.access_token, async error => {
    if (error) res.status(400).json({ error });
    const { handle } = req.body;
    const { ref } = req.query;
    try {
      // * Add draft tweet ref to a team
      await client.query(
        q.Update(
          q.Select(
            ["ref"],
            q.Get(q.Match(q.Index("all_teams_by_handle"), handle))
          ),
          {
            data: {
              drafts: q.Append(
                ref,
                q.Select(
                  ["data", "drafts"],
                  q.Get(q.Match(q.Index("all_teams_by_handle"), handle))
                )
              )
            }
          }
        )
      );
      console.log("Added new tweet to team: ", handle);
      res.status(200).json({ ref });
    } catch (e) {
      console.log("ERROR - api/team/create/draft -", e.message);
      res.status(500).json({ error: e.message });
    }
  });
};
