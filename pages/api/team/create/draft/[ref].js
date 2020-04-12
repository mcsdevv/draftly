import { client, q } from "../../../_util/fauna";
import verify from "../../../_util/token/verify";

const teamCreateDraft = async (req, res) => {
  try {
    const { handle } = req.body;
    const { ref } = req.query;
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
            ),
          },
        }
      )
    );
    console.log("Added new tweet to team: ", handle);
    res.status(200).json({ ref });
  } catch (err) {
    console.error("ERROR - api/team/create/draft -", err.message);
    res.status(500).json({ err: err.message });
  }
};

export default verify(teamCreateDraft);
