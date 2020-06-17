import verify from "../_util/token/verify";
import { escape, query } from "@lib/api/db";

const deleteUser = async (req, res, uid) => {
  try {
    const { teams } = JSON.parse(req.body);

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
          query(escape`DELETE FROM teams_members WHERE tuid = ${t.tuid}`);
        })
      );
    };

    await deleteTeams();

    console.log("Deleted user:", uid);
    res.status(200).json(uid);
  } catch (err) {
    console.error("ERROR - api/user/delete -", err.message);
    res.status(500).json({ err: err.message });
  }
};

export default verify(deleteUser);
