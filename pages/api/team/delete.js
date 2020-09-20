import verify from "@lib/api/token/verify";
import withSentry from "@lib/api/middleware/withSentry";
import isOwner from "@lib/api/middleware/isOwner";
import { escape, query } from "@lib/api/db";

const teamDelete = async (_req, res, _uid, tuid) => {
  // * Delete team,
  await query(escape`DELETE FROM teams WHERE tuid = ${tuid}`);

  console.log("Deleted team:", tuid);
  res.status(200).send(tuid);
};

export default verify(isOwner(withSentry(teamDelete)));
