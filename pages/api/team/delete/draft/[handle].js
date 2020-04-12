import { client, q } from "../../../_util/fauna";
import verify from "../../../_util/token/verify";

const teamDeleteDraft = async (req, res) => {
  try {
    const { handle } = req.query;
    const { ref } = req.body;
    // * Delete a draft tweet from a team
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
            ),
          },
        }
      )
    );
    console.log("Deleted draft tweet from: ", handle);
    res.status(200).json(dbs.data);
  } catch (err) {
    console.error("ERROR - api/team/delete/draft -", err.message);
    res.status(500).json({ err: err.message });
  }
};

export default verify(teamDeleteDraft);
