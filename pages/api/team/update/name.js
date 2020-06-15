import verify from "../../_util/token/verify";
import { escape, query } from "../../_util/db";

const updateTeamName = async (req, res, uid) => {
  try {
    const { tuid, newName } = JSON.parse(req.body);

    // * Update team name
    await query(
      escape`UPDATE teams SET name = ${newName} WHERE tuid = ${tuid}`
    );

    console.log("User name updated:", uid);
    res.status(200).json(newName);
  } catch (err) {
    console.error("ERROR - api/team/update/name -", err.message);
    res.status(500).json({ err: err.message });
  }
};

export default verify(updateTeamName);
