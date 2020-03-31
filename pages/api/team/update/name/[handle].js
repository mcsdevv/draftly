import { client, q } from "../../../_util/fauna";
import verify from "../../../_util/token/verify-new";
import isOwner from "../../../_util/auth/isOwner";

const updateTeamName = async (req, res) => {
  const { newName } = JSON.parse(req.body);
  const { handle } = req.query;
  try {
    // * Update team name
    const dbs = await client.query(
      q.Update(
        q.Select(
          ["ref"],
          q.Get(q.Match(q.Index("all_teams_by_handle"), handle))
        ),
        {
          data: {
            name: newName
          }
        }
      )
    );
    console.log("Team name updated for:", handle);
    res.status(200).json(dbs.data);
  } catch (err) {
    console.log("ERROR - api/team/update/name -", err.message);
    res.status(500).json({ err: err.message });
  }
};

export default verify(isOwner(updateTeamName));
