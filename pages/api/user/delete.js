import verify from "@lib/api/token/verify";
import withSentry from "@lib/api/middleware/withSentry";
import { escape, query } from "@lib/api/db";

const deleteUser = async (req, res, uid) => {
  const { teams } = JSON.parse(req.body);

  // TODO Improve with join

  // * Find which teams only have one owner
  const teamsOneOwner = teams.filter((t) => t.owners.length === 1);

  // * Find which single owners are the user
  const teamsToDelete = teamsOneOwner.filter((t) => t.owners[0].uid === uid);

  // * Delete user
  await query(escape`DELETE FROM users WHERE uid = ${uid}`);

  // * Delete all teams with no remaining owner
  const deleteTeams = async () => {
    await Promise.all(
      teamsToDelete.forEach((t) => {
        query(escape`DELETE FROM teams WHERE tuid = ${t.tuid}`);
      })
    );
  };

  await deleteTeams();

  console.log("Deleted user:", uid);
  res.status(200).json(uid);
};

export default verify(withSentry(deleteUser));
