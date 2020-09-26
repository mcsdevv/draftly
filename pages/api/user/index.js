// * Libraries
import { PrismaClient } from "@prisma/client";

// * Middleware
import verify from "@lib/api/token/verify";
import withSentry from "@lib/api/middleware/withSentry";

// * Initialize Prisma client outside of handler
const prisma = new PrismaClient();

const getUserDetails = async (_req, res, uid) => {
  // * Select user with matching uid
  const user = await prisma.users.findOne({
    where: { uid },
  });

  // * Select teams data that will require filtering
  const teamsData = await prisma.teams.findMany({
    where: { members: { some: { uid } } },
    include: {
      members: {
        include: { user: true },
      },
    },
  });

  const teams = teamsData.map((t) => {
    // * Remove tokens that are server only
    delete t.token_key;
    delete t.token_secret;

    // * Separate members and owners
    const members = t.members.filter((m) => m.role === "member");
    const owners = t.members.filter((m) => m.role === "owner");
    return {
      ...t,
      members,
      owners,
    };
  });

  console.log("Retrieved user details for:", uid);
  res.status(200).json({ user, teams });
};

export default verify(withSentry(getUserDetails));
