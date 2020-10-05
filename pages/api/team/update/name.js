// * Libraries
import prisma from "@lib/api/db/prisma";

// * Middleware
import verify from "@lib/api/token/verify";
import withSentry from "@lib/api/middleware/withSentry";

const updateTeamName = async (req, res, uid, tuid) => {
  const { name } = JSON.parse(req.body);

  // * Update team name
  await prisma.teams.update({
    where: { tuid },
    data: { name },
  });

  console.log("Team name updated:", tuid);
  res.status(200).send(name);
};

export default verify(withSentry(updateTeamName));
