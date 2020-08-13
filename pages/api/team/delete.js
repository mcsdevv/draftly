import verify from "@lib/api/token/verify";
import withSentry from "@lib/api/middleware/withSentry";
import isOwner from "@lib/api/middleware/isOwner";
import { escape, query } from "@lib/api/db";

const teamDelete = async (_req, res, _uid, tuid) => {
  console.log("tuid", tuid);
  // * Delete team, members, and tweets
  await query(escape`DELETE FROM teams WHERE tuid = ${tuid};
                     DELETE FROM teams_members WHERE tuid = ${tuid};
                     DELETE FROM tweets WHERE tuid = ${tuid}`);

  // TODO Delete tweets metadata

  // TODO Delete tweets comments

  // TODO Delete tweets approvals

  console.log("Deleted team:", tuid);
  res.status(200).send(tuid);
};

export default verify(isOwner(withSentry(teamDelete)));
