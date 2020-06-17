import verify from "@lib/api/token/verify";
import isOwner from "@lib/api/middleware/isOwner";
import { escape, query } from "@lib/api/db";

const teamDelete = async (req, res) => {
  try {
    const { tuid } = JSON.parse(req.body);

    // * Delete a team
    await query(escape`DELETE FROM teams WHERE tuid = ${tuid}`);

    // * Delete tweets of team
    await query(escape`DELETE FROM tweets WHERE tuid = ${tuid}`);

    console.log("Deleted team:", tuid);
    res.status(200).json(tuid);
  } catch (err) {
    console.error("ERROR - api/team/delete -", err);
    res.status(500).json({ err: err.message });
  }
};

export default verify(isOwner(teamDelete));
