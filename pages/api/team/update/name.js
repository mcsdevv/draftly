import verify from "@lib/api/token/verify";
import { escape, query } from "@lib/api/db";

const updateTeamName = async (req, res, uid, tuid) => {
  try {
    const { name } = JSON.parse(req.body);

    // * Update team name
    await query(escape`UPDATE teams SET name = ${name} WHERE tuid = ${tuid}`);

    console.log("Team name updated:", tuid);
    res.status(200).send(name);
  } catch (err) {
    console.error("ERROR - api/team/update/name -", err.message);
    res.status(500).json({ err: err.message });
  }
};

export default verify(updateTeamName);
