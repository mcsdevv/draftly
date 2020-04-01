import { client, q } from "../../_util/fauna";
import verify from "../../_util/token/verify-new";

const teamExists = async (req, res) => {
  try {
    const { handle } = req.query;
    // * Establish whether a team already exists
    const exists = await client.query(
      q.Exists(q.Match(q.Index("all_teams_by_handle"), handle))
    );
    console.log("Team exists: ", exists);
    res.status(200).json({ exists });
  } catch (err) {
    console.error("ERROR - api/team/exists -", err.message);
    res.status(500).json({ err: err.message });
  }
};

export default verify(teamExists);
