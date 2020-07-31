import verify from "@lib/api/token/verify";
import withSentry from "@lib/api/middleware/withSentry";
import { escape, query } from "@lib/api/db";

const updateTeamName = async (req, res, uid, tuid) => {
  const { name } = JSON.parse(req.body);

  // * Update team name
  await query(escape`UPDATE teams SET name = ${name} WHERE tuid = ${tuid}`);

  console.log("Team name updated:", tuid);
  res.status(200).send(name);
};

export default verify(withSentry(updateTeamName));
