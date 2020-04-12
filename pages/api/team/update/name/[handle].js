import { client, q } from "../../../_util/fauna";
import verify from "../../../_util/token/verify";
import isOwner from "../../../_util/middleware/isOwner";

const updateTeamName = async (req, res) => {
  try {
    console.time("updateTeamName");
    const { newName } = JSON.parse(req.body);
    const { handle } = req.query;
    // * Update team name
    const dbs = await client.query(
      q.Update(
        q.Select(
          ["ref"],
          q.Get(q.Match(q.Index("all_teams_by_handle"), handle))
        ),
        {
          data: {
            name: newName,
          },
        }
      )
    );
    console.timeEnd("updateTeamName");
    console.log("Team name updated for:", handle);
    res.status(200).json(dbs.data);
  } catch (err) {
    console.error("ERROR - api/team/update/name -", err.message);
    res.status(500).json({ err: err.message });
  }
};

export default verify(isOwner(updateTeamName));
