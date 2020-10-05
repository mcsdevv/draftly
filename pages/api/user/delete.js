// * Libraries
import prisma from "@lib/api/db/prisma";

// * Middleware
import verify from "@lib/api/token/verify";
import withSentry from "@lib/api/middleware/withSentry";

const deleteUser = async (req, res, uid) => {
  const { teams } = JSON.parse(req.body);

  // * Find which teams only have one owner
  const teamsOneOwner = teams.filter((t) => t.owners.length === 1);

  // * Find which single owners are the user
  const teamsToDelete = teamsOneOwner.filter((t) => t.owners[0].uid === uid);

  // * Delete user
  await prisma.users.delete({
    where: { uid },
  });

  // * Delete all teams with no remaining owner
  await prisma.teams.deleteMany({
    where: { tuid: { in: teamsToDelete } },
  });

  console.log("Deleted user:", uid);
  res.status(200).json(uid);
};

export default verify(withSentry(deleteUser));
