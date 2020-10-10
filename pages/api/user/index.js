// * Libraries
import prisma from "@lib/api/db/prisma";

// * Middleware
import verify from "@lib/api/token/verify";
import withSentry from "@lib/api/middleware/withSentry";

const getUserDetails = async (_req, res, uid) => {
  console.time("PROFILE");
  console.time("USER");
  // * Select user with matching uid
  const user = await prisma.users.findOne({
    where: { uid },
  });
  console.timeEnd("USER");

  console.time("TEAM");
  // * Select teams data that will require filtering
  const teamsData = await prisma.teams.findMany({
    where: { members: { some: { uid } } },
    include: {
      creator: true,
      members: {
        include: { user: true },
      },
    },
  });
  console.timeEnd("TEAM");
  console.timeEnd("PROFILE");

  const teams = teamsData.map((t) => {
    // * Remove tokens that are server only
    delete t.tokenKey;
    delete t.tokenSecret;

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
