// * Libraries
import prisma from "@lib/api/db/prisma";

// * Middleware
import isOwner from "@lib/api/middleware/isOwner";
import verify from "@lib/api/token/verify";
import withSentry from "@lib/api/middleware/withSentry";

const teamDelete = async (_req, res, _uid, tuid) => {
  // * Delete team
  await prisma.teams.delete({
    where: { tuid },
  });

  console.log("Deleted team:", tuid);
  res.status(200).send(tuid);
};

export default verify(isOwner(withSentry(teamDelete)));
